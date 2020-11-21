import {Filter, PluginOptions, ZipperCallback} from './types';
import {generateZip} from './utils';

const FilepondZipper = (callback?: ZipperCallback) => ({addFilter}: PluginOptions): Filter => {
  addFilter('ADD_ITEMS', async (items) => {
    const generators = generateZip(items);
    const plainFiles = items.filter((item) => !item._relativePath);

    if (callback) {
      callback(generators);

      return plainFiles;
    }

    const zipFiles = await Promise.all(generators.map((generate) => generate()));

    return plainFiles.concat(zipFiles);
  });

  return {options: {}};
};

export default FilepondZipper;
