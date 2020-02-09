var express = require("express");
const puppeteer = require("puppeteer");
var router = express.Router();


/* POST users listing. */
router.post("/", function(req, res) {
  var html = req.body.html;
  
 convertImageToImage(html,res);
});

const convertImageToImage = async (html,res) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({
    width: 600,
    height: 800,
    deviceScaleFactor:1
  });
  await page.setContent(html);
  const base64 =  await page.screenshot({ encoding: "base64" });
 // console.log("Base 64 is ", base64);
  await browser.close();
  res.send( {base64:base64});
};
module.exports = router;
