import { Router, Request, Response } from "express";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "../lib/supabase";

const router = Router();

function wantsJson(req: Request): boolean {
  return Boolean(req.headers["content-type"]?.includes("application/json"));
}

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

function redirectWithError(
  req: Request,
  res: Response,
  status: number,
  path: string,
  message: string
) {
  if (wantsJson(req)) {
    res.status(status).json({ error: message });
    return;
  }
  res.redirect(303, `${path}?error=${encodeURIComponent(message)}`);
}

async function handleSignup(req: Request, res: Response) {
  let supabase;
  try {
    supabase = getSupabase();
  } catch {
    redirectWithError(
      req,
      res,
      503,
      "/signup",
      "Authentication service is not configured"
    );
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
    redirectWithError(
      req,
      res,
      400,
      "/signup",
      "Email, password, and company name are required"
    );
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
    redirectWithError(req, res, 400, "/signup", error.message);
    return;
  }

  if (data.session) {
    appendSessionCookies(res, data.session);
    if (wantsJson(req)) {
      res.status(201).json({
        ok: true,
        user: data.user,
        token: data.session.access_token,
        redirect: "/dashboard",
      });
      return;
    }
    res.redirect(303, "/dashboard");
    return;
  }

  const notice =
    "Check your email to confirm your account, then sign in.";
  if (wantsJson(req)) {
    res.status(201).json({
      ok: true,
      user: data.user,
      redirect: "/login",
      message: notice,
    });
    return;
  }
  res.redirect(303, `/login?notice=${encodeURIComponent(notice)}`);
}

router.post("/signup", async (req: Request, res: Response) => {
  try {
    await handleSignup(req, res);
  } catch (err) {
    console.error("Signup error:", err);
    if (wantsJson(req)) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.redirect(
        303,
        `/signup?error=${encodeURIComponent("Internal server error")}`
      );
    }
  }
});

/** @deprecated Next.js app compatibility — prefer POST /signup with `companyName` */
router.post("/register", async (req: Request, res: Response) => {
  try {
    await handleSignup(req, res);
  } catch (err) {
    console.error("Register error:", err);
    if (wantsJson(req)) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.redirect(
        303,
        `/signup?error=${encodeURIComponent("Internal server error")}`
      );
    }
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      redirectWithError(
        req,
        res,
        503,
        "/login",
        "Authentication service is not configured"
      );
      return;
    }

    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      redirectWithError(
        req,
        res,
        400,
        "/login",
        "Email and password are required"
      );
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirectWithError(req, res, 401, "/login", error.message);
      return;
    }

    if (!data.session) {
      redirectWithError(req, res, 401, "/login", "Invalid credentials");
      return;
    }

    appendSessionCookies(res, data.session);
    if (wantsJson(req)) {
      res.json({
        ok: true,
        redirect: "/dashboard",
        token: data.session.access_token,
        user: data.user,
      });
      return;
    }
    res.redirect(303, "/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    if (wantsJson(req)) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.redirect(
        303,
        `/login?error=${encodeURIComponent("Internal server error")}`
      );
    }
  }
});

export default router;
