# `@textbook/build-info`

[![Node.js CI][actions-badge]][actions-link]
[![NPM release][npm-badge]][npm-link]

Generate build information for tracking deployments.

## Sources

`buildinfo` has numerous sources, each of which is automatically enabled, if appropriate, in the following order:

- **Clock** - includes the build time
- **User** - includes the identity of the user
- **Git** - includes the commit the build was based on and a summary of any changes from it
- **Heroku** - includes the fact that it was built in Heroku and the commit it was based on
- **GitHub Actions** - includes the build number and URL
- **CircleCI** - includes the build number and URL
- **Netlify** - includes the build number and URL

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
    "postbuild": "buildinfo -o path/to/build-info.txt",
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

You can also run it without installation via [NPX]:

```shell
$ npx --package @textbook/build-info buildinfo -o path/to/file.txt
Need to install the following packages:
  @textbook/build-info
Ok to proceed? (y)
```

_(you can suppress the confirmation with the `--yes` flag)_.

#### Arguments

- `-o`/`--output` - the file to write data to

### Stdout

_(New in v0.5)_

If you don't supply the `--output` argument, data will be written to stdout, allowing redirection:

```json5
{
  // ...
  "scripts": {
    // ...
    "build": "<do your build>",
    "postbuild": "buildinfo > path/to/build-info.txt",
    // ...
  }
}
```

### Compatibility

The emitted code targets Node from at least 16.17 or 18.3 (see `engines` field in `package.json`). It is tested on the
three latest even-numbered versions of Node (currently 16, 18 and 20) in Ubuntu (22.04) and Windows (Server 2022).

## Development

Clone the repository, then install the dependencies using `npm install` or `npm ci`.

You can create a new build information source by implementing `Source`, and optionally extend `Cmd` or `Env` to run
terminal commands or access environment variables respectively.

### Scripts

The following scripts are provided to aid development:

- `npm run lint`: Applies linting using [ESLint]

- `npm run test`: Runs tests using [Mocha] (plus [ts-node], [Chai] and [Sinon])

    - `npm run test:coverage`: Runs the tests with coverage using [c8]

- `npm run e2e`: Builds the library with [TypeScript] and runs it, generating `out.txt`

[actions-badge]: https://github.com/textbook/build-info/actions/workflows/push.yml/badge.svg
[actions-link]: https://github.com/textbook/build-info/actions/workflows/push.yml
[c8]: https://www.npmjs.com/package/c8
[chai]: https://www.chaijs.com/
[eslint]: https://eslint.org/
[mocha]: https://mochajs.org/
[npm-badge]: https://img.shields.io/npm/v/@textbook/build-info?logo=npm&color=blue
[npm-link]: https://www.npmjs.com/package/@textbook/build-info
[npx]: https://docs.npmjs.com/cli/v8/commands/npx
[sinon]: https://sinonjs.org/
[ts-node]: https://typestrong.org/ts-node/
[typescript]: https://www.typescriptlang.org/
