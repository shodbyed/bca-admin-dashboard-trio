# Create a local Supabase project
npx supabase init

# Start local development server (requires Docker)
npx supabase start

# Create a new migration
npx supabase migration new create_todos_table

# Reset local database
npx supabase db reset

# Generate TypeScript types
npx supabase gen types typescript --local > types/database.types.ts

# Deploy to remote Supabase
npx supabase db push

# Stop local server
npx supabase stop