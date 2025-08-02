// This server API endpoint fetches a list of books for a given category slug.
// It is called by the `useBooks` composable.

import { defineEventHandler, getRouterParams, createError } from 'h3';
// Correctly import the server-side Supabase client utility.
import { serverSupabaseClient } from '#supabase/server';
// Import your generated database types for type-safety.
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  // Get the Supabase server client from the server context and pass the Database type.
  const supabase = await serverSupabaseClient<Database>(event);
  
  // Get the categorySlug from the route parameters
  const { categorySlug } = getRouterParams(event);

  // Defensive check for the slug
  if (!categorySlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Category slug not provided.',
    });
  }

  // First, get the category details to ensure it exists and get its name
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', categorySlug)
    .single();

  if (categoryError) {
    // If the category is not found, return a 404 error
    if (categoryError.code === 'PGRST116') { // This code indicates no rows found
        throw createError({
            statusCode: 404,
            statusMessage: `Category with slug '${categorySlug}' not found.`,
        });
    }
    // For any other database error, return a 500 error
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${categoryError.message}`,
    });
  }

  // Now, fetch all published books that belong to the found category
  const { data: booksData, error: booksError } = await supabase
    .from('books')
    .select(`
      id,
      title,
      slug,
      cover_image_url,
      authors ( name ),
      categories ( name )
    `)
    .eq('category_slug', categorySlug)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (booksError) {
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${booksError.message}`,
    });
  }

  // Return the fetched data to the client
  return {
    books: booksData,
    // The type of categoryData is now correctly inferred, so no error here.
    categoryName: categoryData.name,
  };
});
