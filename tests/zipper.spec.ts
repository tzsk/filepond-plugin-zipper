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

  test('toError should cast properly', async () => {
    const { toError } = await import('../src/utils');

    const err = new Error('Test error');
    expect(toError(err)).toStrictEqual(err);

    expect(toError('String error')).toStrictEqual(new Error('String error'));

    expect(toError({ some: 'object' })).toStrictEqual(
      new Error('[object Object]'),
    );
  });

  test('should invoke onFailed when JSZip fails', async () => {
    const filters = [];
    const addFilter = (_key, callback) => {
      filters.push(callback);
    };

    // Create an item that will cause jszip to throw
    const brokenItem = new Item(['broken'], 'broken.jpg', {
      type: 'text/plain',
    });
    brokenItem._relativePath = '/broken_folder/broken.jpg';

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

    // Note: We are intercepting the real JSZip prototype to force an error
    // because `vi.doMock` doesn't work easily with the dynamically imported filepond plugin.
    const JSZip = (await import('jszip')).default;
    const generateAsyncOriginal = JSZip.prototype.generateAsync;
    JSZip.prototype.generateAsync = vi
      .fn()
      .mockRejectedValue(new Error('Zip failure test'));

    const _options = FilepondZipper(pluginOptions)({ addFilter });

    const files = await filters[0]([brokenItem]);

    expect(files).toHaveLength(0);
    expect(onFailed).toHaveBeenCalledTimes(1);
    expect(onFailed).toHaveBeenCalledWith([
      { name: 'broken_folder.zip', error: new Error('Zip failure test') },
    ]);

    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledWith(
      [],
      [{ name: 'broken_folder.zip', error: new Error('Zip failure test') }],
    );

    // Restore original prototype
    JSZip.prototype.generateAsync = generateAsyncOriginal;
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
