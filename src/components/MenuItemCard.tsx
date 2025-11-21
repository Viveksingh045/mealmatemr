// src/components/MenuItemCard.tsx
"use client";
import React from "react";
import type { MenuItem } from "@/lib/menu-store";
import Link from "next/link";

export default function MenuItemCard({ item, showEdit = false }: { item: MenuItem; showEdit?: boolean }) {
  return (
    <div className="card" style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 110, height: 90, flexShrink: 0, background: "#f3f4f6", borderRadius: 8, overflow: "hidden" }}>
        <img
          src={item.image ?? "/placeholder.png"}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ margin: 0 }}>{item.name}</h3>
          <div style={{ fontWeight: 600 }}>₹{item.price}</div>
        </div>
        <p className="small" style={{ marginTop: 6 }}>{item.description}</p>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          {showEdit && <Link href={`/dashboard/menu/${item.id}`}><button className="btn">Edit</button></Link>}
          <span className="small">{item.available ? "Available" : "Unavailable"}</span>
        </div>
      </div>
    </div>
  );
}
