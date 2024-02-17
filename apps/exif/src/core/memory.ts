import { read } from 'fast-exif';
import path from 'path';
import readdirp, { ReaddirpOptions } from 'readdirp';
import { Memory, Photo, Rename } from '../types';
import { renameMultipleFiles, serializeDate, writeJSONToFile } from '../tools';

const JPG_FILE_EXTENSION = 'jpg';

export const createMemory = (path: string): Memory => {
  return {
    events: [],
    moments: new Map(),
    path,
  };
};

export interface LoadMemoryOptions {
  recursive?: boolean;
}

export const loadMemory = async (
  memory: Memory,
  loadMemoryOptions: LoadMemoryOptions = { recursive: false }
) => {
  const readdirpOptions: ReaddirpOptions = {
    depth: loadMemoryOptions.recursive ? Infinity : 0,
    type: 'files',
  };

  for await (const entry of readdirp(memory.path, readdirpOptions)) {
    const photo = (await read(
      path.resolve(entry.fullPath)
    )) as unknown as Photo;

    if (!photo) continue;

    const photoDate =
      photo.exif.DateTimeOriginal ||
      photo.exif.DateTimeDigitized ||
      photo.image.ModifyDate;

    const date = new Date(photoDate);
    const time = date.getTime();

    const moment =
      memory.moments.get(time) ||
      memory.moments
        .set(time, { date, files: [], photos: [], size: 0 })
        .get(time);

    moment.files.push(entry);
    moment.photos.push(photo);
    moment.size++;
  }
};

export interface RenameMemoryOptions {
  folders: boolean;
}

export const renameMemory = async (
  memory: Memory,
  renameMemoryOptions: RenameMemoryOptions = { folders: false }
) => {
  console.log('renameMemory', memory.path);
  console.log(memory.moments.size);

  const renameList: Rename[] = [];

  // Todo: If the folders option is true, sort the files into folders organized
  // by year/month. Think up other options...
  renameMemoryOptions;

  memory.moments.forEach((moment) =>
    moment.files.forEach((file, fileIndex) => {
      renameList.push({
        oldPath: file.fullPath,
        newPath: path.resolve(
          (file.dirent as any).path,
          `${serializeDate(moment.date)}${
            moment.size > 1 ? `-${fileIndex}` : ''
          }.${JPG_FILE_EXTENSION}`
        ),
      });
    })
  );

  writeJSONToFile(path.resolve(memory.path, 'rename.json'), renameList);

  renameMultipleFiles(renameList);
};
