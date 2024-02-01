const api = require("../sql");
const fs = require("fs");
const pdfjsLib = require("pdfjs-dist");

async function GetTextFromPDF(path) {
    let doc = await pdfjsLib.getDocument(path).promise;
    let page1 = await doc.getPage(1);
    let content = await page1.getTextContent();
    let strings = content.items.map(function(item) {
        return item.str;
    });
    return strings;
}
exports.getPDF = async (req, res) => {
  try {
    // Read PDF file
    const pdfFilePath = "pdf.pdf";
    GetTextFromPDF(pdfFilePath).then((data => console.log(data)))
  } catch (error) {
    console.error("Error:", error);
  }
};
