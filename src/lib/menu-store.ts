// src/lib/menu-store.ts
export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  available?: boolean;
};

const STORAGE_KEY = "merchant_menu_v1";

function readStorage(): MenuItem[] {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [];
    return JSON.parse(raw) as MenuItem[];
  } catch {
    return [];
  }
}

function writeStorage(items: MenuItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const menuStore = {
  list(): MenuItem[] {
    return readStorage();
  },

  get(id: string): MenuItem | undefined {
    return readStorage().find((i) => i.id === id);
  },

  create(item: Omit<MenuItem, "id">): MenuItem {
    const items = readStorage();
    const newItem: MenuItem = { ...item, id: String(Date.now()) };
    items.unshift(newItem);
    writeStorage(items);
    return newItem;
  },

  update(id: string, patch: Partial<MenuItem>): MenuItem | undefined {
    const items = readStorage();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...patch };
    writeStorage(items);
    return items[idx];
  },

  remove(id: string) {
    const items = readStorage().filter((i) => i.id !== id);
    writeStorage(items);
  },

  resetToSample(sample: MenuItem[]) {
    writeStorage(sample);
  }
};
