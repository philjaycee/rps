let express = require('express')
var bodyParser = require('body-parser');
let app = express()
let port = process.env.port || 9090


const router = require('./router')
app.use(router)

var admin__ = {
    email: "Admin123@gmail.com",
    password: "123"
}

var users = [ ]

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

app.listen(port, ()=>{ console.log("lostening the server")})

app.post('/login',  function (req,res) {

    const {email, password} = req.body
    if (req.body.email == admin__.email && req.body.password == admin__.password) {
        res.render('index_home')
    }
    else if (req.body.email == admin__.email && req.body.password != admin__.password) {
        res.send('Admin Salah Pass')
        res.render('base', {title:"Login System"})
    } else {
    var user = req.body
    users.push(user);
    res.send(users)
    }
});


app.use((req,res) =>{
    res.status(404).render('404') 
});

