import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, readdir, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const output = fileURLToPath(new URL('../dist/', import.meta.url))
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json',
}
await stat(join(output, 'index.html')) // Run npm run build first.

// Serve only the deployment artifact. Missing files really return 404 (no SPA fallback).
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost')
    let path = resolve(output, `.${decodeURIComponent(url.pathname)}`)
    if (path !== resolve(output) && !path.startsWith(`${resolve(output)}${sep}`)) {
      response.writeHead(403).end()
      return
    }
    if ((await stat(path)).isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end()
        return
      }
      path = join(path, 'index.html')
    }
    const body = await readFile(path)
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' })
    response.end(body)
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end()
  }
})
const preview = process.argv.includes('--serve')
await new Promise((ready, reject) => {
  server.once('error', reject)
  server.listen(preview ? 4173 : 0, '127.0.0.1', ready)
})
const origin = `http://127.0.0.1:${server.address().port}`

if (preview) {
  console.log(`Preview deployment: ${origin}/index.html (Ctrl+C to stop)`)
} else {
  const checked = new Set()
  async function check(reference, parent = `${origin}/`) {
    const url = new URL(reference, parent)
    if (url.origin !== origin || reference.startsWith('#')) return ''
    url.hash = ''
    const response = await fetch(url)
    assert.equal(response.status, 200, `${url.pathname}: HTTP ${response.status}`)
    const extension = extname(url.pathname)
    if (types[extension]) {
      assert.ok(response.headers.get('content-type')?.startsWith(types[extension]),
        `${url.pathname}: incorrect content type`)
    }
    const body = await response.text()
    if (checked.has(url.href)) return body
    checked.add(url.href)
    if (extension === '.html') {
      assert.ok(!/\/src\/.*\.jsx/.test(body), `${url.pathname}: unbuilt JSX reference`)
      for (const match of body.matchAll(/<(?:script|link|img)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)) {
        await check(match[1], url)
      }
    } else if (extension === '.css') {
      for (const match of body.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) {
        await check(match[1], url)
      }
    }
    return body
  }
  function links(html) {
    return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((match) => match[1])
  }
  async function checkFiles(directory, urlPath) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = `${urlPath}/${entry.name}`
      if (entry.isDirectory()) await checkFiles(join(directory, entry.name), path)
      else await check(path)
    }
  }
  try {
    const main = await check('/index.html')
    console.log('PASS /index.html')
    const frameworkPath = '/TRPL_PRG_FRAMEWORK_M4_P1_069/index.html'
    assert.ok(links(main).includes(frameworkPath.slice(1)), 'Missing Framework navigation')
    for (const link of links(main)) {
      await check(link)
      console.log(`PASS /${link}`)
    }
    const framework = await check(frameworkPath)
    const appLinks = links(framework)
    assert.equal(appLinks.length, 5, 'Expected five React application links')
    for (const link of appLinks) {
      const url = new URL(link, origin + frameworkPath)
      const html = await check(url.href)
      assert.match(html, /type="module"[^>]*src="\.\/assets\/[^" ]+\.js"/)
      assert.match(html, /href="\.\/assets\/[^" ]+\.css"/)
      const directory = url.pathname.slice(0, url.pathname.lastIndexOf('/'))
      await checkFiles(join(output, directory), directory)
      console.log(`PASS ${url.pathname} + built assets`)
    }
    const missing = await fetch(`${origin}/missing-asset.js`)
    assert.equal(missing.status, 404, 'Missing assets must not return index.html')
    console.log(`PASS ${checked.size} local pages/assets over HTTP`)
  } finally {
    server.closeAllConnections()
    await new Promise((done) => server.close(done))
  }
}
