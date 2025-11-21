import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StoreDetails {
  image: string | React.ReactNode;
  name: string;
  description: string;
  address: string;
}

interface StoreCardProps {
  store: StoreDetails;
  onEdit: (storeName: string) => void;
}

const StoreCard = ({ store, onEdit }: StoreCardProps) => {
  return (
    <Card className="w-[350px] m-6">
      <CardHeader>
        {/* Image */}
        <div className="mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {typeof store.image === "string" && store.image !== "" ? (
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          ) : (
            store.image
          )}
        </div>

        {/* Name + Description */}
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>{store.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm font-medium leading-none">Address:</p>
        <p className="text-sm text-muted-foreground">{store.address}</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={() => onEdit(store.name)}>
          Edit Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;