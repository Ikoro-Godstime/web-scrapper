const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapper(url) {
  //start browser
  const browser = await puppeteer.launch({ headless: false });
  //open new page
  const page = await browser.newPage();
  //navigate page
  await page.goto(url);
  //scrap data
  let data = await page.evaluate(() => {
    let paragraphTexts = Array.from(document.querySelectorAll('p'));
    let texts = paragraphTexts.map((text) => text.innerText).join(',');
    //return an object
    return texts;
  });
  console.log(data);
  //create and write in file
  fs.writeFile('igboWords.txt', data, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('file has been created');
    }
  });
  //close browser
  await browser.close();
}

scrapper('https://www.bbc.com/igbo');
