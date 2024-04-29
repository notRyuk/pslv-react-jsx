import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { readdir as readDir } from 'node:fs/promises'
import restart from 'vite-plugin-restart'


// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const alias = {}
  alias["@"] = resolve(__dirname, "./src")
  const data = (await readDir("./src", { withFileTypes: true }))
  for (const dir of data) {
    const name = (dir.isDirectory()) ? dir.name : dir.name.split(".").slice(0, -1).join(".")
    alias[`@${name}`] = resolve(__dirname, `./src/${dir.name}`)
  }
  if (command === "serve") {
    return {
      plugins: [react(), restart({ restart: "src" })],
      resolve: {
        alias
      }
    }
  }
  return {
    plugins: [react()],
    resolve: {
      alias
    }
  }
})

