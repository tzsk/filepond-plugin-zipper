import Zip from "jszip";
import { Item, ItemType } from "./types";

export const getDirectoryGroups = (items: ItemType[]): Map<string, ItemType[]> => {
  const directories = new Map();

  items
    .filter((item) => item._relativePath)
    .forEach((item) => {
      const [, group] = item._relativePath.split("/");
      if (!directories.has(group)) {
        directories.set(group, []);
      }

      directories.get(group).push(item);
    });

  return directories;
};

export const generateZip = (items: ItemType[]): Promise<ItemType[]> => {
  const directories = getDirectoryGroups(items);
  const generators = Array.from(directories.keys()).map(async (name) => {
    const zip = new Zip();
    directories.get(name).forEach((file) => {
      zip.file(file._relativePath, file);
    });

    directories.delete(name);

    const file = await zip.generateAsync({ type: "blob" });

    return new Item([file], `${name}.zip`);
  });

  return Promise.all(generators);
};
