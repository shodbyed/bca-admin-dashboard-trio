import { supabase } from './01-basic-queries'
import { useState, useEffect } from 'react'
import React from 'react'

// Example: User Registration
export async function signUpUser(email: string, password: string, userData?: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData // Additional user metadata
      }
    })

    if (error) throw error

    console.log('User registered:', data.user)
    console.log('Session:', data.session)
    
    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

// Example: User Login
export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    console.log('User logged in:', data.user)
    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Example: Google OAuth Login
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Google login error:', error)
    throw error
  }
}

// Example: Magic Link Login
export async function signInWithMagicLink(email: string) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) throw error
    console.log('Magic link sent to:', email)
    return data
  } catch (error) {
    console.error('Magic link error:', error)
    throw error
  }
}

// Example: Logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log('User logged out')
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// Example: Get Current User
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Get user error:', error)
    throw error
  }
}

// Example: Update User Profile
export async function updateUserProfile(updates: any) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })

    if (error) throw error
    console.log('Profile updated:', data.user)
    return data.user
  } catch (error) {
    console.error('Profile update error:', error)
    throw error
  }
}

// Example: Password Reset
export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`
      }
    )

    if (error) throw error
    console.log('Password reset email sent')
    return data
  } catch (error) {
    console.error('Password reset error:', error)
    throw error
  }
}

// Example: React Auth Hook
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getInitialUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// Example: Protected Route Component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return React.createElement('div', null, 'Loading...')
  }

  if (!user) {
    return React.createElement('div', null, 'Please log in to access this page.')
  }

  return React.createElement(React.Fragment, null, children)
}