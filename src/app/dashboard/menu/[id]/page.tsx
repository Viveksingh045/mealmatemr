// src/app/dashboard/menu/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import MenuForm from "@/components/MenuForm";
import { useRouter, useParams } from "next/navigation";
import { menuStore } from "@/lib/menu-store";

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState(() => menuStore.get(id) ?? null);

  useEffect(() => {
    setItem(menuStore.get(id) ?? null);
  }, [id]);

  if (!item) return <main className="container"><div>Item not found</div></main>;

  async function onSave(data: any) {
    menuStore.update(id, { ...data, price: Number(data.price) });
    router.push("/dashboard/menu");
  }

  return (
    <main className="container">
      <h2>Edit Menu Item</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <MenuForm initial={item} onSubmit={onSave} />
      </div>
    </main>
  );
}
