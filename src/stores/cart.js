import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalCost(state) {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity ?? 1);
      }, 0);
    },
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },

  actions: {
    addItem(item, toast) {
      const existingItem = this.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        const serializableItem = {
          ...item,
          quantity: item.quantity ?? 1,
        };
        this.items.push(serializableItem);
      }
              toast.success('Operation completed successfully!');


    },

    removeItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
    },

    updateQuantity(itemId, newQuantity) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = Math.max(1, newQuantity);
      }
    },

    incrementQuantity(itemId, amount = 1) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity += amount;
      }
    },

    decrementQuantity(itemId, amount = 1) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = Math.max(1, item.quantity - amount);
      }
    },

    clearCart() {
      this.items = [];
    },
  },
  persist: true,
});
