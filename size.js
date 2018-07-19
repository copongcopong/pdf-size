const pdfjs = require('pdfjs-dist');
var args = process.argv.slice(2);
class PageSize {
  constructor(width, height) {
    this.width = width * (1/72);
    this.height = height  * (1/72);
  }
}
function getPageSize (page) {
    const [x, y, w, h] = page.pageInfo.view;
    const width = w - x;
    const height = h - y;
    const rotate = page.pageInfo.rotate;
    // Consider rotation
    return (rotate === 90 || rotate === 270)
        ? new PageSize(height, width) : new PageSize(width, height);
}
async function readPDFPageSizes() {
  const pdf = await pdfjs.getDocument(args[0]);
  const numPages = pdf.numPages;
  var pageNumbers = [];
  for(i=1; i <= numPages; i++) {
    pageNumbers.push(i);
  }
  // Start reading all pages 1...numPages
  const promises = pageNumbers.map(pageNo => pdf.getPage(pageNo));
  // Wait until all pages have been read
  const pages = await Promise.all(promises);
  // You can do something with pages here.
  return pages.map(getPageSize);
}
readPDFPageSizes()
    .then(pageSizes => {
      var obj = {file: args[0], unit: "inches", pages: pageSizes};
      console.log(JSON.stringify(obj))
    })
    .catch(err => {console.log(JSON.stringify({error: `Error while reading PDF: ${err}`}))})