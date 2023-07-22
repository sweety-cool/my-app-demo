import { writable } from "svelte/store";

  
export const WISHLIST = writable(JSON.parse(localStorage.getItem("wishlist")) || []);

