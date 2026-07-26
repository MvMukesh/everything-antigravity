import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';

export function copyRecursiveSync(src, dest, force = false) {
  if (!existsSync(src)) return;
  const stats = lstatSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(join(src, childItemName), join(dest, childItemName), force);
    });
  } else {
    if (force || !existsSync(dest)) {
      copyFileSync(src, dest);
    }
  }
}
