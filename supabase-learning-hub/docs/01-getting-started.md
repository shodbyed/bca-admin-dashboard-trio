# Getting Started with Supabase

## 1. Introduction to Supabase

Supabase is often called "the open-source Firebase alternative." It provides a complete backend solution with:

### Core Features
- **PostgreSQL Database**: Full-featured relational database
- **Authentication**: Built-in user management
- **Real-time Subscriptions**: Listen to database changes
- **Storage**: File and image storage
- **Edge Functions**: Serverless functions
- **Auto-generated APIs**: REST and GraphQL APIs

### Why Choose Supabase?
- **Open Source**: You can self-host or use their cloud
- **SQL Database**: PostgreSQL with full SQL support
- **Real-time**: Built-in real-time functionality
- **Developer Experience**: Great tooling and documentation
- **TypeScript Support**: First-class TypeScript support

## 2. Setting Up Your First Project

### Step 1: Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### Step 2: Get Your Project Credentials
Once your project is created, you'll need:
- **Project URL**: Found in Settings > API
- **Anonymous Key**: Found in Settings > API

### Step 3: Install Supabase CLI (Optional but Recommended)
```bash
npm install -g supabase
```

### Step 4: Initialize Local Development
```bash
supabase init
supabase start
```

## 3. Basic Configuration

Create a `.env.local` file in your project:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 4. Your First Supabase Client

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## 5. Next Steps

- Check out the examples in the `examples/` folder
- Try the practice projects in `projects/`
- Read the official [Supabase documentation](https://supabase.com/docs)

## Common Commands

```bash
# Start local Supabase (requires Docker)
supabase start

# Stop local Supabase
supabase stop

# Reset local database
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/database.types.ts
```