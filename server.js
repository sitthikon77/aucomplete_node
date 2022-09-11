const express = require('express')
const database = require('./database');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://********@cluster0.104bm.mongodb.net/test", { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => { console.log('Connected to Mongoose') });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
// add CSS file
app.use('/public', express.static('public'));

// set template engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {
        title: "Index user",
    });
});

app.post('/getName', async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await database.find({ fname: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    //Limit Search Results to 10
    search = search.slice(0, 10);
    res.send({ payload: search })
});

// Fetch user
app.post('/fetch_user', async (req, res) => {
    let name = req.body.searchbox;
    let user = await database.find({ fname: name });

    if (user == null) {
        console.log("ไม่พบชื่อในฐานข้อมูล");
    } else {
        res.render('detail', {
            title: "Detail user",
            user: user,
        })
    }
});

app.post('/update_status', async (req, res) => {
    let userid = req.body.user_id;
    let name = req.body.name;

    if (userid == null) {
        console.log("userid = null");
    } else {
        await database.updateMany({ _id: userid }, { $set: { status: "มาแล้ว" } })
        res.render('registered', {
            title: "Update Complete",
            userid: userid,
            name: name,
        })
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started on http://localhost:3000');
});
