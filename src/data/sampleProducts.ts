// src/data/sampleProducts.ts
import type { MenuItem } from "@/lib/menu-store";

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "p1",
    name: "Veg Biryani",
    description: "Fluffy basmati rice cooked with spices and veggies.",
    price: 199,
    image: "/mnt/data/7ca70ad0-db09-4a62-9e3b-d938ee9f091e.png",
    available: true
  },
  {
    id: "p2",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese grilled to perfection.",
    price: 249,
    image: "/mnt/data/7ca70ad0-db09-4a62-9e3b-d938ee9f091e.png",
    available: true
  },
];
