const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Critical CSS extraction using Puppeteer
async function extractCriticalCSS() {
  try {
    // Install critical if not available
    try {
      execSync('npx critical --version', { stdio: 'ignore' });
    } catch {
      console.log('Installing critical package...');
      execSync('npm install -g critical', { stdio: 'inherit' });
    }

    const inputCSS = path.join(__dirname, '../app/globals.css');
    const outputDir = path.join(__dirname, '../public');
    
    // Extract critical CSS
    const criticalCSS = execSync(
      `npx critical ${inputCSS} --inline --base ${outputDir}`,
      { encoding: 'utf8' }
    );

    // Save critical CSS
    fs.writeFileSync(path.join(outputDir, 'critical.css'), criticalCSS);
    
    // Create non-critical CSS (everything not in critical)
    const fullCSS = fs.readFileSync(inputCSS, 'utf8');
    const nonCriticalCSS = fullCSS.replace(criticalCSS, '');
    fs.writeFileSync(path.join(outputDir, 'non-critical.css'), nonCriticalCSS);

    console.log('✅ Critical CSS extracted successfully!');
    console.log(`📁 Critical CSS: ${path.join(outputDir, 'critical.css')}`);
    console.log(`📁 Non-critical CSS: ${path.join(outputDir, 'non-critical.css')}`);
    
  } catch (error) {
    console.error('❌ Error extracting critical CSS:', error.message);
  }
}

extractCriticalCSS();
