import { Item, type ItemType } from '../src/types';
import FilepondZipper from '../src/zipper';

const getItems = (count = 1, path = null): ItemType[] => {
  const keys = new Array(count).map((_v, i) => i);
  return [...keys].map((_value, index) => {
    const item = new Item([`${index}`], `${index}.jpg`, { type: 'text/plain' });
    if (path) {
      item._relativePath = `/${path}/${item.name}`;
    }

    return item;
  });
};

describe('Plugin', () => {
  test('should replace folders with zip', async () => {
    const filters = [];
    const addFilter = (_key, callback) => {
      filters.push(callback);
    };

    const options = FilepondZipper()({ addFilter });
    // Execute
    const files = await filters[0]([
      ...getItems(2),
      ...getItems(30, 'pictures/event'),
      ...getItems(60, 'documents'),
      ...getItems(),
    ]);

    expect(options).toStrictEqual({ options: {} });
    expect(files).toHaveLength(5);
  });

  test('should invoke lifecycle hooks when zipping', async () => {
    const filters = [];
    const addFilter = (_key, callback) => {
      filters.push(callback);
    };
    const pictures = getItems(30, 'pictures/event');
    const documents = getItems(60, 'documents');

    const onStart = vi.fn();
    const onSuccess = vi.fn();
    const onFailed = vi.fn();
    const onEnd = vi.fn();

    const pluginOptions = {
      onStart,
      onSuccess,
      onFailed,
      onEnd,
    };

    const options = FilepondZipper(pluginOptions)({ addFilter });
    // Execute
    const files = await filters[0]([
      ...getItems(2),
      ...pictures,
      ...documents,
      ...getItems(),
    ]);

    expect(options).toStrictEqual({ options: {} });
    expect(files).toHaveLength(5);
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledWith([
      { name: 'pictures.zip' },
      { name: 'documents.zip' },
    ]);

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith([
      { name: 'pictures.zip' },
      { name: 'documents.zip' },
    ]);

    expect(onFailed).not.toHaveBeenCalled();

    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledWith(
      [{ name: 'pictures.zip' }, { name: 'documents.zip' }],
      [],
    );
  });

  test('should not invoke hooks if no directories exist', async () => {
    const filters = [];
    const addFilter = (_key, callback) => {
      filters.push(callback);
    };

    const onStart = vi.fn();
    const onSuccess = vi.fn();
    const onEnd = vi.fn();

    const pluginOptions = {
      onStart,
      onSuccess,
      onEnd,
    };

    const options = FilepondZipper(pluginOptions)({ addFilter });
    // Execute
    const files = await filters[0]([...getItems(2)]);

    expect(options).toStrictEqual({ options: {} });
    expect(files).toHaveLength(2);
    expect(onStart).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
  });
});
