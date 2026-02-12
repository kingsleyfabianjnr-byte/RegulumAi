import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { analyzeCompliance } from "../services/ai";

const router = Router();

// All routes require authentication
router.use(authenticate);

// List compliance checks
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const checks = await prisma.complianceCheck.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(checks);
  } catch (error) {
    console.error("Error fetching compliance checks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single compliance check
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const check = await prisma.complianceCheck.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!check) {
      res.status(404).json({ error: "Compliance check not found" });
      return;
    }

    res.json(check);
  } catch (error) {
    console.error("Error fetching compliance check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create compliance check
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, documentText } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const check = await prisma.complianceCheck.create({
      data: {
        title,
        description,
        documentText,
        userId: req.userId!,
      },
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: "COMPLIANCE_CHECK_CREATED",
        details: { checkId: check.id, title },
        userId: req.userId!,
      },
    });

    res.status(201).json(check);
  } catch (error) {
    console.error("Error creating compliance check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Run AI analysis on a compliance check
router.post("/:id/analyze", async (req: AuthRequest, res: Response) => {
  try {
    const check = await prisma.complianceCheck.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!check) {
      res.status(404).json({ error: "Compliance check not found" });
      return;
    }

    if (!check.documentText) {
      res.status(400).json({ error: "No document text to analyze" });
      return;
    }

    // Update status to in progress
    await prisma.complianceCheck.update({
      where: { id: check.id },
      data: { status: "IN_PROGRESS" },
    });

    // Fetch applicable rules
    const rules = await prisma.complianceRule.findMany({
      where: {
        isActive: true,
        organizationId: check.organizationId,
      },
    });

    const ruleDescriptions = rules.map(
      (r) => `[${r.regulation}] ${r.name}: ${r.description}`
    );

    // Run AI analysis
    const analysis = await analyzeCompliance(
      check.documentText,
      ruleDescriptions
    );

    // Update the check with results
    const updated = await prisma.complianceCheck.update({
      where: { id: check.id },
      data: {
        status: analysis.overallCompliant ? "COMPLIANT" : "NON_COMPLIANT",
        riskLevel: analysis.riskLevel,
        result: analysis as any,
        aiAnalysis: analysis.summary,
      },
    });

    // Log the analysis
    await prisma.auditLog.create({
      data: {
        action: "AI_ANALYSIS_COMPLETED",
        details: {
          checkId: check.id,
          riskLevel: analysis.riskLevel,
          compliant: analysis.overallCompliant,
        },
        userId: req.userId!,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error running AI analysis:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete compliance check
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const check = await prisma.complianceCheck.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!check) {
      res.status(404).json({ error: "Compliance check not found" });
      return;
    }

    await prisma.complianceCheck.delete({ where: { id: check.id } });

    await prisma.auditLog.create({
      data: {
        action: "COMPLIANCE_CHECK_DELETED",
        details: { checkId: check.id, title: check.title },
        userId: req.userId!,
      },
    });

    res.json({ message: "Compliance check deleted" });
  } catch (error) {
    console.error("Error deleting compliance check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
