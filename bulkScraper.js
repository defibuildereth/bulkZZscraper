const puppeteer = require('puppeteer');
var fs = require('fs');

const site = 'http://localhost:3000/';
const addresses = [
    '0xf270cb0fe88fbbcafaf66a17640de711ee376d3d',
    '0x88d23a44d07f86b2342b4b06bd88b1ea313b6976'
];

let arrays = []
let extractedText;
let grandTotal = 0;
let objArray = [];
let uniqueArray = [];
let now = Date.now()
let dir = `./${now}`;

const getInfo = async function () {

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
}

getInfo()
    .then(() => {
        const filesArray = fs.readdirSync(`./${dir}`);
        for (let i = 0; i < filesArray.length; i++) {
            const file = fs.readFileSync(`./${dir}/${filesArray[i]}`, "utf8")
            let regex = /([A-Z]{2,})+/g
            let splitFile = file.split('\n')
            const match = file.matchAll(regex)
            for (item of match) {
                for (line of splitFile) {
                    if (line.includes(item[0])) {
                        let obj;
                        let regex2 = /\d*.\d{2}$/g;
                        let regex3 = /(?<=nce:\s)\d*.\d{2}/g
                        let value = line.match(regex2)
                        let tokenBalance = line.match(regex3)
                        obj = { token: item[0], tokenBalance: Number(tokenBalance[0]), value: Number(value[0]) }
                        objArray.push(obj)
                    }
                }

            }
        }

        const uniqueArrayMaker2 = function (objArray, uniqueArray) {

            if (!(uniqueArray.length)) {
                uniqueArray.push(objArray[0])
                objArray.shift();
                if (objArray.length > 0) {
                    uniqueArrayMaker2(objArray, uniqueArray)
                }
            } else {
                for (let i = 0; i < uniqueArray.length; i++) {
                    if (objArray.length) {
                        if (uniqueArray[i].token == objArray[0].token) {
                            uniqueArray[i].value += objArray[0].value
                            uniqueArray[i].tokenBalance += objArray[0].tokenBalance
                            objArray.shift();
                            if (objArray.length > 0) {
                                uniqueArrayMaker2(objArray, uniqueArray)
                            }
                        }
                    }
                }
                if (objArray.length) {
                    // console.log(`unique item: ${objArray[0].token}, pushing`)
                    uniqueArray.push(objArray[0]);

                    objArray.shift();
                    if (objArray.length > 0) {
                        // console.log('calling, objArray length = ', objArray.length)
                        uniqueArrayMaker2(objArray, uniqueArray)
                    }
                }
            }
            arrays.push(uniqueArray)
        }

        uniqueArrayMaker2(objArray, uniqueArray)
        console.log(arrays[0])
    })