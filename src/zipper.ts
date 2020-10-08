import { Filter, PluginOptions, ZipperCallback } from "./types";
import {generateZip} from "./utils";

const Zipper = (callback?: ZipperCallback) => ({
  addFilter,
}: PluginOptions): Filter => {
  addFilter("FILTER_DROPPED_ITEMS", async (items) => {
    const make = () => generateZip(items);

    const zipFiles = callback
      ? callback(make())
      : await make();

    return items.filter((item) => !item._relativePath).concat(zipFiles || []);
  });

  return { options: {} };
};

export default Zipper;
