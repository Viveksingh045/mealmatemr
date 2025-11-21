"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import CreateStoreFormDialog from "@/components/CreateStore";
import StoreCard from "@/components/StoreCard";

type StoreAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
};

type Store = {
  id: string;
  imageUrl?: string | null;
  name: string;
  description?: string | null;
  address?: StoreAddress | null;
};

const formatAddress = (address?: StoreAddress | null) => {
  if (!address) return "";

  const { line1, line2, city, state, country, pincode } = address;

  return [line1, line2, pincode, city, state, country].filter(Boolean).join(", ");
};

export default function StorePage() {
  const [stores, setStores] = useState<Store[]>([]);

  const handleEdit = (storeName: string) => {
    console.log(`Editing details for store: ${storeName}`);
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("/api/store/me");   // change route if needed
        const rawStores = res?.data?.data?.Store;
        const normalisedStores: Store[] = Array.isArray(rawStores)
          ? rawStores
          : rawStores
            ? [rawStores]
            : [];

        setStores(normalisedStores);
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <CreateStoreFormDialog />

      {stores.length === 0 ? (
      <p className="text-muted-foreground">No stores available.</p>
      ) : (
      stores.map(store => (
        <StoreCard
        key={store.id}
        store={{
          image: store.imageUrl ?? "",
          name: store.name,
          description: store.description ?? "",
          address: formatAddress(store.address),
        }}
        onEdit={() => handleEdit(store.name)}
        />
      ))
      )}
    </div>
  );
}
