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

To update this action:

- clone this repo
- modify the files
- run `npm ci` to install the dependencies
- run `npm run package` to generate the bundled package in `dist`
- commit the changes including the `dist` folder
- push to the `v1` branch
