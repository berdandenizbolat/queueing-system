const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))

let lock = false;
let placeholder = "";
let line =[];
let socket_ids = [];
let socket_id_query = "";

app.get('/', (req, res)=>{
    res.redirect("/login");
})

app.post('/', (req, res, next)=>{
    if (placeholder === req.body.name || line.includes(req.body.name)){
        res.redirect("/login?nameExists=true");
    }
    else if (!lock) {
        lock = true;
        res.sendFile(path.join(__dirname, '/sbir.html'));
        placeholder = req.body.name;
        io.on(("connection"), (socket)=>{
            socket.emit(("informpageholder"), placeholder);
            io.emit(("informline"), line);
            socket_ids.push(socket.id);
            socket.on(("disconnect"), () => {
                if (socket.id === socket_ids[0]) {
                    placeholder = line[0];
                    io.emit(("informpageholder"), placeholder);
                    if (line.length > 1){
                        io.to(`${socket_ids[1]}`).emit("next",socket_ids[1])
                        socket_id_query = socket_ids[1];
                        line = line.slice(1);
                        socket_ids = socket_ids.slice(1);
                    } else if (line.length === 0){
                        lock = false;
                        socket_ids=[];
                        line =[];
                    } else {
                        io.to(`${socket_ids[1]}`).emit("next",socket_ids[1])
                        socket_id_query = socket_ids[1];
                        line = [];
                        socket_ids=[socket_ids[1]];
                    }
                    io.emit(("informnewline"), line);
                }   else {
                    let count = 0;
                    socket_ids.forEach((elem) => {
                        if (elem===socket.id){
                            line = (line.slice(0, count-1)).concat((line.slice(count)))
                            socket_ids = (socket_ids.slice(0, count)).concat((socket_ids.slice(count+1)));
                            return;
                        }
                        count += 1
                    })
                    io.emit(("informnewline"), line);
                }
            })
        })
    }
    else {
        line.push(req.body.name);
        res.sendFile(path.join(__dirname, '/line.html'));
    }
})

app.get('/login', (req, res,next)=>{
   if (req.query["nameExists"]){
       res.sendFile(path.join(__dirname, '/loginFail.html'))
   }
   else {
       res.sendFile(path.join(__dirname, '/login.html'))
   }
})

app.post('/result', (req, res,next)=>{
    if (req.body["pass"]){
        res.sendFile(path.join(__dirname, '/sbir.html'))
    }
    else {
        res.send("A problem occured...")
    }
})


server.listen(PORT, ()=>{
    console.log('Server is listening...');
})
