
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://pxbogsidwrkdcdboohdr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Ym9nc2lkd3JrZGNkYm9vaGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjA0MTEsImV4cCI6MjA3NDUzNjQxMX0.5nTn00gVw3ximo2qQL37xOHaOGj3lvuuAJB7BMS9EjU'
  )
}
