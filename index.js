const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');
const io = require('@actions/io');

async function run() {
  if (process.platform === 'win32'){
    core.info(`This action is only available for windows.`);
  } else {
    try {
      const originalCwd = process.cwd()

      const version = core.getInput('version');
      const build_type = core.getInput('build-type');
      const deployment_choice = core.getInput('deployment-choice')

      const repo = "https://github.com/pal1000/mesa-dist-win"
      const filename = `mesa3d-${version}-${build_type}`
      const url = `${repo}/releases/download/${version}/${filename}.7z`
      const tmp_dir = `${process.env.RUNNER_TEMP}\\setup-mesa-dist-win`

      core.startGroup(`Downloading ${filename}`)
      core.info(`Creating temporary folder ${tmp_dir}`);
      await io.mkdirP(tmp_dir);
      process.chdir(tmp_dir)
      core.info(`Downloading ${url}`);
      const path_7z = await tc.downloadTool(url, `mesa.7z`);
      core.info(`Downloaded to ${path_7z}`);
      await exec.exec('powershell.exe', ['ls']);
      core.endGroup()

      core.startGroup('Extracting')
      await exec.exec('7z.exe', ['x', path_7z]);
      await exec.exec('powershell.exe', ['ls']);
      core.endGroup()

      core.startGroup('Installing')
      await exec.exec('powershell.exe', [`.\\systemwidedeploy.cmd`, deployment_choice]);
      core.endGroup()
    } catch (error) {
      core.setFailed(error.message);
    } finally {
      core.startGroup('Cleaning up')
      process.chdir(originalCwd)
      core.info(`Removing temporary folder ${tmp_dir}`);
      await io.rmRF(tmp_dir);
      core.endGroup()
    }
  }
}

run();