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

export interface Metadata {
  percent: number;
  currentFile: string;
}

export type OnUpdateCallback = (metadata: Metadata) => void;

export interface ZipSuccess {
  name: string;
}

export interface ZipFailed {
  name: string;
  error: Error;
}

export interface ZipperOptions {
  onStart?: (directories: ZipSuccess[]) => void;
  onSuccess?: (successes: ZipSuccess[]) => void;
  onFailed?: (failures: ZipFailed[]) => void;
  onEnd?: (successes: ZipSuccess[], failures: ZipFailed[]) => void;
}

export class Item extends File implements ItemType {
  _relativePath?: string;
}
