'use strict'
var express = require("express");
var app = express();
var port = 8080;
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("view engine", "ejs");
app.set("views",__dirname+"/views");
app.use("/public",express.static("public"));

app.get("/", function(req,res){
  res.render("pages/index.ejs",{
    title: "Simple Chat with Socket.io"
  });
});

io.on("connection",function(socket){
  socket.emit("welcome",{
    date: new Date()
  });
  socket.on("message", function(message){
    console.log("Triggers");
    socket.broadcast.emit("newMessage",message);
  });
  /*socket.on("login",function(user){
  console.log(user.name+"has logged on the Chat");
  });*/
});
server.listen(port);
console.log("express-Server Listening on Port: " + port);
