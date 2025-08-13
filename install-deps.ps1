Write-Host "Installing Sharp dependency for image optimization..." -ForegroundColor Green
pnpm add sharp

Write-Host ""
Write-Host "Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: pnpm run optimize-images" -ForegroundColor Cyan
Write-Host "2. This will convert your PNG images to WebP format" -ForegroundColor Cyan
Write-Host "3. Your images will be automatically optimized" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
