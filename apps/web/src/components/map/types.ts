export interface StreamLocation {
  lat: number;
  lng: number;
}

export type StreamStatus = "active" | "funded" | "pending";

export interface JulesPayStream {
  id: string;
  title: string;
  description: string;
  location: StreamLocation;
  amount: string;
  currency: string;
  status: StreamStatus;
  creator: string;
  category: string;
  payRate?: number;
  deadline?: string;
  altitude?: number;
}

export type JobSortOption = "pay" | "deadline" | "altitude";

export interface StreamCluster {
  id: string;
  latitude: number;
  longitude: number;
  count: number;
  streams: JulesPayStream[];
}

export interface JulesPayMapFilters {
  status?: StreamStatus[];
  category?: string[];
  searchQuery?: string;
}

export interface JulesPayMapProps {
  streams: JulesPayStream[];
  className?: string;
  filters?: JulesPayMapFilters;
  onStreamSelect?: (stream: JulesPayStream) => void;
  onFilterChange?: (filters: JulesPayMapFilters) => void;
  isLoading?: boolean;
}
