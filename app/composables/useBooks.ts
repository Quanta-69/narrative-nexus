// This composable now fetches the latest books by calling our new type-safe server API endpoint.

import { ref } from 'vue';

// Define the shape of the book data as it's returned from our server API.
interface Book {
  id: string;
  title: string;
  slug: string;
  cover: string;
  author: string;
  categorySlug: string;
}

/**
 * Fetches the latest published books from the Nuxt server API.
 *
 * @returns An object with reactive data, pending, and error states.
 */
export const useLatestBooks = () => {
  const latestBooks = ref<Book[] | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchLatestBooks = async () => {
    pending.value = true;
    error.value = null;
    try {
      const response = await $fetch<{ books: Book[], error?: string }>('/api/books/latest');
      
      if ('error' in response && typeof response.error === 'string') {
        throw new Error(response.error);
      }
      
      latestBooks.value = response.books;

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
