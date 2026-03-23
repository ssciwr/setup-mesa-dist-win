# setup-mesa-dist-win

A GitHub Action to install Mesa3D from
[pal1000/mesa-dist-win](https://github.com/pal1000/mesa-dist-win)
on windows runners.

## Example usage

```yaml
  - uses: ssciwr/setup-mesa-dist-win@v3
```

Optionally specify the release version, build type or deployment choice:

```yaml
  - uses: ssciwr/setup-mesa-dist-win@v3
    with:
      version: '26.0.3'
      build-type: 'release-msvc'
      deployment-choice: '1'
```

## Development

To make a new release:

- update the version number in [package.json](package.json#L3)
- run `pnpm install` to install the dependencies and update `pnpm-lock.yaml`
- run `pnpm run package` to generate the bundled package in `dist`
- commit the changes including the `dist` folder and `pnpm-lock.yaml`, then push
- tag the commit with the full version number, e.g.
  - `git tag v3.0.0`
  - `git push origin v3.0.0`
- move the major version tag, e.g. in this case `v3`, to this commit
  - `git tag -f v3`
  - `git push origin v3 -f`
