// This composable fetches a single book from the Nuxt server API.
// It is now updated to handle both category and book slugs.

import { ref } from 'vue';

// Define the shape of the book data as the component will consume it.
interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  cover: string;
  slug: string;
  categorySlug: string;
}

// Define the shape of the data returned directly from our server API.
// This is necessary because the server API returns nested objects for authors and categories.
interface ServerBookResponse {
  id: string;
  title: string;
  slug: string;
  synopsis: string;
  cover_image_url: string;
  authors: { name: string } | null;
  categories: { slug: string } | null;
}

/**
 * Fetches a single book from the Nuxt server API by its slugs.
 *
 * @param categorySlug The slug of the category the book belongs to.
 * @param bookSlug The slug of the book to fetch.
 * @returns An object with reactive data, pending, and error states.
 */
export const useBook = (categorySlug: string, bookSlug: string) => {
  const book = ref<Book | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchBook = async () => {
    pending.value = true;
    error.value = null;

    // Defensive check to ensure we have valid slugs before fetching.
    if (!categorySlug || !bookSlug) {
      error.value = new Error('Category or book slug not provided.');
      pending.value = false;
      return;
    }

    try {
      // Use both slugs in the URL to correctly hit the server API endpoint
      const response = await $fetch<{ book: ServerBookResponse, error?: string }>(`/api/books/${categorySlug}/${bookSlug}`);

      if ('error' in response && typeof response.error === 'string') {
        throw new Error(response.error);
      }
      
      // Map the server's response to our desired, flattened Book interface
      book.value = {
        id: response.book.id,
        title: response.book.title,
        slug: response.book.slug,
        synopsis: response.book.synopsis,
        cover: response.book.cover_image_url,
        author: response.book.authors?.name || 'Unknown Author',
        categorySlug: response.book.categories?.slug || 'uncategorized',
      };
      
    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  fetchBook();

  return {
    book,
    pending,
    error,
  };
};
