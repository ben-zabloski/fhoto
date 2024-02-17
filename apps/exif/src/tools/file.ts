import fs from 'fs/promises';

export async function writeJSONToFile(
  path: string,
  data: any,
  dryRun: boolean = true
): Promise<void> {
  if (dryRun) {
    console.log('writeJSONToFile', path, data);
    return;
  }

  const jsonString = JSON.stringify(data, null, 2);

  await fs.writeFile(path, jsonString, 'utf8');
}

export async function readJSONFromFile<T>(path: string): Promise<T> {
  const data = await fs.readFile(path, 'utf8');

  return JSON.parse(data);
}

export async function renameFile(
  oldPath: string,
  newPath: string,
  dryRun: boolean = true
): Promise<void> {
  if (dryRun) {
    console.log(`- rename ${oldPath} to ${newPath}`);
    return;
  }

  await fs.rename(oldPath, newPath);
}

export async function renameMultipleFiles(
  filePaths: Array<{ oldPath: string; newPath: string }>,
  dryRun: boolean = true
): Promise<void> {
  await Promise.all(
    filePaths.map((paths) => renameFile(paths.oldPath, paths.newPath, dryRun))
  );
}
