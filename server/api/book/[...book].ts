// This is a dynamic server route that fetches books for any given category slug,
// now using the Supabase Database type for full type-safety.

import { serverSupabaseClient } from '#supabase/server';
import { defineEventHandler, getRouterParams } from 'h3';
import type { Database } from '~/supabase/types/database.types';

export default defineEventHandler(async (event) => {
  // Use getRouterParams to get the dynamic category slug.
  const { category } = getRouterParams(event);

  if (!category || !Array.isArray(category) || category.length === 0) {
    return {
      status: 400,
      error: 'Category slug not provided.',
    };
  }
  
  const categorySlug = category[0];

  try {
    const client = await serverSupabaseClient<Database>(event);

    const { data: categoryData, error: categoryError } = await client
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (categoryError || !categoryData) {
      throw new Error('Category not found.');
    }
    
    const categoryId = (categoryData as { id: string }).id;

    const { data: booksData, error: booksError } = await client
      .from('books')
      .select(`
        id,
        title,
        slug,
        cover_image_url,
        author_id,
        authors ( name )
      `)
      .eq('category_id', categoryId)
      .eq('status', 'published');

    if (booksError) {
      throw new Error(booksError.message);
    }
    
    return { books: booksData };

  } catch (error) {
    console.error('Server API Error:', error);
    return {
      status: 500,
      error: 'An unexpected server error occurred.',
    };
  }
});
