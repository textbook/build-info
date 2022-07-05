# `@textbook/build-info`

Generate build information for tracking deployments.

## Usage

You can install this package using e.g. NPM:

```shell
npm install --save-dev @textbook/build-info
```

and then use it in your scripts in `package.json`:

```json5
{
  // ...
  "scripts": {
    // ...
    "build": "",
    "postbuild": "buildinfo dist/build-info.txt",
    // ...
  }
}
```
