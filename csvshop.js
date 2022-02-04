// for extracting individual data
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const app = express();
var list = fs.readFileSync("./list.json", "utf-8");
list = JSON.parse(list);
console.log(list.length);
const low = 0;
const up = list.length;
let head = 'Sr,name,phone,email,Industry,Company Type,Sector,Est. No. of Emp.,Est. Total Turnover'

const getdata = (shop) => {
  return new Promise((resolve, reject) => {
    axios
      .get(shop.url)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((e) => {
        return reject(e.message);
      });
  });
};
const start = async () => {
  for (let i = low; i < up; i++) {
      try {
          arr = fs.readFileSync("./details.json", "utf-8");
          arr = JSON.parse(arr);
      } catch (error) {
          arr = []
      }
    let shop = `${i}`;
    console.log(`requesting shop no - ${i}`);
    await getdata(list[i])
      .then((html) => {
        const $ = cheerio.load(html);
        const name = $(".search-page-heading-red", html).text().trim();
        const contact = $(".detail-line", html).text().trim().split("\n");
        shop += ','+name;
        shop += ','+contact[0].trim();
        shop += ','
        shop += contact[1]?contact[1].trim():'';
        $(".overview-box2", html).each(function () {
          ele = $(this).text().trim().split("\n");
          shop+= ',"'+ele[1]+'"';
        });
        console.log(`added ${name} To the list`);
      })
      .catch((e) => console.log(e));
    head += '\n' + shop
    fs.writeFileSync('./details.csv',head)
  }
  console.log('done');
};
start();
app.listen(80, () => console.log("running"));
