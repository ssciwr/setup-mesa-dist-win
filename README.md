# setup-mesa-dist-win

An action to install Mesa3D on windows from https://github.com/pal1000/mesa-dist-win/

## Example usage

```
uses: lkeegan/setup-mesa-dist-win@v1
```

Optionally specify a release version and build type:

```
uses: lkeegan/setup-mesa-dist-win@v1
with:
  version: '22.1.7'
  build-type: 'release-msvc'
```

## Development

To update this action:

- modify files
- run `npm ci`
- run `npm run package`
- commit the changes including the generated `dist` folder
- push to the `v1` branch
