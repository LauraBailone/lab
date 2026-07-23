$baseDir = "c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN"
$targetDir = "$baseDir\site\assets\images"
$ffmpegPath = "C:\ffmpeg\bin\ffmpeg.exe"

$ffmpegCommand = "ffmpeg"
if (Test-Path $ffmpegPath) {
    $ffmpegCommand = $ffmpegPath
}

$imageExtensions = @('.jpg', '.jpeg', '.png')
$seoKeywords = @("consultoria-gastronomica", "asesoramiento-restaurantes", "rentabilidad-gastronomica", "laura-bailone", "metodo-lab", "hospitalidad-consciente", "optimizacion-menu")

$dirs = Get-ChildItem -Path $baseDir -Directory
$sourceDir = $null
foreach ($d in $dirs) {
    if ($d.Name -like "*FOTO*") {
        $sourceDir = $d.FullName
        break
    }
}

if ($null -eq $sourceDir) {
    Write-Host "Source directory not found!"
    exit
}

$files = Get-ChildItem -Path $sourceDir -Recurse -File | Where-Object { $imageExtensions -contains $_.Extension.ToLower() }
$counter = 1

foreach ($file in $files) {
    $keyword = $seoKeywords[$counter % $seoKeywords.Count]
    $newName = "laura-bailone-$keyword-$counter.webp"
    $targetPath = Join-Path -Path $targetDir -ChildPath $newName
    
    $title = "Laura Bailone - Consultoría Gastronómica"
    $author = "Laura Bailone"
    
    # We will use Start-Process to avoid quote parsing issues
    $argumentList = "-y -i `"$($file.FullName)`" -c:v libwebp -quality 85 -metadata title=`"$title`" -metadata author=`"$author`" `"$targetPath`""
    
    Write-Host "Converting: $($file.Name) -> $newName"
    Start-Process -FilePath $ffmpegCommand -ArgumentList $argumentList -Wait -NoNewWindow
    
    $counter++
}

Write-Host "Conversion completed."
