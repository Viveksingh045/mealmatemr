import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 1. Define the TypeScript interface for the Store Data
interface StoreDetails {
  image: React.ReactNode; // Can be an <img> element, an icon, or null
  name: string;
  description: string;
  address: string;
}

// 2. Define the TypeScript interface for the Component Props
interface StoreCardProps {
  store: StoreDetails; // The data object for the store
  onEdit: (storeName: string) => void; // The function to call when the button is clicked
}

// 3. Update the component to accept props
const StoreCard = ({ store, onEdit }: StoreCardProps) => {
  return (
    <Card className="w-[350px] m-6">
      <CardHeader>
        {/* Placeholder for the Image */}
        <div className="mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {/* Use the image from props */}
          {store.image}
        </div>
        
        {/* Name (CardTitle) and Description (CardDescription) */}
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>{store.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Address */}
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Address:</p>
          {/* Use the address from props */}
          <p className="text-sm text-muted-foreground">{store.address}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        {/* Pass a function to the onClick handler that calls the onEdit prop */}
        <Button 
          className="w-full" 
          onClick={() => onEdit(store.name)} // Pass the store name back to the parent
        >
          Edit Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;