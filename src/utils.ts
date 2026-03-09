import JSZip from 'jszip';
import { Item, type ItemType, type OnUpdateCallback } from './types';

export const toError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }

  if (typeof err === 'string') {
    return new Error(err);
  }

  return new Error(String(err));
};

export const getDirectoryGroups = (
  items: ItemType[],
): Record<string, ItemType[]> => {
  const directories: Record<string, ItemType[]> = {};
  items
    .filter((item) => item._relativePath)
    .forEach((item) => {
      const [group] = item._relativePath.split('/').filter(Boolean);

      if (!directories[group]) {
        directories[group] = [];
      }

      directories[group].push(item);
    });

  return directories;
};

export interface ZipGenerator {
  name: string;
  generate: (onUpdate?: OnUpdateCallback) => Promise<ItemType>;
}

export const generateZip = (items: ItemType[]): ZipGenerator[] => {
  const directories = getDirectoryGroups(items);

  return Object.keys(directories).map((name) => {
    const zip = new JSZip();

    directories[name].forEach((file) => {
      zip.file(file._relativePath, file);
    });

    return {
      name: `${name}.zip`,
      generate: async (onUpdate?: OnUpdateCallback): Promise<ItemType> => {
        const file = await zip.generateAsync({ type: 'blob' }, onUpdate);

        return new Item([file], `${name}.zip`);
      },
    };
  });
};
