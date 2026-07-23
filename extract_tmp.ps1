$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open("c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN\NOTEBOOK\PaginaWebASESORIAS.docx")
    $doc.Content.Text | Out-File -FilePath "c:\Users\Demian\Documents\CLIENTES\LAURA BAILONE\WEB DESIGN\NOTEBOOK\PaginaWebASESORIAS.txt" -Encoding utf8
    $doc.Close()
} finally {
    $word.Quit()
}
