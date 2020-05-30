const http = require("http")
const server = http.createServer((req, res) => {
    console.log("request received!")
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(
`<html maaa=a >
<head>
    <style>
.container{
    display:flex;
    width:500px;
}
.container #myid{
    width:100px;
    background-color: rgb(255,0,0);
}
.container p{
    flex:1;
    background-color: rgb(0,255,0);
}
    </style>
</head>
<body>
    <div class="container">
        <div id="myid"/>
        <p></p>
    </div>
</body>
</html>
    `);
  });
  // `<html maaa=a ><head> <style>ody div #myid{width:100px;background-color: #ff5000;}body div img{width:30px;background-color: #ff1111;}</style></head><body><div><img id="myid"/><img /></div></body></html>`);

  server.listen(8089)