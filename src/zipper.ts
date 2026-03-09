import {Filter, PluginOptions, ZipperOptions, ItemType, ZipSuccess, ZipFailed} from './types';
import {generateZip, toError} from './utils';

const FilepondZipper =
  (options?: ZipperOptions) =>
  ({addFilter}: PluginOptions): Filter => {
    addFilter('ADD_ITEMS', async (items) => {
      const generators = generateZip(items);
      const plainFiles = items.filter((item) => !item._relativePath);

      if (generators.length === 0) {
        return plainFiles;
      }

      const {onStart, onSuccess, onFailed, onEnd} = options || {};

      if (onStart) {
        onStart(generators.map((g) => ({name: g.name})));
      }

      const results = await Promise.allSettled(generators.map((g) => g.generate().then((file) => ({name: g.name, file}))));

      const successZips: ZipSuccess[] = [];
      const failedZips: ZipFailed[] = [];
      const zipFiles: ItemType[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successZips.push({name: result.value.name});
          zipFiles.push(result.value.file);
        } else {
          failedZips.push({name: generators[index].name, error: toError(result.reason)});
        }
      });

      if (onSuccess && successZips.length > 0) {
        onSuccess(successZips);
      }

      if (onFailed && failedZips.length > 0) {
        onFailed(failedZips);
      }

      if (onEnd) {
        onEnd(successZips, failedZips);
      }

      return plainFiles.concat(zipFiles);
    });

    return {options: {}};
  };

export default FilepondZipper;
