$word = New-Object -ComObject Word.Application
$word.Visible = $false

$files = @(
    "PRESENTACION GENERAL.docx",
    "MÉTODO LAB-DETALLADO.docx",
    "ASESORIAS.docx",
    "REFERENCIAS.docx"
)

foreach ($file in $files) {
    $path = "c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN\NOTEBOOK\$file"
    Write-Output "===== $file ====="
    $doc = $word.Documents.Open($path)
    Write-Output $doc.Content.Text
    $doc.Close()
    Write-Output ""
}

$word.Quit()
