// store.js
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(newItem) {
      this.items.push(newItem);
    },
    updateItem(updatedItem) {
      const index = this.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        this.items[index] = updatedItem;
      }
    },
    deleteItem(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId);
    }
  }
});
