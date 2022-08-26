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
    const folder_7z = await tc.downloadTool(url);
    await exec.exec('cmd.exe', ['dir', folder_7z]);
    const file_7z = `${folder_7z}\\${filename}`
    console.log(`Downloaded to ${file_7z}`);
    console.log(`Extracting $file_7z} ...`);
    const path_cmd = await tc.extract7z(path_7z);
    console.log(`Extracted to ${path_cmd}...`);
    await exec.exec('cmd.exe', ['pwd']);
    await exec.exec('cmd.exe', ['dir']);
    console.log(`Running systemwidedeploy.cmd 1...`);
    await exec.exec('cmd.exe', ['systemwidedeploy.cmd', '1']);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();