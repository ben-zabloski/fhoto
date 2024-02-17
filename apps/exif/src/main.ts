import path from 'path';
import {
  LoadMemoryOptions,
  RenameMemoryOptions,
  createMemory,
  loadMemory,
  renameMemory,
} from './core/memory';

interface MainOptions {
  loadMemoryOptions: LoadMemoryOptions;
  renameMemoryOptions: RenameMemoryOptions;
  sourcePath: string;
}

async function main(
  { loadMemoryOptions, renameMemoryOptions, sourcePath }: MainOptions = {
    loadMemoryOptions: { recursive: false },
    renameMemoryOptions: { folders: false },
    sourcePath: path.resolve('/home/ben/projects/exif/apps/exif/src/assets'),
  }
) {
  console.log('Fhoto:');
  console.log('- Directory:', sourcePath);

  const memory = createMemory(sourcePath);
  await loadMemory(memory, loadMemoryOptions);
  await renameMemory(memory, renameMemoryOptions);
}

main();
