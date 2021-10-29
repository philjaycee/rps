let express = require('express')
var bodyParser = require('body-parser');
let app = express()
let port = process.env.port || 9090


var urlencodedParser = bodyParser.urlencoded({ extended: false })

var users = [ ]

app.set('view engine', 'ejs');

app.listen(port, ()=>{ console.log("lostening the server")})

app.use(express.static('public'))

app.get('/', (req,res) => {
    //res.send('<p> home page </p>');
    res.render('index_home');
});

app.get('/game', (req,res) => {
    //res.send('<p> about page</p>');
    res.render('index_rps');
});

app.get('/login', (req,res) => {
    res.render('base', {title:"Login System"})
})

app.post('/login', urlencodedParser, function (req,res) {
    var user = req.body
    users.push(user);
    res.send(users)
});


app.use((req,res) =>{
    res.status(404).render('404') 
});



