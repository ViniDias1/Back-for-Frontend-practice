export interface PocketBasePaginatedResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: any[];
}
