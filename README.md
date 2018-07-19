$> npm i

to run:

$> node size.js PDF_FILE_PATH.pdf

SAMPLE
---
Success
```
$> node size.js 353-4-standard_file-alyssa_insert.pdf 
{"file":"353-4-standard_file-alyssa_insert.pdf","unit":"inches","pages":[{"width":3.75,"height":2.75},{"width":3.75,"height":2.75}]}
```

Error
```
$> node size.js 353-4-standard_file-alyssa_insertx.pdf 
{"error":"Error while reading PDF: UnknownErrorException: ENOENT: no such file or directory, lstat '353-4-standard_file-alyssa_insertx.pdf'"
```