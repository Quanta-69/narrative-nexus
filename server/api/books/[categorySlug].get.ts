// This server API endpoint fetches a list of books for a given category slug.
// It is now updated to work with the UUID foreign key in the 'books' table.

import { defineEventHandler, getRouterParams, createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const { categorySlug } = getRouterParams(event);

  if (!categorySlug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request: Category slug not provided.",
    });
  }

  // Step 1: Find the category's UUID using its text slug.
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id, name") // We need the ID to query the books table
    .eq("slug", categorySlug)
    .single();

  if (categoryError) {
    if (categoryError.code === "PGRST116") {
      throw createError({
        statusCode: 404,
        statusMessage: `Category with slug '${categorySlug}' not found.`,
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${categoryError.message}`,
    });
  }

  // Step 2: Use the found UUID to query the books table.
  const { data: booksData, error: booksError } = await supabase
    .from("books")
    .select(`
      id,
      title,
      slug,
      cover_image_url,
      authors ( name ),
      categories ( name, slug )
    `)
    // Now we correctly query the 'category_slug' column with a UUID
    .eq("category_slug", categoryData.id)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (booksError) {
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${booksError.message}`,
    });
  }

  return {
    books: booksData,
    categoryName: categoryData.name,
  };
});
