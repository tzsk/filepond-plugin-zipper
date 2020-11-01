import { Filter, PluginOptions, ZipperCallback } from './types';
declare const Zipper: (callback?: ZipperCallback) => ({ addFilter }: PluginOptions) => Filter;
export default Zipper;
