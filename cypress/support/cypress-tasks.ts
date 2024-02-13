import { unlinkSync, readdirSync, existsSync, rmdirSync } from "fs";
import xlsx from "node-xlsx";
import { join, resolve } from "path";
interface options {
  downloadsFolder: string;
  fileName: string;
  softMatch?: boolean;
}

const tasks = {
  parseExcelToJSON({ downloadsFolder, fileName }: options) {
    const relPath = join(downloadsFolder, fileName);
    const filePath = resolve(relPath);
    return xlsx.parse(filePath, { header: 1 });
  },
  removeDownloadedFile({ downloadsFolder, fileName }): boolean {
    const relPath = join(downloadsFolder, fileName);
    const filePath = resolve(relPath);
    unlinkSync(filePath);
    return true;
  },
  downloads(downloadsPath: string): string[] {
    return readdirSync(downloadsPath);
  },
  findFile({ downloadsFolder, fileName, softMatch }: options) {
    if (!existsSync(downloadsFolder)) {
      return false;
    }
    if (!softMatch) {
      return existsSync(join(downloadsFolder, fileName));
    } else {
      const files: string[] = readdirSync(downloadsFolder).filter(
        (file) => file.includes(fileName) && !file.endsWith(".crdownload")
      );

      if (files.length === 0) {
        return false;
      } else {
        return existsSync(join(downloadsFolder, files[0]));
      }
    }
  },
  deleteDownloads(downloadsFolder: string) {
    if (existsSync(downloadsFolder))
      rmdirSync(downloadsFolder, { maxRetries: 10, recursive: true });
    return null;
  },
  getFirstDownloadedFileName(downloadsFolder: string) {
    const files = readdirSync(downloadsFolder);
    if (!files) {
      return null;
    } else if (files.length === 0) {
      return null;
    } else {
      return files[0];
    }
  },
};
export default tasks;
