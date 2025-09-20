import { supabase } from './01-basic-queries'
import { useState, useEffect } from 'react'

// Example: Real-time subscriptions
export function realtimeExample() {
  // Subscribe to INSERT events on the 'posts' table
  const insertSubscription = supabase
    .channel('posts-insert')
    .on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'posts' 
      }, 
      (payload) => {
        console.log('New post added:', payload.new)
      }
    )
    .subscribe()

  // Subscribe to UPDATE events
  const updateSubscription = supabase
    .channel('posts-update')
    .on('postgres_changes', 
      { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'posts' 
      }, 
      (payload) => {
        console.log('Post updated:', payload.new)
      }
    )
    .subscribe()

  // Subscribe to DELETE events
  const deleteSubscription = supabase
    .channel('posts-delete')
    .on('postgres_changes', 
      { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'posts' 
      }, 
      (payload) => {
        console.log('Post deleted:', payload.old)
      }
    )
    .subscribe()

  // Subscribe to all events on a table
  const allChangesSubscription = supabase
    .channel('posts-all-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'posts' 
      }, 
      (payload) => {
        console.log('Change detected:', payload)
      }
    )
    .subscribe()

  // Clean up function
  return () => {
    insertSubscription.unsubscribe()
    updateSubscription.unsubscribe()
    deleteSubscription.unsubscribe()
    allChangesSubscription.unsubscribe()
  }
}

// Example: React hook for real-time data
export function useRealtimePosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Initial fetch
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setPosts(data)
    }

    fetchPosts()

    // Set up real-time subscription
    const subscription = supabase
      .channel('posts-realtime')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'posts' 
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts(current => [payload.new, ...current])
          } else if (payload.eventType === 'UPDATE') {
            setPosts(current => 
              current.map(post => 
                post.id === payload.new.id ? payload.new : post
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setPosts(current => 
              current.filter(post => post.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return posts
}

// Example: Presence hook (who's online)
export function usePresence() {
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    const channel = supabase.channel('online-users')

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState()
        const users = Object.values(newState).flat()
        setOnlineUsers(users)
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences)
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track this user's presence
          await channel.track({
            user_id: 'user-123',
            name: 'John Doe',
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return onlineUsers
}