var express = require("express");
const puppeteer = require("puppeteer");


var router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* POST users listing. */
router.post("/", function (req, res) {
  var html = req.body.html;

  convertImageToImage(html, res);
});

const convertImageToImage = async (html, res) => {
 
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }); //production linux server
    //const browser = await puppeteer.launch(); //development
    const page = await browser.newPage();
    await page.setViewport({
      width: 600,
      height: 800,
      deviceScaleFactor: 1,
    });
    await page.setContent(html);
    const base64 = await page.screenshot({ encoding: "base64" });
    // console.log("Base 64 is ", base64);
    await browser.close();
    res.send({ base64: base64,message:"success" });
  
};
module.exports = router;
