$baseDir = "c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN"
$targetDir = "$baseDir\site\assets\images"
$ffmpegPath = "C:\ffmpeg\bin\ffmpeg.exe"

$ffmpegCommand = "ffmpeg"
if (Test-Path $ffmpegPath) {
    $ffmpegCommand = $ffmpegPath
}

# Find FOTOGRAFÍAS folder dynamically to avoid encoding issues
$dirs = Get-ChildItem -Path $baseDir -Directory
$sourceDir = $null
foreach ($d in $dirs) {
    if ($d.Name -like "*FOTO*") {
        $sourceDir = Join-Path -Path $d.FullName -ChildPath "LISTADAS"
        break
    }
}

if ($null -eq $sourceDir -or !(Test-Path $sourceDir)) {
    Write-Host "LISTADAS directory not found! Path: $sourceDir"
    exit
}

# Delete old converted webp files
Write-Host "Cleaning old converted images..."
Get-ChildItem -Path $targetDir -Filter "laura-bailone-*.webp" | Remove-Item -Force

# Exact map for clean naming
$mappings = @{
    "laura for web 5.jpg" = "laura-bailone-laura-bio.webp"
    "ChatGPT ASESORANDO.png" = "laura-bailone-asesoramiento-restaurantes.webp"
    "brooke-lark-nTZOILVZuOg-unsplash.jpg" = "laura-bailone-optimizacion-menu.webp"
    "pexels-ahmetkurt-13004958.jpg" = "laura-bailone-rentabilidad-gastronomica.webp"
    "pexels-alesiakozik-6019593.jpg" = "laura-bailone-hospitalidad-consciente.webp"
    "pexels-joao-socola-26036810-6763282.jpg" = "laura-bailone-consultoria-gastronomica.webp"
    "ChatGPT Image 2 jul 2026, 11_33_02.png" = "laura-bailone-metodo-lab.webp"
    "ChatGPT Image 10 jun 2026, 11_08_46.png" = "laura-bailone-blog-1.webp"
    "ChatGPT Image 17 jun 2026, 09_46_37.png" = "laura-bailone-blog-2.webp"
    "ChatGPT Image 18 jun 2026, 09_01_55.png" = "laura-bailone-blog-3.webp"
    "ChatGPT Image 18 jun 2026, 10_02_31.png" = "laura-bailone-blog-4.webp"
    "ChatGPT Image 19 jun 2026, 10_04_41.png" = "laura-bailone-blog-5.webp"
    "ChatGPT Image 24 jun 2026, 09_46_22.png" = "laura-bailone-blog-6.webp"
    "ChatGPT Image 25 jun 2026, 10_16_08.png" = "laura-bailone-blog-7.webp"
    "pexels-reneterp-2977515.jpg" = "laura-bailone-experiencias-gastronomicas.webp"
    "IMG-20190811-WA0022.jpg" = "laura-bailone-stock.webp"
}

$title = "Laura Bailone - Consultoria Gastronomica"
$author = "Laura Bailone"

foreach ($item in $mappings.GetEnumerator()) {
    $srcFile = Join-Path -Path $sourceDir -ChildPath $item.Key
    $targetFile = Join-Path -Path $targetDir -ChildPath $item.Value
    
    if (Test-Path $srcFile) {
        Write-Host "Converting: $($item.Key) -> $($item.Value)"
        $argumentList = "-y -i `"$srcFile`" -c:v libwebp -quality 85 -metadata title=`"$title`" -metadata author=`"$author`" `"$targetFile`""
        Start-Process -FilePath $ffmpegCommand -ArgumentList $argumentList -Wait -NoNewWindow
    } else {
        Write-Host "Warning: Source file not found: $($srcFile)"
    }
}

Write-Host "Conversion completed."
