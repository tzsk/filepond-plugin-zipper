# :gift: Filepond Plugin Zipper
![Filepond Plugin Zipper](./assets/zipper.png)

![Build](https://img.shields.io/github/actions/workflow/status/tzsk/filepond-plugin-zipper/test.yml?branch=master&logo=github&style=for-the-badge)
![Coveralls](https://img.shields.io/coveralls/github/tzsk/filepond-plugin-zipper/master?logo=coveralls&style=for-the-badge)
[![npm](https://img.shields.io/npm/v/filepond-plugin-zipper?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/filepond-plugin-zipper)
[![npm](https://img.shields.io/npm/dt/filepond-plugin-zipper?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/filepond-plugin-zipper)

An extension plugin for the [FilePond](https://pqina.nl/filepond/) file uploader that allows you to upload entire directories as single ZIP files, rather than uploading each file individually.

## :package: Installation

```bash
// NPM:
$ npm install --save filepond-plugin-zipper

// Yarn:
$ yarn add filepond-plugin-zipper
```
### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
<!-- And... -->
<script src="https://cdn.jsdelivr.net/npm/filepond-plugin-zipper/dist/zipper.min.js"></script>
```

> `JSZip` dependency is required while using via CDN.

## :fire: Usage

The implementation may vary depending on the framework you are using. Please refer to the official [FilePond documentation](https://pqina.nl/filepond/docs/getting-started/installation/) for detailed instructions on registering plugins across different frameworks.

```js
import FilepondZipper from 'filepond-plugin-zipper';

FilePond.registerPlugin(FilepondZipper());
```

### :star: Hook Support

Depending on the directory size, the zipping process may take some time. You may want to display a loading indicator during this process, especially when using reactive frameworks.

To accommodate this, you can pass an options object containing lifecycle hooks to `FilepondZipper()`. This enables you to listen to specific events (when the zipping process starts, succeeds, fails, or ends) while the plugin automatically handles adding the resulting ZIP files to FilePond.

**Example:**
```js
const pond = FilePond.create(...);

FilePond.registerPlugin(FilepondZipper({
  onStart: (directories) => {
    // Fired when zipping process begins
    // e.g. [{ name: "folder1.zip" }]
    console.log("Zipping started for:", directories);
    // Set loading...
  },
  onSuccess: (successes) => {
    // Fired when all zips are successfully generated
    console.log("Zipping succeeded for:", successes);
  },
  onError: (failures) => {
    // Fired if any zip fails
    console.error("Zipping failed for:", failures);
  },
  onEnd: (successes, failures) => {
    // Fired when the entire zipping process ends (success or failure)
    console.log("Zipping process completed.");
    // Stop loading...
  }
}));
```

## :microscope: Testing

After cloning the repository, install all npm dependencies by running: `npm install`.

Then, run the tests:

```bash
$ npm run test
```

## :date: Change log

This repository follows semantic versioning. Please refer to the [Releases](https://github.com/tzsk/filepond-plugin-zipper/releases) page to see what has changed in each version.

## :heart: Contributing

We welcome contributions! Please feel free to submit ideas, bug reports, and pull requests.

## :crown: Credits

- [Kazi Mainuddin Ahmed][link-author]
- [All Contributors][link-contributors]

## :policeman: License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/tzsk
[link-contributors]: ../../contributors
