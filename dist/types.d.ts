import JSZip from "jszip";
declare global {
    interface Window {
        JSZip: JSZip;
    }
}
interface TargetFilter {
    FILTER_DROPPED_ITEMS: string;
}
export declare type FilterKey = keyof TargetFilter;
export interface ItemType extends File {
    _relativePath?: string;
}
declare type FilterCallback = (items: ItemType[]) => Promise<ItemType[]>;
declare type AddFilterCallback = (key: FilterKey, callback: FilterCallback) => void;
export interface PluginOptions {
    addFilter: AddFilterCallback;
}
export interface Filter {
    options: unknown;
}
export declare type ZipperCallback = (items: Promise<ItemType[]>) => ItemType[];
export declare class Item extends File implements ItemType {
    _relativePath?: string;
}
export {};
