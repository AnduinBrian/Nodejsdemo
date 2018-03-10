// khai bao cho sv lang nghe tren port 8000
var express = require("express"); // khai bao express framework
var app = express();
app.use(express.static("style"));
app.set("view engine", "ejs");
app.set("views", "./layout"); // lay layout trong thu muc views
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000) // port

var UserOnline = [];

//khi co nguoi ket noi, hien ben Server
io.on("connection", function(socket){
    console.log("co nguoi ket noi, socket id: " + socket.id);
    //hien thi len sv khi co nguoi dang ki
    socket.on("gui_username", function(data){
    console.log("User: " + data + " da dang ki");
    UserOnline.push(data);
    socket.Username = data;
    io.sockets.emit("dang_ki_thanh_cong", {username:data, id:socket.id});
  });
  socket.on("user_gui_msg", function(data){
    io.sockets.emit("sv_gui_msg", {Username:socket.Username, msg:data});
  });
});

//show trang chu khi co nguoi vo
app.get("/", function(req, res){
   res.render("trangchu")
});
