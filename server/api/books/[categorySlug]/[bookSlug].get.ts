// This server API endpoint fetches a single book for a given category and book slug.
// It is called by a client-side composable or useFetch call on the book details page.

import { defineEventHandler, getRouterParams, createError } from 'h3';
import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  // Get the Supabase server client and pass the Database type for type-safety
  const supabase = await serverSupabaseClient<Database>(event);
  
  // Get the slugs from the route parameters
  const { categorySlug, bookSlug } = getRouterParams(event);

  // Defensive check for the slugs
  if (!categorySlug || !bookSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Category or book slug not provided.',
    });
  }

  // Fetch the single book with its related author and category data.
  // We use both slugs to ensure we fetch the correct book.
  const { data: bookData, error: bookError } = await supabase
    .from('books')
    .select(`
      id,
      title,
      slug,
      synopsis,
      cover_image_url,
      authors ( name ),
      categories ( name, slug )
    `)
    .eq('category_slug', categorySlug)
    .eq('slug', bookSlug)
    .eq('status', 'published') // Ensure we only get published books
    .single();

  if (bookError) {
    // If the book is not found, return a 404 error
    if (bookError.code === 'PGRST116') {
        throw createError({
            statusCode: 404,
            statusMessage: `Book with slug '${bookSlug}' in category '${categorySlug}' not found.`,
        });
    }
    // For any other database error, return a 500 error
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${bookError.message}`,
    });
  }

  // Return the fetched data to the client
  return {
    book: bookData,
  };
});
