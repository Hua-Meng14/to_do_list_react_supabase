import { createClient } from "@supabase/supabase-js";

export const supbase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_GM_KEY);