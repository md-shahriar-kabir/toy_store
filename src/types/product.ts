export type AgeGroup = "0-2" | "3-5" | "6-8" | "9-12" | "12+";

export type Toy = {
  id: number;
  slug: string;
  sku: string;

  title: string;
  category: string; // must match Category.name

  rating: number;
  inStock: boolean;

  currentPrice: number;
  oldPrice: number;

  isTrending: boolean;
  todayBestDeal: boolean;

  ageGroup: AgeGroup;

  shortDescription: string;

  longDescription: {
    productOverview: string[];
    keyFeatures: string[];
    productSpecifications: string[];
    warrantyInformation: string[];
  };

  images: string[];
};
