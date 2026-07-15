import { Badge } from "@/components/ui/badge";

const SideCard = () => {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="bg-white h-20 w-20 rounded-md border p-5"></div>
      <div>
        <h2 className="text-lg font-semibold">Product Name</h2>
        <Badge variant="success">Indoor</Badge>
        <p className="mt-2 text-sm text-muted-foreground">$29.99</p>
      </div>
    </div>
  );
};

export default SideCard;
