url = "https://www.fundoodata.com/citiesindustry/3/0/list-of-chemical-companies-in-delhi-ncr";
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const app = express();

axios(url)
.then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    return $(".search-page-heading>strong").text();
})
.then(async function(no) {
    let pages = Math.ceil(no / 20);
    console.log(`Pages - ${pages} \nTotal ${no} Shops Found`)
    let mainarr = []
    for (let i = 1; i <= 2; i++) {// pages can be changed
        const shops = []
      let x = await axios(`${url}?&pageno=${i}`).then(response => {
          const html = response.data
          const $ = cheerio.load(html)
          $('.heading', html).each(function () { //<-- cannot be a function expression
              const title = $(this).text()
              const url = $(this).find('a').attr('href')
              shops.push({
                  title,
                  url,
              })
          })
         // ----- got all 20 ----------
         console.log('reading page no - '+i)
         console.log('found '+shops.length+' shops')
         return shops
        })
        .catch(err => console.log(err))
        // console.log(x)
        mainarr = [...mainarr, ...x];
        fs.writeFileSync('./list.json',JSON.stringify(mainarr))
    }
    // console.log(mainarr)
    console.log('-------DONE------')
}).catch(e=>console.log(e.response.data))
app.listen(80, () => console.log("running"));
