import fs from 'fs'
import { resolve } from 'path'

const basePath = resolve()

const filename: any = {
  messages: resolve(basePath, 'src/data/message.json'),
}

export const readData = (target: any) => {
  try {
    return JSON.parse(fs.readFileSync(filename[target], 'utf-8'))
  } catch (e: any) {
    console.log(e.message)
  }
}

export const writeData = (target: any, data: any) => {
  try {
    return fs.writeFileSync(filename[target], JSON.stringify(data))
  } catch (e: any) {
    console.log(e.message)
  }
}
