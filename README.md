# setup-mesa-dist-win

A GitHub Action to install Mesa3D from [pal1000/mesa-dist-win](https://github.com/pal1000/mesa-dist-win) on windows runners.

## Example usage

```
uses: lkeegan/setup-mesa-dist-win@v1
```

Optionally specify the release version, build type or deployment choice:

```
uses: lkeegan/setup-mesa-dist-win@v1
with:
  version: '22.1.7'
  build-type: 'release-msvc'
  deployment-choice: '1'
```

## Development

To make a new release:

- update the version number in [package.json](package.json#L3)
- run `npm ci` to install the dependencies
- run `npm run package` to generate the bundled package in `dist`
- commit the changes including the `dist` folder and push
- tag the commit with the full version number, e.g.
  - `git tag v1.0.7`
  - `git push origin v1.0.7`
- move the `v1` tag to this commit
  - `git tag -f v1`
  - `git push origin v1 -f`