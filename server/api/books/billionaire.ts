// server/api/books/billionaire.ts

// Correctly import your data from the data folder
import { billionaireBooks } from "~/data/billionaire-books";

export default defineEventHandler((event) => {
  // This is a common pattern for mocking API delays to test loading states.
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(billionaireBooks);
    },
        1500); // 1.5 second delay
  });
});
