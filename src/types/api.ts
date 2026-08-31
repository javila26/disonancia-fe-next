export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
  };
};

export type EntityResponse<T> = {
  success: boolean;
  data: T;
};
