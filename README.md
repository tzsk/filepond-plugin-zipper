# :gift: Filepond Plugin Zipper
![Filepond Plugin Zipper](./assets/zipper.svg)

![Build](https://img.shields.io/github/workflow/status/tzsk/filepond-plugin-zipper/Tests/master?logo=github&style=for-the-badge)
![Coveralls](https://img.shields.io/coveralls/github/tzsk/filepond-plugin-zipper/master?logo=coveralls&style=for-the-badge)
[![npm](https://img.shields.io/npm/v/filepond-plugin-zipper?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/filepond-plugin-zipper)
[![npm](https://img.shields.io/npm/dt/filepond-plugin-zipper?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/filepond-plugin-zipper)

This is an extension plugin for [Filepond](https://pqina.nl/filepond/) uploader where you can upload directories as ZIP Files instead of uploading each individual files in them separately.

## :package: Installation

```bash
// NPM:
$ npm install --save filepond-plugin-zipper

// Yarn:
$ yarn add filepond-plugin-zipper
```
### CDN

```
https://cdn.jsdelivr.net/npm/jszip@3.5.0/dist/jszip.min.js
// And...
https://unpkg.com/filepond-plugin-zipper/dist/zipper.min.js
```

> `JSZip` dependency is required while using via CDN.

## :fire: Usage

This may differ depending upon the Framework you are using, but there is good documentation of how to register plugins in various Frameworks in Filepond website which you can follow.

```js
import FilepondZipper from 'filepond-plugin-zipper';

FilePond.registerPlugin(FilepondZipper());

// Make sure you register it as a function
// cause you can pass in hook to tap into the zip files.
```

### :star: Hook Support

In many cases, specially while using some reactive frameworks you might like to show some loading screen while it is zipping files which might take some time depending upon the directory size.

In those cases you can pass a callback function inside the `FilepondZipper()`. If you pass a callback then it won't add the zip files in the queue directly. Instead, it will give you the Array of Promise objects which you can tap into to show loading and inject the zip files when they are done.

**Example:**
```js
const pond = FilePond.create(...);

const injector = async (generators) => {
  // Set Loading...
  const files = await Promise.all(
    generators.map(generate => generate())
  );
  pond.addFiles(files);
  // Stop loading...

  // OR. If you want to tap individually

  // Set Loading...
  generators.forEach(generate => {
    const file = await generate();
    pond.addFile(file);
  });
  // Stop Loading...
};

Filepond.registerPlugin(FilepondZipper(injector));
```

## :microscope: Testing

After Cloning the repository, install all npm dependencies by running: `npm install`.

Then Run Tests:

```bash
$ npm run test
```

## :date: Change log

This repository follows semantic versioning. Please follow the releases to know about what changed.

## :heart: Contributing

Please feel free to contribute ideas and PRs are most welcome.

## :crown: Credits

- [Kazi Mainuddin Ahmed][link-author]
- [All Contributors][link-contributors]

## :policeman: License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/tzsk
[link-contributors]: ../../contributors
