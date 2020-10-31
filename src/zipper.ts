import {Filter, PluginOptions, ZipperCallback} from './types';
import {generateZip} from './utils';

const Zipper = (callback?: ZipperCallback) => ({addFilter}: PluginOptions): Filter => {
  addFilter('ADD_ITEMS', async (items) => {
    const zips = generateZip(items);

    const zipFiles = callback ? callback(zips) : await Promise.all(zips);

    return items.filter((item) => !item._relativePath).concat(zipFiles || []);
  });

  return {options: {}};
};

export default Zipper;
