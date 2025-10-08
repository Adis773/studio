
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://pxbogsidwrkdcdboohdr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Ym9nc2lkd3JrZGNkYm9vaGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMDQ0OTMsImV4cCI6MjA0MDc4MDQ5M30.s433Tj5a-A5B20K-v-3m2i-9qV6Qc49D8e1fA6b4c2c"
  )
}
