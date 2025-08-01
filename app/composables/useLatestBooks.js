// This composable fetches the latest books from Supabase, ordered by creation date.

import { useSupabaseClient } from '#imports';
import { ref } from 'vue';

/**
 * Fetches the latest published books from Supabase.
 *
 * @returns An object with reactive data, pending, and error states.
 */
export const useLatestBooks = () => {
  const supabase = useSupabaseClient();
  const latestBooks = ref(null);
  const pending = ref(true);
  const error = ref(null);

  const fetchLatestBooks = async () => {
    pending.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await supabase
        .from('books')
        .select(`
          id,
          title,
          slug,
          cover_image_url,
          authors ( name ),
          categories ( slug )
        `)
        .eq('status', 'published') // Ensure we only get published books
        .order('created_at', { ascending: false }) // Order by creation date, most recent first
        .limit(10); // Fetch a reasonable number of latest books

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      // Map the fetched data to a cleaner format, including the category slug
      latestBooks.value = data.map(book => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        cover: book.cover_image_url,
        author: book.authors?.name || 'Unknown Author',
        categorySlug: book.categories?.slug,
      }));

    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
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
