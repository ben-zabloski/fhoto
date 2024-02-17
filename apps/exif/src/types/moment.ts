import { Photo } from './photo';
import { File } from './file';

export interface Moment {
  date: Date;
  files: File[];
  photos: Photo[];
  size: number;
}
