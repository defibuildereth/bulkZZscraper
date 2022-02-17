const puppeteer = require('puppeteer');
var fs = require('fs');

const site = 'http://localhost:3000/';
const addresses = [
    '0xf270cb0fe88fbbcafaf66a17640de711ee376d3d',
    '0x88d23a44d07f86b2342b4b06bd88b1ea313b6976'
];

let extractedText;
let grandTotal = 0;


(async () => {
    let now = Date.now()

    var dir = `./${now}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    for (let i = 0; i < addresses.length; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(site);


        await page.type('#add', addresses[i]);
        await page.click('#searchsubmit');
        await page.waitForSelector('#myID');

        extractedText = await page.$eval('*', (el) => el.innerText)
        // console.log(extractedText)
        // console.log(extractedText.length)

        let total = extractedText.split('\n').pop()
        let parsedNum = total.substring(1)
        grandTotal += Number(parsedNum)


        let data2 = extractedText

        fs.writeFileSync(`./${dir}/${addresses[i]}.txt`, data2);
        await browser.close();


    }

    const filesArray = fs.readdirSync(`./${dir}`);
    let tokensArray = []
    for (let i = 0; i < filesArray.length; i++) {
        const file = fs.readFileSync(`./${dir}/${filesArray[i]}`, "utf8")
        let regex = /([A-Z]{2,})+/g

        const match = file.matchAll(regex)
        for (item of match) {
            if (!(item[0] in tokensArray)) {
                tokensArray.push(item[0])
            }
        }
    }
    console.log(tokensArray)
    // let timeNow = Date.now()
    // fs.writeFileSync(`./totalHistory/${timeNow}`, grandTotal.toString())



})();