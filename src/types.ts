interface TargetFilter {
  ADD_ITEMS: string;
}

export type FilterKey = keyof TargetFilter;

export interface ItemType extends File {
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

export type GeneratorCallback = (onUpdate?: OnUpdateCallback) => Promise<ItemType>;

export type ZipperCallback = (generators: GeneratorCallback[]) => unknown;

export class Item extends File implements ItemType {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _relativePath?: string;
}
