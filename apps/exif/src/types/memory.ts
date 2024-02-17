import { Moment } from './moment';

export interface Event {
  start: Date;
  end: Date;
  moments: Moment[];
}

// Memory represents a bank of moments. This is essentially a cache.
// - events represent groups of moments that belong together. Like a trip, a
// holiday, or a week of celebration.
// - moments represent segments of time, shared by multiple photographs.
// - path is the root file path of where each moment was found.
export interface Memory {
  events: Event[];
  moments: Map<number, Moment>;
  path: string;
}
