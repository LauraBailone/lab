$word = New-Object -ComObject Word.Application
$word.Visible = $false

$notebookDir = "c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN\NOTEBOOK"
$files = Get-ChildItem $notebookDir -Filter "*.docx" | Where-Object { $_.Name -like "*LAB*" -and $_.Name -notlike "*CANVAS*" }

foreach ($file in $files) {
    Write-Output "===== $($file.Name) ====="
    $doc = $word.Documents.Open($file.FullName)
    Write-Output $doc.Content.Text
    $doc.Close()
    Write-Output ""
}

$word.Quit()
