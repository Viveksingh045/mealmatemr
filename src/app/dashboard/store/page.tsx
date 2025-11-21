"use client";

import CreateStoreFormDialog from "@/components/CreateStore";
import StoreCard from "@/components/StoreCard";

export default function StorePage(){
  
  const bookstoreData = {
    image: <span className="text-4xl">📚</span>,
    name: "The Cozy Corner Bookstore",
    description: "Your local haven for new and used books, coffee, and community events.",
    address: "123 Main Street, Anytown, CA 90210",
  };

  const handleEdit = (storeName: string) => {
    console.log(`Editing details for store: ${storeName}`);
    alert(`Ready to edit: ${storeName}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
        <CreateStoreFormDialog />
      <StoreCard 
        store={bookstoreData} 
        onEdit={handleEdit} 
      />
    </div>
  );
};