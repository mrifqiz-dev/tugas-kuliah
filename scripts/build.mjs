import { execFileSync } from 'node:child_process'
import { cp, mkdir, readdir, realpath, rm } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const framework = 'TRPL_PRG_FRAMEWORK_M4_P1_069'
const apps = [
  'my-react-app',
  'bmi-calculator',
  'name-formatter',
  'diskon-konsonan',
  'diskon-palindrom',
]

// npm supplies its CLI path on both Windows and Linux; no shell quoting needed.
function npm(args, cwd) {
  if (!process.env.npm_execpath) {
    throw new Error('Jalankan melalui npm run build atau npm run install:apps.')
  }
  execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd,
    stdio: 'inherit',
  })
}

if (process.argv.includes('--install-only')) {
  for (const app of apps) {
    console.log(`\nInstalling ${app}`)
    npm(['ci', '--include=dev', '--no-audit', '--no-fund'], join(root, framework, app))
  }
} else {
  // Build first: a failed application must fail the deployment.
  for (const app of apps) {
    console.log(`\nBuilding ${app}`)
    npm(['run', 'build'], join(root, framework, app))
  }

  const output = resolve(root, 'dist')
  const rootPath = await realpath(root)
  const outputPath = await realpath(output).catch((error) => {
    if (error.code !== 'ENOENT') throw error
    return output
  })
  if (dirname(outputPath) !== rootPath || basename(outputPath) !== 'dist') {
    throw new Error(`Refusing to clean output outside repository: ${outputPath}`)
  }
  await rm(output, { recursive: true, force: true })
  await mkdir(join(output, framework), { recursive: true })

  // Preserve existing HTML assignments and their assets at their original URLs.
  const staticEntries = [
    'index.html',
    'API_069',
    'Kuis-069',
    'Kuis_069',
    'Kuis_069.zip',
    'ModifikasiBOOTSTRAP-069',
    'W1-Pratikum01_069',
    'W2-Pratikum01_069',
    'W2-Pratikum02_069',
    'W2-Pratikum03_069',
    'W2-Pratikum04_069',
  ]
  for (const entry of staticEntries) {
    await cp(join(root, entry), join(output, entry), {
      recursive: true,
      filter: (source) => !basename(source).startsWith('.') && basename(source) !== 'node_modules',
    })
  }
  await cp(join(root, framework, 'index.html'), join(output, framework, 'index.html'))
  for (const app of apps) {
    const source = join(root, framework, app, 'dist')
    const entries = await readdir(source)
    if (!entries.includes('index.html') || !entries.includes('assets')) {
      throw new Error(`Incomplete build: ${app}`)
    }
    await cp(source, join(output, framework, app, 'dist'), { recursive: true })
  }
  console.log('\nDeployment output ready: dist/')
}
