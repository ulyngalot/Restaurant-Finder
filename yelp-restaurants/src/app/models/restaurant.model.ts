export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  coordinates: Coordinates;
  imageUrl: string;
  categories: string;
  isClosed: boolean;
}

export interface RestaurantSearchResponse {
  restaurants: Restaurant[];
  total: number;
}
