// This composable fetches the latest published books from Supabase, ordered by creation date.

import { useSupabaseClient } from "#imports";
import { ref } from "vue";

// Import the generated Supabase types.
import type { Database } from "~/supabase/types/database.types";

// Define the shape of the book data with category slug for a clean return value
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
  categorySlug: string; // Add categorySlug for the new route structure
}

/**
 * Fetches the latest published books from Supabase.
 *
 * @returns An object with reactive data, pending, and error states.
 */
export const useLatestBooks = () => {
  const supabase = useSupabaseClient<Database>();
  const latestBooks = ref<Book[] | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchLatestBooks = async () => {
    pending.value = true;
    error.value = null;
    try {
      // Corrected select statement. It no longer selects the `status` column.
      const { data, error: fetchError } = await supabase
        .from("books")
        .select(`
          id,
          title,
          slug,
          cover_image_url,
          authors ( name ),
          categories ( slug )
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      latestBooks.value = data.map(book => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        cover: book.cover_image_url,
        author: book.authors?.name || "Unknown Author",
        categorySlug: book.categories?.slug || "uncategorized",
      }));
    }
    catch (err) {
      console.error(err);
      error.value = err;
    }
    finally {
      pending.value = false;
    }
  };

  fetchLatestBooks();

  return {
    latestBooks,
    pending,
    error,
  };
};
