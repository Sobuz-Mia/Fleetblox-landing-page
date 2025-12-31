export type ProgressData = {
  in_progress?: boolean;
  percentage?: number;
  status?: Record<string, boolean>;
  start_times?: Record<string, string | null | undefined>;
  location: string | null | undefined;
  duration: number | null | undefined;
};
