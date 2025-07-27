import { defineStore } from 'pinia';

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    lastUpdated: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    isCacheValid(state) {
      return (
        state.lastUpdated && Date.now() - state.lastUpdated < CACHE_DURATION
      );
    },
  },

  actions: {
    async fetchProducts(forceRefresh = false) {
      if (this.isLoading) return;
      if (!forceRefresh && this.products.length && this.isCacheValid) {
        return products;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const data = await this.fetchSheetData();
        this.products = data;

        this.lastUpdated = Date.now();
        return this.products;
      } catch (err) {
        this.error = err.message || 'Failed to fetch products';
        console.error('Error fetching products:', err);

        // Return cached data if available
        if (this.products.length) return this.products;
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchSheetData() {
      const response = await fetch(import.meta.env.VITE_GSHEETS_SHEET_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const csvData = await response.text();
      const lines = csvData.replace(/\r/g, '').split('\n');
      const headers = lines[0].split(',').map((header) => header.trim());

      return lines.slice(1).map((line) => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
          if (index === 5) {
            // Handle multiple image URLs starting from index 5
            const imageUrls = values
              .slice(index)
              .map((url) => url?.trim().replace(/"/g, ''))
              .filter((url) => url && url.startsWith('http'));
            obj[header] = imageUrls;
          } else {
            obj[header] = values[index]?.trim() || '';
          }
          return obj;
        }, {});
      });
    },
  },

  persist: true,
});
