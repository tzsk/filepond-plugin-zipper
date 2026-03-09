import JSZip from 'jszip';
import {Item, ItemType, OnUpdateCallback} from './types';

const directories = {};

export const toError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }

  if (typeof err === 'string') {
    return new Error(err);
  }

  return new Error(String(err));
};

export const getDirectoryGroups = (items: ItemType[]): Record<string, ItemType[]> => {
  items
    .filter((item) => item._relativePath)
    .forEach((item) => {
      const [, group] = item._relativePath.split('/');

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
  getDirectoryGroups(items);

  return Object.keys(directories).map((name) => {
    const zip = new JSZip();

    directories[name].forEach((file) => {
      zip.file(file._relativePath, file);
    });

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete directories[name];

    return {
      name: `${name}.zip`,
      generate: async (onUpdate?: OnUpdateCallback): Promise<ItemType> => {
        const file = await zip.generateAsync({type: 'blob'}, onUpdate);

        return new Item([file], `${name}.zip`);
      },
    };
  });
};
