import fs from 'node:fs'

import archiver from 'archiver'
import { name, version } from '../package.json'

const fileName = `${name}-${version}.zip`

const output = fs.createWriteStream(`./${fileName}`)
const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`zip 壓縮完成 : `, fileName)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory('./dist', false)
archive.finalize()
