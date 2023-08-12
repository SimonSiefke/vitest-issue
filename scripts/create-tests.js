import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const root = join(__dirname, "..");

const getContent = (i) => {
  return `import { assert, expect, test } from 'vitest'

test('abc', () => {
  const end = Date.now()+500
  while(Date.now()<end){}
})
`;
};

const createFile = async (i) => {
  const fileName = join(root, "test", `${i}.test.ts`);
  await mkdir(dirname(fileName), { recursive: true });
  const content = getContent(i);
  await writeFile(fileName, content);
};

const createFiles = async (max) => {
  for (let i = 0; i < max; i++) {
    await createFile(i);
  }
};

const clean = async () => {
  await rm(join(root, "test"), { recursive: true, force: true });
};

const main = async () => {
  await clean();
  await createFiles(3_000);
};

main();
