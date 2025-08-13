@echo off
echo Installing Sharp dependency for image optimization...
pnpm add sharp
echo.
echo Dependencies installed successfully!
echo.
echo Next steps:
echo 1. Run: pnpm run optimize-images
echo 2. This will convert your PNG images to WebP format
echo 3. Your images will be automatically optimized
echo.
pause
