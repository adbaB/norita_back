export interface StatsResponse {
  average: number;

  rating: { rating: number; count: string }[];

  total: number;
}
