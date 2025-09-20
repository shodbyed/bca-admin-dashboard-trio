# Real-time Chat App

Build a real-time chat application to learn advanced Supabase features including:
- Real-time subscriptions
- User presence
- File uploads (Supabase Storage)
- Advanced authentication

## Database Schema

```sql
-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  room_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room members table
CREATE TABLE room_members (
  room_id UUID REFERENCES rooms(id),
  user_id UUID REFERENCES auth.users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (room_id, user_id)
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view messages in rooms they're members of" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM room_members 
      WHERE room_id = messages.room_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in rooms they're members of" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM room_members 
      WHERE room_id = messages.room_id 
      AND user_id = auth.uid()
    )
  );
```

## Features to Implement

- [ ] User authentication
- [ ] Create and join chat rooms
- [ ] Send and receive messages in real-time
- [ ] Show who's online (presence)
- [ ] Upload and share images
- [ ] Message history
- [ ] Typing indicators
- [ ] Message reactions/emojis

## Learning Objectives

- Real-time subscriptions with filters
- User presence tracking
- File uploads with Supabase Storage
- Complex RLS policies
- Channel-based real-time communication