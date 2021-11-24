let express = require('express')
var bodyParser = require('body-parser');
let app = express()
let port = process.env.port || 9090
const { sequelize, User, Profile, History } =  require('./models')

const router = require('./router')
app.use(router)


var admin__ = {
    email: "Admin123@gmail.com",
    password: "123"
}

var users = [ ]

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use('/admin', router)


/*
async function main() {
    await sequelize.sync({force:true})
}

main()
*/



app.post('/login',  function (req,res) {

    const {email, password} = req.body
    if (req.body.email == admin__.email && req.body.password == admin__.password) {
        res.redirect('/admin')
    }
    else if (req.body.email == admin__.email && req.body.password != admin__.password) {
        
        res.redirect('/login')
        res.send('Admin Salah Pass')
    } else {
    var user = req.body
    users.push(user);
    res.send(users)
    }
});


app.use((req,res) =>{
    res.status(404).render('404') 
});


app.listen(port, ()=>{ console.log("lostening the server")})


