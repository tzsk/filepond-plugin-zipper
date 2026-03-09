import { type ItemType, type OnUpdateCallback } from './types';
export declare const toError: (err: unknown) => Error;
export declare const getDirectoryGroups: (items: ItemType[]) => Record<string, ItemType[]>;
export interface ZipGenerator {
    name: string;
    generate: (onUpdate?: OnUpdateCallback) => Promise<ItemType>;
}
export declare const generateZip: (items: ItemType[]) => ZipGenerator[];
