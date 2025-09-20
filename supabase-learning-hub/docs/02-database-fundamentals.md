# Database Fundamentals

## Understanding Supabase Database

Supabase uses PostgreSQL, which means you get all the power of a relational database with:
- **ACID compliance**: Reliable transactions
- **SQL support**: Full SQL query capabilities
- **Relations**: Foreign keys, joins, and complex relationships
- **JSON support**: Store and query JSON data
- **Full-text search**: Built-in text search capabilities
- **Row Level Security (RLS)**: Fine-grained access control

## Creating Your First Table

### Option 1: Using the Dashboard
1. Go to your Supabase dashboard
2. Navigate to "Table Editor"
3. Click "Create a new table"
4. Define your schema

### Option 2: Using SQL
```sql
-- Create a simple users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a posts table with foreign key
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS)

RLS is one of Supabase's most powerful features:

```sql
-- Enable RLS on the posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create a policy: users can only see their own posts
CREATE POLICY "Users can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

-- Create a policy: users can insert their own posts
CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);
```

## Data Types

PostgreSQL supports many data types:

```sql
CREATE TABLE examples (
  id UUID PRIMARY KEY,
  text_field TEXT,
  number_field INTEGER,
  decimal_field DECIMAL(10,2),
  boolean_field BOOLEAN,
  date_field DATE,
  timestamp_field TIMESTAMP WITH TIME ZONE,
  json_field JSONB,
  array_field TEXT[]
);
```

## Relationships

### One-to-Many
```sql
-- One user can have many posts
CREATE TABLE users (id UUID PRIMARY KEY, name TEXT);
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT
);
```

### Many-to-Many
```sql
-- Users can have many roles, roles can have many users
CREATE TABLE users (id UUID PRIMARY KEY, name TEXT);
CREATE TABLE roles (id UUID PRIMARY KEY, name TEXT);
CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id),
  role_id UUID REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);
```

## Indexes for Performance

```sql
-- Create an index on frequently queried fields
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Composite index for multiple field queries
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at);
```

## Functions and Triggers

```sql
-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the timestamp
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Next Steps

- Practice creating tables in the examples folder
- Learn about real-time subscriptions
- Explore authentication integration