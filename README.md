# setup-mesa-dist-win

A GitHub Action to install Mesa3D from
[pal1000/mesa-dist-win](https://github.com/pal1000/mesa-dist-win)
on windows runners.

## Example usage

```yaml
  - uses: ssciwr/setup-mesa-dist-win@v2
```

Optionally specify the release version, build type or deployment choice:

```yaml
  - uses: ssciwr/setup-mesa-dist-win@v2
    with:
      version: '23.3.3'
      build-type: 'release-msvc'
      deployment-choice: '1'
```

## Development

To make a new release:

- update the version number in [package.json](package.json#L3)
- run `npm install` to install the dependencies and update package-lock.json
- run `npm ci` to do a fresh install
- run `npm run package` to generate the bundled package in `dist`
- commit the changes including the `dist` folder and push
- tag the commit with the full version number, e.g.
  - `git tag v2.0.7`
  - `git push origin v2.0.7`
- move the major version tag, e.g. in this case `v2`, to this commit
  - `git tag -f v2`
  - `git push origin v2 -f`