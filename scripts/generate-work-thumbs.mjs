import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('public/works');
const outputDir = path.resolve('public/works-thumbs');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const ensureDir = async (dirPath) => {
  await mkdir(dirPath, { recursive: true });
};

const getOutputName = (fileName) => {
  const parsed = path.parse(fileName);
  return `${parsed.name}.jpg`;
};

const shouldProcess = async (sourcePath, outputPath) => {
  try {
    const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return sourceStats.mtimeMs > outputStats.mtimeMs;
  } catch {
    return true;
  }
};

const generateThumbnail = async (fileName) => {
  const sourcePath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, getOutputName(fileName));

  if (!(await shouldProcess(sourcePath, outputPath))) {
    return { fileName, skipped: true };
  }

  await sharp(sourcePath)
    .resize({
      width: 960,
      height: 1200,
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 68,
      mozjpeg: true,
      progressive: true,
    })
    .toFile(outputPath);

  return { fileName, skipped: false };
};

const run = async () => {
  await ensureDir(outputDir);

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);

  const results = await Promise.all(fileNames.map(generateThumbnail));
  const createdCount = results.filter((result) => !result.skipped).length;
  const skippedCount = results.length - createdCount;

  console.log(`Generated ${createdCount} thumbnails, skipped ${skippedCount}.`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
