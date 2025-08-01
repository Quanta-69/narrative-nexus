// This is a server route to fetch the latest published books, using the Supabase
// Database type for enhanced type-safety.

import { serverSupabaseClient } from '#supabase/server';
import { defineEventHandler } from 'h3';
// Import your generated database types from the correct path.
import type { Database } from '~/supabase/types/database.types';

export default defineEventHandler(async (event) => {
  try {
    // Get the Supabase client with the Database type provided.
    const client = await serverSupabaseClient<Database>(event);

    const { data: booksData, error: booksError } = await client
      .from('books')
      .select(`
        id,
        title,
        slug,
        cover_image_url,
        authors ( name ),
        categories ( slug )
      `)
      .eq('status', 'published') // Only fetch published books
      .order('created_at', { ascending: false }) // Order by creation date, most recent first
      .limit(10); // Fetch a reasonable number of latest books

    if (booksError) {
      throw new Error(booksError.message);
    }
    
    // The data returned from the query is now type-safe, thanks to the Database type.
    const latestBooks = booksData.map(book => ({
      id: book.id,
      title: book.title,
      slug: book.slug,
      cover: book.cover_image_url,
      author: book.authors?.name || 'Unknown Author',
      categorySlug: book.categories?.slug,
    }));

    return { books: latestBooks };

  } catch (error) {
    console.error('Server API Error:', error);
    return {
      status: 500,
      error: 'An unexpected server error occurred.',
    };
  }
});
