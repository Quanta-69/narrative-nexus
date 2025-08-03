// This composable fetches a list of books for a given category from the server API.
// It is now reactive, so it will re-fetch data whenever the categorySlug changes.

import { ref, watch } from "vue";

// Define the shape of the book data for a clean return value
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  slug: string;
  categorySlug: string;
}

/**
 * Fetches a list of books for a given category from the Nuxt server API.
 *
 * @param categorySlug A reactive string (ref or computed) of the category slug.
 * @returns An object with reactive data, pending, and error states.
 */
export const useBooks = (categorySlug: string) => {
  const books = ref<Book[] | null>(null);
  const pending = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchBooks = async (slug: string) => {
    pending.value = true;
    error.value = null;

    // Defensive check to ensure we have a valid slug before fetching.
    if (!slug) {
      books.value = null;
      pending.value = false;
      return;
    }

    try {
      const response = await $fetch<{ books: any[]; categoryName: string; error?: string }>(`/api/books/${slug}`);

      if ("error" in response && typeof response.error === "string") {
        throw new Error(response.error);
      }

      books.value = response.books.map(book => ({
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

  // Watch for changes in the categorySlug and re-fetch books.
  // The immediate: true option runs the fetchBooks function on initial load.
  watch(() => categorySlug, (newSlug) => {
    fetchBooks(newSlug);
  }, { immediate: true });

  return {
    books,
    pending,
    error,
  };
};
