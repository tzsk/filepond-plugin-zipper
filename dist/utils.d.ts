import { ItemType } from "./types";
export declare const getDirectoryGroups: (items: ItemType[]) => Map<string, ItemType[]>;
export declare const generateZip: (items: ItemType[]) => Promise<ItemType[]>;
