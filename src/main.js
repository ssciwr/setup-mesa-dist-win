import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import path from 'node:path'

export async function run() {
  if (process.platform !== 'win32') {
    core.info('This action is only available for windows.')
    return
  }

  try {
    const version = core.getInput('version')
    const buildType = core.getInput('build-type')
    const deploymentChoice = core.getInput('deployment-choice')

    const repo = 'https://github.com/pal1000/mesa-dist-win'
    const filename = `mesa3d-${version}-${buildType}`
    const url = `${repo}/releases/download/${version}/${filename}.7z`
    const tmpDir = path.win32.join(process.env.RUNNER_TEMP, 'setup-mesa-dist-win')
    const initialCwd = process.cwd()

    core.startGroup(`Downloading ${filename}`)
    core.info(`Creating temporary folder ${tmpDir}`)
    await io.mkdirP(tmpDir)
    core.info(`Changing working directory to ${tmpDir}`)
    process.chdir(tmpDir)
    core.info(`Downloading ${url}`)
    const archivePath = await tc.downloadTool(url, 'mesa.7z')
    core.info(`Downloaded to ${archivePath}`)
    await exec.exec('powershell.exe', ['ls'])
    core.endGroup()

    core.startGroup('Extracting')
    await exec.exec('7z.exe', ['x', archivePath])
    await exec.exec('powershell.exe', ['ls'])
    core.endGroup()

    core.startGroup('Installing')
    await exec.exec('powershell.exe', ['.\\systemwidedeploy.cmd', deploymentChoice])
    core.endGroup()

    core.startGroup('Cleaning up')
    core.info(`Resetting working directory to ${initialCwd}`)
    process.chdir(initialCwd)
    core.info(`Removing temporary folder ${tmpDir}`)
    await io.rmRF(tmpDir)
    core.endGroup()
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
      return
    }

    core.setFailed(String(error))
  }
}
