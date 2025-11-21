// src/app/menu/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { menuStore } from "@/lib/menu-store";
import MenuItemCard from "@/components/MenuItemCard";

export default function PublicMenuPage() {
  const [items, setItems] = useState(() => menuStore.list());

  useEffect(() => {
    setItems(menuStore.list());
    // optional: subscribe to storage events for cross-tab update
    function onStorage() {
      setItems(menuStore.list());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main className="container">
      <h1>Menu</h1>
      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {items.filter(i => i.available).map(it => (
          <MenuItemCard key={it.id} item={it} />
        ))}
        {items.filter(i => i.available).length === 0 && <div className="card">No items available.</div>}
      </div>
    </main>
  );
}
