import type { Filter, PluginOptions, ZipperOptions } from './types';
declare const FilepondZipper: (options?: ZipperOptions) => ({ addFilter }: PluginOptions) => Filter;
export default FilepondZipper;
