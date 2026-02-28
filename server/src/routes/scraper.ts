import { Router, Request, Response } from "express";
import { fdaScraper } from "../services/scraper.service";

const router = Router();

// POST /v1/scraper/fda - trigger FDA guidance scraper
router.post("/fda", async (_req: Request, res: Response) => {
  try {
    const data = await fdaScraper();
    res.json({ count: data.length, results: data });
  } catch (error) {
    console.error("Error in FDA scraper route:", error);
    res.status(500).json({
      error: "Failed to scrape FDA guidance documents",
    });
  }
});

export default router;

