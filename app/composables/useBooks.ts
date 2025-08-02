// This composable fetches books from the Nuxt server API for a given category slug.
// It is now defensive against invalid slugs.

import { ref } from 'vue';

// Define the shape of the book data for a clean return value
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
}

/**
 * Fetches books from the Nuxt server API for a given category slug.
 *
 * @param categorySlug The slug of the category to fetch books for.
 * @returns An object with reactive data, pending, error states, and the category name.
 */
export const useBooks = (categorySlug: string) => {
  const books = ref<Book[] | null>(null);
  const categoryName = ref<string | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchBooks = async () => {
    pending.value = true;
    error.value = null;

    // Defensive check to ensure we have a valid slug before fetching.
    if (!categorySlug || categorySlug === 'latest') {
      error.value = new Error('No valid category slug provided.');
      pending.value = false;
      return;
    }

    try {
      const response = await $fetch<{ books: any[], categoryName?: string, error?: string }>(`/api/books/${categorySlug}`);
      
      if ('error' in response && typeof response.error === 'string') {
        throw new Error(response.error);
      }
      
      books.value = response.books.map(book => ({
        id: book.id,
        title: book.title,
        slug: book.slug,
        cover: book.cover_image_url,
        author: book.authors?.name || 'Unknown Author'
      }));

      categoryName.value = response.categoryName || 'Category';

    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  fetchBooks();

  return {
    books,
    categoryName,
    pending,
    error,
  };
};
