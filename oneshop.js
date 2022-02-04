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
let arr = [];

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
    let shop = {};
    console.log(`requesting shop no - ${i}`);
    await getdata(list[i])
      .then((html) => {
        const $ = cheerio.load(html);
        const name = $(".search-page-heading-red", html).text().trim();
        const contact = $(".detail-line", html).text().trim().split("\n");
        shop.name = name;
        shop.phone = contact[0].trim();
        shop.email = contact[1].trim();
        $(".overview-box2", html).each(function () {
          ele = $(this).text().trim().split("\n");
          shop[ele[0]] = ele[1];
        });
        console.log(`added ${shop.name} To the list`);
      })
      .catch((e) => console.log(e));
    arr.push(shop);
    fs.writeFileSync('./details.json',JSON.stringify(arr))
  }
  console.log('done');
};
start();
// list.map(async (e)=> {
//   let shop = {};
//   const url = e.url;
//   console.log('Loading' +url)
//   let x = await axios(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const name = $(".search-page-heading-red", html).text().trim();
//     const contact = $(".detail-line", html).text().trim().split("\n");
//     shop.name = name;
//     shop.phone = contact[0].trim();
//     shop.email = contact[1].trim();
//     $(".overview-box2", html).each(function () {
//       ele = $(this).text().trim().split("\n");
//       shop[ele[0]] = ele[1];
//     });
//     return shop;
//   })
//   .catch(e=>console.log(e.message));
//   console.log(x);
//   if(x)
//   arr.push(x)
//   fs.writeFileSync("./details.json", JSON.stringify(arr));
// });
app.listen(80, () => console.log("running"));
