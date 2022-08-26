const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

async function run() {
  try {

    const repo = "https://github.com/pal1000/mesa-dist-win"
    const version = core.getInput('version');
    const build = core.getInput('build');
    const filename = `mesa3d-${version}-${build}.7z`
    const url = `${repo}/releases/download/${version}/${filename}`

    core.startGroup('Downloading')
    core.info(`Downloading ${url} ...`);
    const path_7z = await tc.downloadTool(url, 'mesa.7z');
    core.info(`Downloaded to ${path_7z}`);
    core.endGroup()

    core.startGroup('Extracting')
    core.info(`Extracting ${path_7z} ...`);
    await exec.exec('7z.exe', ['x', path_7z]);
    core.endGroup()

    core.startGroup('Installing')
    core.info(`Running systemwidedeploy.cmd 1 ...`);
    await exec.exec('powershell.exe', ['.\\systemwidedeploy.cmd', '1']);
    core.endGroup()

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();