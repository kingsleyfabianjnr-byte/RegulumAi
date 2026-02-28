import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    "Supabase environment variables (SUPABASE_URL, SUPABASE_KEY) are not fully set. Supabase client will be created but requests may fail."
  );
}

export const supabase = createClient(SUPABASE_URL || "", SUPABASE_KEY || "");

