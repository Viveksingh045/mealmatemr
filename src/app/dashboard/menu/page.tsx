"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import MenuItemForm from "@/components/MenuForm";
import MenuItemCard from "@/components/MenuItemCard";
import { menuStore, type MenuItem } from "@/lib/menu-store";
import { toast } from "sonner";

/**
 * Dashboard Menu Page (modal form UI -> matches CreateStore.tsx style)
 * Reference UI example: /mnt/data/CreateStore.tsx
 */

export default function DashboardMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(() => menuStore.list());
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    // seed sample if empty (only first run)
    if (items.length === 0) {
      // keep this optional; you can remove or replace with real seed
      try {
        // import dynamic sample if present
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { SAMPLE_MENU } = require("@/data/sampleProducts");
        if (Array.isArray(SAMPLE_MENU) && SAMPLE_MENU.length > 0) {
          menuStore.resetToSample(SAMPLE_MENU);
          setItems(menuStore.list());
        }
      } catch {
        // ignore if sample not available
      }
    }
  }, []);

  function refresh() {
    setItems(menuStore.list());
  }

  async function handleCreate(payload: any) {
    try {
      // payload includes imageFile? if uploaded
      // For demo: if imageFile present, we won't upload anywhere; just ignore file and use imageUrl if provided
      const created = menuStore.create({
        name: payload.name,
        description: payload.description,
        price: Number(payload.price),
        image: payload.imageUrl ?? undefined,
        available: payload.available ?? true,
      });
      toast.success("Menu item created");
      setOpenCreateDialog(false);
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Create failed");
    }
  }

  async function handleEdit(payload: any) {
    try {
      if (!editing) return;
      menuStore.update(editing.id, {
        name: payload.name,
        description: payload.description,
        price: Number(payload.price),
        image: payload.imageUrl ?? editing.image,
        available: payload.available ?? true,
      });
      toast.success("Menu item updated");
      setEditing(null);
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    menuStore.remove(id);
    toast.success("Deleted");
    refresh();
  }

  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Menu</h2>

        {/* Create button opens modal (AlertDialog pattern like CreateStore.tsx) */}
        <AlertDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="default">➕ Create New Item</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Menu Item</AlertDialogTitle>
              <AlertDialogDescription>Fill item details and upload an image.</AlertDialogDescription>
            </AlertDialogHeader>

            <div style={{ marginTop: 8 }}>
              <MenuItemForm
                onSubmit={handleCreate}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <div />{/* placeholder: primary action is inside MenuItemForm submit button */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {items.length === 0 && <div className="card">No menu items yet.</div>}
        {items.map((it) => (
          <div key={it.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <MenuItemCard item={it} showEdit />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={() => { setEditing(it); }} className="btn">Edit</Button>

              <Button variant="destructive" onClick={() => handleDelete(it.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit dialog (reuses same AlertDialog style) */}
      <AlertDialog open={!!editing} onOpenChange={(val) => { if (!val) setEditing(null); }}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Menu Item</AlertDialogTitle>
            <AlertDialogDescription>Edit the item and save.</AlertDialogDescription>
          </AlertDialogHeader>

          <div style={{ marginTop: 8 }}>
            {editing && (
              <MenuItemForm
                initial={{
                  name: editing.name,
                  description: editing.description,
                  price: editing.price,
                  imageUrl: editing.image,
                  available: editing.available,
                }}
                onSubmit={handleEdit}
              />
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditing(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <div />{/* submit handled by form */}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
