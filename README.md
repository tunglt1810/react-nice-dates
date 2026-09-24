# React Nice Dates

A responsive, touch-friendly, and modular date picker library for React.

Documentation and examples at [reactnicedates.hernansartorio.com](https://reactnicedates.hernansartorio.com).

## Installation

```sh
bun add @tunglt91/react-nice-dates date-fns
```

## Releasing

Publishing to npm is automated via GitHub Actions. Bump the version and push the tag:

```sh
npm version patch --no-git-tag-version   # or minor / major
git commit -am "vX.Y.Z" && git tag vX.Y.Z && git push --follow-tags
```

The `Publish to npm` workflow requires an `NPM_TOKEN` repository secret.
