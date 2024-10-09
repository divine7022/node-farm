//"fs" is a module : It allows you to read, write, delete, and manage files and directories.
const fs = require("fs");
// "http" module: That gives us a networking capablities. Such that building an http server.
const http = require("http");
//"url" :node module use for routing(implementing different actions for different URLs)
const url = require("url");

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

// so we need to make it Synchronous(blocking code) . actually it does't effect much if we are using a synchronous here cuz it only need to render at the beginning not all the time , so no problem.
//SO MAKING IT THE TOP LEVEL IT ONLY EXECUTE AT THE AT THE INITAL REQUEST.
// The code at the top level only execte once we start the program. In this situation it dosen't matter wheather it is synchronous or asynchronous . it happens only once and only when the code starts. cuz it is very easy to use here.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //When you use JSON.parse(data), you’re converting a JSON string (data) into a JavaScript object. This allows you to work with the data in a structured way within your code

// createServer() will get access to the two variables i,e request and response variable.and we need to send back a responce to the client.
// cost server = : it is a result of createServer()
// THIS CALLBACK FUNCTION(.createServer()) WILL EXECUTE EACH TIME WHEN THERE IS A NEW REQUESET.
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    // this is exception here 👇
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h2>This is the OVERVIEW</h2>"); // .end() is the simplest way of sending the response for the request.
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    // fs.readFile("./dev-data/data.json");
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {

    res.writeHead(200, { "Content-type": "application/json" }); // we need to say to browser that we are sending a json file ].
    //not to read this file when there is a request and simply send back the data that we have in  our top level code.
    res.end(data); // now this data is comming from the top level "data". it has a access to the top level code cuz of the scope chain.
  } else {
    // these "Content-type" and "my-own-header" should always be set before response [res.end()]. we never can send the header after the response.
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    }); // to write the status code for the error if page not found.
    res.end("<h1>Page not found!</h1>");
  }
});

// listen accepts a couple of parameters 1 ) is the port 2) host[ by default it will be having a address of local host i,e '127.0.0.1' if we want to change it we can change it.]
// this is setting up the port and IP address.
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000"); // this will be displayed in the terminal of vs code.
});

////-- COMMENTS----////
//Blocking, Synchronous way->
//--> READ THE CONTENTS FROM THE FILE:
//const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
//synchronous version of the read file which takes two argumets.
// 1) is file path["./txt/input.txt"] and 2) is the character encoding["utf-8" if we are using english] if we did't specify it takes as a buffer.
// calling this function will read the data from the file and return it to us.

//Non-Blocking, Asynchronous way ->
// we use the callback function . 1) parameter is the error(if there were any) and second one is the actual data. but the error will always be the first one.

///http.createServer((req, res) => {
//  res.end("Hello from the server! ");
//});
// "res" -> stands for the response. "req" -> stands for the request.
//response object ["res"] will gives a lot of tools for dealing with the response. THE SIMPLEST ONE IS .end( )

// http header basically a piece of information about the response that we are sending back
//'Content-type' : 'text/html' [one of the standard browser header is the Content-type ]  then now browser is acpecting some html.

////
// to create an api : first we need to read the data from the file(i,e json file) , then parse json into javaScript and then send back result to the client

//fs.readFile("./dev-data/data.json");[ this [.] represent the director where we run the node command in the terminal (i,e PS D:\Microsoft Downlodes\Coding\Nodejs\1-node-farm> ] which is our current working directory.
// the dot is where the script is running .
// [OR]
// [ __dirname is the name where the current file is located ] i,e the index.js in this case.

// not to read this file when there is a request and simply send back the data that we have in  our top level code.
