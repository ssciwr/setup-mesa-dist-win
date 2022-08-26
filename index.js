const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

async function run() {
  try {
    if (process.platform === 'win32'){
      const version = core.getInput('version');
      const build_type = core.getInput('build-type');
      const deployment_choice = core.getInput('deployment-choice')

      const repo = "https://github.com/pal1000/mesa-dist-win"
      const filename = `mesa3d-${version}-${build_type}`
      const url = `${repo}/releases/download/${version}/${filename}.7z`

      core.startGroup(`Downloading ${filename}`)
      core.info(`${url} -> mesa.7z`);
      const path_7z = await tc.downloadTool(url, 'mesa.7z');
      core.endGroup()

      core.startGroup('Extracting')
      await exec.exec('7z.exe', ['x', path_7z]);
      core.endGroup()

      core.startGroup('Installing')
      await exec.exec('powershell.exe', ['.\\systemwidedeploy.cmd', deployment_choice]);
      core.endGroup()
    } else {
      core.info(`This action is only available for windows.`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();