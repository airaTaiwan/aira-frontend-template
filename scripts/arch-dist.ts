import fs from 'node:fs'

import archiver from 'archiver'
import { name } from '../package.json'

const fileName = `${name}.zip`

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
