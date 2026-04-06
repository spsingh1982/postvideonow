import sharp from "sharp";
import path from "path";

const input = process.argv[2] || "logo-original.png";
const output = "logo-1024.png";

await sharp(input)
  .resize(1024, 1024, {
    fit: "contain",           // keeps aspect ratio, adds padding
    background: { r: 13, g: 13, b: 31, alpha: 1 }, // dark background matching your site
  })
  .png()
  .toFile(output);

console.log(`✅ Done! Saved as: ${output}`);
console.log(`📁 Full path: ${path.resolve(output)}`);
