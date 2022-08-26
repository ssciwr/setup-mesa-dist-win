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
    console.log(`Downloading ${url} ...`);
    const path_7z = await tc.downloadTool(url, 'mesa.7z');
    await exec.exec('powershell.exe', ['ls']);
    await exec.exec('powershell.exe', ['ls', path_7z]);
    console.log(`Downloaded to ${path_7z}`);
    console.log(`Extracting ${path_7z} ...`);
    // const path_cmd = await tc.extract7z(path_7z, process.cwd());
    await exec.exec('7z.exe', ['x', path_7z]);
    console.log(`Extracted`);
    await exec.exec('powershell.exe', ['ls']);
    await exec.exec('powershell.exe', ['ls', path_cmd]);
    console.log(`Running systemwidedeploy.cmd 1...`);
    await exec.exec('powershell.exe', ['.\systemwidedeploy.cmd', '1']);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();