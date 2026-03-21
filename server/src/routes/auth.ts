import { Router, Request, Response } from "express";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "../lib/supabase";

const router = Router();

function appendSessionCookies(res: Response, session: Session) {
  const maxAge = session.expires_in ?? 60 * 60 * 24 * 7;
  const secure = process.env.NODE_ENV === "production";
  const base = `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
  res.append(
    "Set-Cookie",
    `sb-access-token=${encodeURIComponent(session.access_token)}; ${base}`
  );
  res.append(
    "Set-Cookie",
    `sb-refresh-token=${encodeURIComponent(session.refresh_token)}; ${base}`
  );
}

async function handleSignup(req: Request, res: Response) {
  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    res.status(503).json({ error: "Authentication service is not configured" });
    return;
  }

  const body = req.body as {
    email?: string;
    password?: string;
    companyName?: string;
    name?: string;
  };

  const companyName = body.companyName?.trim() || body.name?.trim();
  const { email, password } = body;

  if (!email || !password || !companyName) {
    res.status(400).json({
      error: "Email, password, and company name are required",
    });
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { company_name: companyName },
    },
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  if (data.session) {
    appendSessionCookies(res, data.session);
    res.status(201).json({
      ok: true,
      user: data.user,
      token: data.session.access_token,
      redirect: "/dashboard",
    });
    return;
  }

  res.status(201).json({
    ok: true,
    user: data.user,
    redirect: "/login",
    message: "Check your email to confirm your account, then sign in.",
  });
}

router.post("/signup", async (req: Request, res: Response) => {
  try {
    await handleSignup(req, res);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** @deprecated Next.js app compatibility — prefer POST /signup with `companyName` */
router.post("/register", async (req: Request, res: Response) => {
  try {
    await handleSignup(req, res);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      res.status(503).json({ error: "Authentication service is not configured" });
      return;
    }

    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }

    if (!data.session) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    appendSessionCookies(res, data.session);
    res.json({
      ok: true,
      redirect: "/dashboard",
      token: data.session.access_token,
      user: data.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
