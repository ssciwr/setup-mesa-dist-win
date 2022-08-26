const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

async function run() {
  try {
    const repo = "https://github.com/pal1000/mesa-dist-win"
    const version = core.getInput('version');
    const build = core.getInput('build');
    const url = `${repo}/releases/download/${version}/mesa3d-${version}-${build}.7z`
    console.log(`Downloading ${url}...`);
    const path_7z = await tc.downloadTool('https://nodejs.org/dist/v12.7.0/node-v12.7.0-win-x64.7z');
    console.log(`Extracting ${path_7z}...`);
    const path_cmd = await tc.extract7z(path_7z);
    console.log(`${path_cmd}...`);
    await exec.exec('pwd');
    await exec.exec('dir');
    console.log(`Running systemwidedeploy.cmd 1...`);
    await exec.exec('systemwidedeploy.cmd 1');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();