# Simple Todo App with Supabase

A basic todo application to practice Supabase fundamentals including:
- Database operations (CRUD)
- Real-time updates
- User authentication
- Row Level Security

## Setup

1. Create the todos table in your Supabase dashboard:

```sql
-- Create todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos" ON todos
  FOR DELETE USING (auth.uid() = user_id);
```

2. Install dependencies:
```bash
npm install @supabase/supabase-js react react-dom
npm install -D @types/react @types/react-dom typescript vite
```

3. Start building!

## Features to Implement

- [ ] User authentication (sign up, sign in, sign out)
- [ ] Add new todos
- [ ] Mark todos as complete/incomplete
- [ ] Delete todos
- [ ] Real-time updates when other users make changes
- [ ] Filter todos (all, active, completed)
- [ ] Edit todo text inline

## Learning Objectives

By building this app, you'll learn:
- How to set up Supabase authentication
- How to perform CRUD operations
- How to implement Row Level Security
- How to use real-time subscriptions
- How to handle user sessions
- How to build a React app with Supabase

## Bonus Features

Once you've completed the basic features, try:
- [ ] Add due dates to todos
- [ ] Create todo categories/tags
- [ ] Share todos with other users
- [ ] Add file attachments using Supabase Storage
- [ ] Implement offline support
- [ ] Add push notifications