import JSZip from 'jszip';
import {GeneratorCallback, Item, ItemType, OnUpdateCallback} from './types';

const directories = {};

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

export const generateZip = (items: ItemType[]): GeneratorCallback[] => {
  getDirectoryGroups(items);

  return Object.keys(directories).map((name) => {
    const zip = new JSZip();

    directories[name].forEach((file) => {
      zip.file(file._relativePath, file);
    });

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete directories[name];

    return async (onUpdate?: OnUpdateCallback): Promise<ItemType> => {
      const file = await zip.generateAsync({type: 'blob'}, onUpdate);

      return new Item([file], `${name}.zip`);
    };
  });
};
