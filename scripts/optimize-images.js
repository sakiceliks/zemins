const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
    return { success: true, savings };
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function processImages() {
  const files = fs.readdirSync(inputDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  console.log(`🎯 Found ${pngFiles.length} PNG files to optimize`);
  console.log('---');
  
  let totalSavings = 0;
  let successCount = 0;
  
  for (const file of pngFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.png$/i, '.webp'));
    
    const result = await optimizeImage(inputPath, outputPath);
    if (result.success) {
      successCount++;
      totalSavings += parseFloat(result.savings);
    }
  }
  
  console.log('---');
  console.log(`🎉 Optimization complete!`);
  console.log(`✅ Successfully converted: ${successCount}/${pngFiles.length} images`);
  console.log(`💰 Average size reduction: ${(totalSavings / successCount).toFixed(1)}%`);
  
  // Create a mapping file for easy reference
  const mapping = {};
  pngFiles.forEach(file => {
    const webpFile = file.replace(/\.png$/i, '.webp');
    mapping[file] = webpFile;
  });
  
  fs.writeFileSync(
    path.join(__dirname, '../public/images/image-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  
  console.log(`📝 Image mapping saved to public/images/image-mapping.json`);
}

// Run the optimization
processImages().catch(console.error);
