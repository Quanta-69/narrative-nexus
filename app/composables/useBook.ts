// This composable now fetches a single book by calling our new type-safe server API endpoint.

import { ref } from 'vue';

// Define the shape of the book data as it's returned from our server API.
interface Book {
  id: string;
  title: string;
  synopsis: string;
  cover: string;
  slug: string;
  author: string;
  categorySlug: string;
}

/**
 * Fetches a single book from the Nuxt server API by its slug.
 *
 * @param {string} bookSlug The slug of the book to fetch.
 * @returns An object with reactive data, pending, and error states.
 */
export const useBook = (bookSlug: string) => {
  const book = ref<Book | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchBook = async () => {
    pending.value = true;
    error.value = null;
    try {
      const response = await $fetch<{ book: Book, error?: string }>(`/api/book/${bookSlug}`);
      
      if ('error' in response && typeof response.error === 'string') {
        throw new Error(response.error);
      }
      
      book.value = response.book;

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
