// src/app/dashboard/menu/new/page.tsx
"use client";
import React from "react";
import MenuForm from "@/components/MenuForm";
import { useRouter } from "next/navigation";
import { menuStore } from "@/lib/menu-store";

export default function NewMenuPage() {
  const router = useRouter();

  async function onCreate(data: any) {
    menuStore.create({ ...data, price: Number(data.price) });
    router.push("/dashboard/menu");
  }

  return (
    <main className="container">
      <h2>Create Menu Item</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <MenuForm onSubmit={onCreate} />
      </div>
    </main>
  );
}
