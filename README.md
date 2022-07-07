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
    "build": "<do your build>",
    "postbuild": "buildinfo path/to/build-info.txt",
    // ...
  }
}
```

This will generate a file like the following:

```
Built: 2022-07-07T20:17:55.213Z
By: jonrsharpe
From: 3f27baa Refactor sources in subdirectory
```

### Compatibility

The emitted code targets Node 14.8 and up (see `engines` field in `package.json`). It is tested on the three latest
versions of Node (currently 14, 16 and 18) in Ubuntu (22.04) and Windows (Server 2022).

## Development

Clone the repository, then install the dependencies using `npm install` or `npm ci`.

You can create a new build information source by implementing `Source`, and optionally extend `Cmd` or `Env` to run
terminal commands or access environment variables respectively.

### Scripts

The following scripts are provided to aid development:

- `npm run lint`: Applies linting using [ESLint]

- `npm run test`: Runs tests using [Node test runner] (plus [ts-node] and [Sinon])

    **Note**: running the tests requires Node 18.

- `npm run e2e`: Builds the library with [TypeScript] and runs it, generating `out.txt`

[eslint]: https://eslint.org/
[node test runner]: https://nodejs.org/api/test.html
[sinon]: https://sinonjs.org/
[ts-node]: https://typestrong.org/ts-node/
[typescript]: https://www.typescriptlang.org/
