
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://elyoefbzqtzvqmpqlqyg.supabase.co";

const supabaseAnonKey = "sb_publishable_fCw4_qEKOOuQhK4pZiC7_g_WJmF-ruu";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);