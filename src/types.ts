interface TargetFilter {
  ADD_ITEMS: string;
}

export type FilterKey = keyof TargetFilter;

export interface ItemType extends File {
  _relativePath?: string;
}

type FilterCallback = (items: ItemType[]) => Promise<ItemType[]>;
type AddFilterCallback = (key: FilterKey, callback: FilterCallback) => void;

export interface PluginOptions {
  addFilter: AddFilterCallback;
}

export interface Filter {
  options: unknown;
}

export type ZipperCallback = (items: Promise<ItemType>[]) => ItemType[];

export class Item extends File implements ItemType {
  _relativePath?: string;
}
