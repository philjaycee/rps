let express = require('express')
var bodyParser = require('body-parser');
let app = express()
let port = process.env.port || 9090


const router = require('./router')
app.use(router)


var urlencodedParser = bodyParser.urlencoded({ extended: false })

var admin__ = {
    email: "Admin123@gmail.com",
    password: 123
}

var users = [ ]

app.set('view engine', 'ejs');

app.listen(port, ()=>{ console.log("lostening the server")})

app.use(express.static('public'))



app.post('/login', urlencodedParser, function (req,res) {

    const {email, password} = req.body
    if (req.body.email == admin__.email && req.body.password == admin__.password) {
        res.send('Admin')
    }
    else if (req.body.email == admin__.email && req.body.password != admin__.password) {
        res.send('Salah Pass')
    } else {
    var user = req.body
    users.push(user);
    res.send('User Login')
    }
});


app.use((req,res) =>{
    res.status(404).render('404') 
});

