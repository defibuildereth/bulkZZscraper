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
    // let now = Date.now()

    // var dir = `./${now}`;

    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }

    // for (let i = 0; i < addresses.length; i++) {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.goto(site);


    //     await page.type('#add', addresses[i]);
    //     await page.click('#searchsubmit');
    //     await page.waitForSelector('#myID');

    //     extractedText = await page.$eval('*', (el) => el.innerText)
    //     // console.log(extractedText)
    //     // console.log(extractedText.length)

    //     let total = extractedText.split('\n').pop()
    //     let parsedNum = total.substring(1)
    //     grandTotal += Number(parsedNum)


    //     let data2 = extractedText

    //     fs.writeFileSync(`./${dir}/${addresses[i]}.txt`, data2);
    //     await browser.close();


    // }



    // const filesArray = fs.readdirSync(`./${dir}`);
    // let objArray = []

    // for (let i = 0; i < filesArray.length; i++) {
    //     const file = fs.readFileSync(`./${dir}/${filesArray[i]}`, "utf8")

    //     let regex = /([A-Z]{2,})+/g

    //     let splitFile = file.split('\n')

    //     const match = file.matchAll(regex)
    //     for (item of match) {
    //         for (line of splitFile) {
    //             if (line.includes(item[0])) {
    //                 let obj;
    //                 let regex2 = /\d*.\d{2}$/g;
    //                 let value = line.match(regex2)
    //                 obj = { token: item[0], value: Number(value[0]) }
    //                 objArray.push(obj)
    //             }
    //         }

    //     }
    // }

    // console.log(objArray)

    let uniqueArray = []
    // const uniqueArrayMaker = function (objArray, uniqueArray) {
    //     console.log("objectArray length: ", objArray.length)
    //     if (objArray.length === 0) {
    //         return
    //     }
    //     console.log('calling uniqueArrayMaker with: ', objArray, 'and', uniqueArray)
    //     if (!(uniqueArray.length)) {
    //         console.log('unique array empty, moving first item')
    //         uniqueArray.push(objArray[0])
    //         objArray.shift()
    //         uniqueArrayMaker(objArray, uniqueArray)
    //     } else {
    //         for (let i = 0; i < objArray.length; i++) {
    //             for (let j = 0; j < uniqueArray.length; j++) {
    //                 if (objArray[i].token == uniqueArray[j].token) {
    //                     console.log('match found')
    //                     console.log(objArray[i].token, uniqueArray[j].token)
    //                     uniqueArray[j].value += objArray[i].value
    //                     console.log('updated value: ', uniqueArray[j].value)
    //                     // if (objArray.length > 1) {
    //                     //     objArray.splice(i, 1)
    //                     //     uniqueArrayMaker(objArray, uniqueArray)
    //                     // } else {
    //                     //     return
    //                     // }
    //                 }
    //             }
    //             console.log('no match found AT ALL')
    //             console.log(objArray[i].token)
    //             uniqueArray.push(objArray[i])
    //             objArray.shift()
    //             uniqueArrayMaker(objArray, uniqueArray)
    //         }
    //     }
    //     console.log(uniqueArray)
    // }

})();

const uniqueArrayMaker2 = function (objArray, uniqueArray) {
    console.log('calling with :', objArray, 'and', uniqueArray)

    if (!(uniqueArray.length)) {
        console.log('unique array empty, moving first item')
        uniqueArray.push(objArray[0])

        objArray.shift();
        if (objArray.length > 0) {
            console.log('calling, objArray length = ', objArray.length)
            uniqueArrayMaker2(objArray, uniqueArray)
        }

    } else {
        console.log('ObjArray FIRST HERE', objArray.length)

        for (let i = 0; i < uniqueArray.length; i++) {
            if (objArray.length) {
                console.log('ObjArray THEN HERE', objArray.length)
                // console.log(uniqueArray[i].token, objArray[0].token)
                if (uniqueArray[i].token == objArray[0].token) {
                    uniqueArray[i].value += objArray[0].value
                    console.log(`match found with ${uniqueArray[i].token}, updated value ${uniqueArray[i].value}`)

                    // console.log('before', objArray.length)
                    objArray.shift();
                    // console.log('after', objArray.length)

                    if (objArray.length > 0) {
                        console.log('calling, objArray length = ', objArray.length)
                        uniqueArrayMaker2(objArray, uniqueArray)
                    }
                }
            }
            // uniqueArray.push(objArray[0])
        }
        if (objArray.length) {
            console.log(`unique item: ${objArray[0].token}, pushing`)
            uniqueArray.push(objArray[0]);

            objArray.shift();
            if (objArray.length > 0) {
                console.log('calling, objArray length = ', objArray.length)
                uniqueArrayMaker2(objArray, uniqueArray)
            }
        }
    }
    console.log(uniqueArray)

}


uniqueArrayMaker2([{ token: "ETH", value: 1 }, { token: "ETH", value: 1 }, { token: "ETH", value: 1 }, { token: "BTC", value: 1 }, { token: "BTC", value: 2 }, { token: "ETH", value: 3 }], [])





    // let timeNow = Date.now()
    // fs.writeFileSync(`./totalHistory/${timeNow}`, grandTotal.toString())



