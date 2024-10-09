//"fs" is a module : It allows you to read, write, delete, and manage files and directories.
const fs = require('fs');
// "http" module: That gives us a networking capablities. Such that building an http server.
const http = require('http');
//"url" :node module use for routing(implementing different actions for different URLs)
const url = require('url');

// third party module
const slugify = require('slugify'); // is a function used to create slugs(slug is just a last part of a url that contains a unique string that identify the resource that website is displaying)

const replaceTemplate = require('./modules/replaceTemplate'); // [.]  is the current loaction (root folder) of this module

/////////////////////////////////////////
// FILES
/*
///Blocking, Synchronous way -->
// READ THE CONTENTS FROM THE FILE:
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// WRITEING THE CONTENTS TO THE FILE:
const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");

// Non-Blocking, Asynchronous way -->
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  // to learn how to give error message. if this is error all of the below will ignored and will not execute.
  if (err) return console.log("ERROR! 💥");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written 😊");
      });
    });
  });
});

console.log("will read file!");
*/
/////////////////////////////////////////
// SERVER

// we are making this as global and sync cuz we no need to load the data every time when the request for an Overview.
// we can do the Sychronous version(Ex:readFileSync), cuz we are at the top level code which is only executed once right at the beginning , when we load up this applications. we could not do this inside of this createServere() function. cuz the creatServer() function is called each time when there is a request , if we had 1 million request at the same time then we would block the code 1 million time , once per each request.
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// console.log(slugify("Fresh Avacados", { lower: true }));

// we are looping over the data object and then create a new array based on that.
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // const pathName = req.url; // requested url in the browser
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    // the first step is to load the templete-overview. so each time there is a new requset for this route("/overview or "/" the first thing we are going to do is to read the template overview.)
    res.writeHead(200, { 'Content-type': 'text/html' });

    // for each element of the array we will return something and that will then put into the same position in the new "cardsHtml" array
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(' '); //join by an empty string,then this will join all this element into a string. Now cardsHtml is a string. so that we can get the normal html string form not in a string cocantinated form form of the html.

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    // res.end(tempOverview);
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // this dataObj is an array , then we are retrive the element at the position that is comming from the query id.
    // this is the simplest way of retreving an element based on a query string()
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});

///////---- COMMENTS----////  YOU CAN SEE THE OLDER VERSION OF THE PAGE IN THE index(parc).js file.

/// let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); -->
// insterd of this "{%PRODUCTNAME%}" use this /{%PRODUCTNAME%}/g cuz : actually not use the coats instead use regular expression that's cuz there might be a multiple instances of this placeholder(%PRODUCTNAME%) , so the trick is to wrap this in a reqular expression and use the "g" flag on it which means global . then all of this placeholders(%PRODUCTNAME%) will get replaced, not just the first one/occurence.

///url.parse(req.url, true) --> if you log it the console then this contains all the propertites like pathname , query , etc... So if we destructure it then we can get an access to those properties.

/// dataObj[query.id] --> "dataObj" is an "array" then the "query "is an "objcet"(comming from the url.parse(req.url, true)") and id is the property of the query object which contains the id of the clicked item.

/// query string: [ http://127.0.0.1:8000/product?id=0 ] here pro

////console.log(slugify("Fresh Avacados", { lower: true }));
// first parameter is the string(slug) and second parameter is the options to customize the slug
