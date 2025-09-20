// Basic Supabase client setup
import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase project credentials
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Example: Basic CRUD operations
export async function basicCrudExample() {
  try {
    // INSERT: Create a new record
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        { name: 'John Doe', email: 'john@example.com' }
      ])
      .select()

    if (insertError) throw insertError
    console.log('Inserted:', insertData)

    // SELECT: Read records
    const { data: selectData, error: selectError } = await supabase
      .from('users')
      .select('*')
      .limit(10)

    if (selectError) throw selectError
    console.log('Selected:', selectData)

    // UPDATE: Modify a record
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ name: 'Jane Doe' })
      .eq('email', 'john@example.com')
      .select()

    if (updateError) throw updateError
    console.log('Updated:', updateData)

    // DELETE: Remove a record
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('email', 'john@example.com')

    if (deleteError) throw deleteError
    console.log('Record deleted successfully')

  } catch (error) {
    console.error('Error:', error)
  }
}

// Example: Filtering and querying
export async function queryingExample() {
  try {
    // Simple filter
    const { data: filtered } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)

    // Multiple filters
    const { data: multiFiltered } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .gte('created_at', '2023-01-01')
      .order('created_at', { ascending: false })

    // Text search
    const { data: searched } = await supabase
      .from('posts')
      .select('*')
      .textSearch('title', 'supabase')

    // Join with related data
    const { data: joined } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          name,
          email
        )
      `)

    console.log('Filtered:', filtered)
    console.log('Multi-filtered:', multiFiltered)
    console.log('Searched:', searched)
    console.log('Joined:', joined)

  } catch (error) {
    console.error('Querying error:', error)
  }
}

// Example: Using PostgreSQL functions
export async function functionsExample() {
  try {
    // Call a stored procedure
    const { data, error } = await supabase
      .rpc('get_user_posts_count', { user_id: 'some-uuid' })

    if (error) throw error
    console.log('Function result:', data)

  } catch (error) {
    console.error('Function error:', error)
  }
}