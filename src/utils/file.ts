import { readdir as readDir, mkdir, writeFile } from "node:fs/promises";
import { join as joinPath } from "node:path"

export const downloadFile = async (filename: string, root: string, content: Buffer): Promise<string|null> => {
    const baseDir = joinPath(__dirname, "..", "..", "public")
    if(root.length) {
        if(!(await readDir(baseDir)).includes(root)) {
            await mkdir(joinPath(__dirname, "..", "..", "public", root))
        }
    }
    try {
        await writeFile(joinPath(baseDir, root, filename), content)
        return joinPath(baseDir, root, filename).replace(baseDir, "/static/files").replace(/\\/g, "/")
    }
    catch(e) {
        console.warn(e)
        return null
    }
}