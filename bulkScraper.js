const puppeteer = require('puppeteer');
var fs = require('fs');

const site = 'http://localhost:3000/';
const content = [
    '0xf270cb0fe88fbbcafaf66a17640de711ee376d3d',
    '0x88d23a44d07f86b2342b4b06bd88b1ea313b6976'
];

let extractedText;
let grandTotal = 0;


(async () => {
    for (let i = 0; i < content.length; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(site);


        await page.type('#add', content[i]);
        await page.click('#searchsubmit');
        await page.waitForSelector('#myID');

        extractedText = await page.$eval('*', (el) => el.innerText)
        // console.log(extractedText)
        // console.log(extractedText.length)

        let total = extractedText.split('\n').pop()
        let parsedNum = total.substring(1)
        grandTotal += Number(parsedNum)

        let now = Date.now()

        let data2 = extractedText
        fs.writeFileSync(`./accountsHistory/${content[i]}_${now}.txt`, data2);
        await browser.close();


    }
    let timeNow = Date.now()
    fs.writeFileSync(`./totalHistory/${timeNow}`, grandTotal.toString())

})();