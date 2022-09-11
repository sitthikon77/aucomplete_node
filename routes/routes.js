const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// Insert an User into database route
router.post('/add', (req, res) => {
    const user = new User({
        prefix: req.body.prefix,
        fname: req.body.fname,
        lname: req.body.lname,
        company: req.body.company,
        position: req.body.position,
        department: req.body.department,
        phone: req.body.phone,
        email: req.body.email,
        follower: req.body.follower,
        plant: req.body.plant,
        tour: req.body.tour,
        gift: req.body.gift,
        note: req.body.note,
        status: req.body.status,

    });
    user.save((err) => {
        if (err) {
            res.redirect('/duplicate');
        } else {
            req.session.message = {
                type: 'success',
                message: 'เพิ่มข้อมูลของ คุณ ' + req.body.fname + " " + req.body.lname + ' เรียบร้อย'
            };
            res.redirect('/cms');
        }
    })
})

// Registration an User into database route
router.post('/register', (req, res) => {
    const user = new User({
        prefix: req.body.prefix,
        fname: req.body.fname,
        lname: req.body.lname,
        company: req.body.company,
        position: req.body.position,
        department: req.body.department,
        phone: req.body.phone,
        email: req.body.email,
        plant: req.body.plant,
        tour: req.body.tour,
        status: req.body.status,
    });
    user.save((err) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.redirect('/thank');
        }
    })
})

//Get all users route
router.get('/cms', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/failed');
    } else {
        User.find().exec((err, users) => {
            if (err) {
                res.json({ message: err.message });
            } else {
                res.render('cms', {
                    title: 'CMS System | Envicco Registration',
                    users: users,
                });
            }
        });
    }
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Add Users | Envicco Registration' });
});

// index routes
router.get('/', (req, res) => {
    res.render('index', { title: 'Envicco Registration' })
});

// privacy routes
router.get('/privacy', (req, res) => {
    res.render('privacy', { title: 'Envicco Registration' })
});

router.post('/privacy', (req, res) => {

    res.redirect('/registration');

});

// registration
router.get('/registration', (req, res) => {
    res.render('registration', { title: 'Envicco Registration' })
});

router.post('/registration', (req, res) => {
    res.redirect('/visitfactory');
});

// visitfactory
router.get('/visitfactory', (req, res) => {
    res.render('visitfactory', { title: 'Envicco Registration' })
});

router.get('/checkphon', (req, res) => {
    res.render('checkphon', { title: 'Envicco Registration' })
});


// thank
router.get('/thank', (req, res) => {
    res.render('thank', { title: 'Envicco Registration' })
});

// login
router.get('/login', (req, res) => {
    res.render('cms_login', { title: 'Envicco Admin Login' })
});


// Error
router.get('/error', (req, res) => {
    res.render('error', { title: 'Error' })
});

// Login failed
router.get('/failed', (req, res) => {
    res.render('cms_login_failed', { title: 'Page not found' })
});

// Wrong
router.get('/wrong', (req, res) => {
    res.render('cms_wrong_id', { title: 'Wrong username or password' })
});

// duplicate
router.get('/duplicate', (req, res) => {
    res.render('cms_error', { title: 'Duplicate!' })
});

// Edit an user route
router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.redirect('/cms');
        } else {
            if (user == null) {
                res.redirect('/cms');
            } else {
                res.render('edit_users', {
                    title: "Edit User",
                    user: user,
                });
            }
        }
    });
});

// Update user route
router.post('/update/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, {
        prefix: req.body.prefix,
        fname: req.body.fname,
        lname: req.body.lname,
        company: req.body.company,
        position: req.body.position,
        department: req.body.department,
        phone: req.body.phone,
        email: req.body.email,
        follower: req.body.follower,
        plant: req.body.plant,
        tour: req.body.tour,
        gift: req.body.gift,
        note: req.body.note,
        status: req.body.status,
    }, (err, result) => {
        if (err) {
            res.redirect("/duplicate");
        } else {
            req.session.message = {
                type: 'success',
                message: 'แก้ไขข้อมูลของ คุณ ' + req.body.fname + " " + req.body.lname + ' เรียบร้อย',
            };
            res.redirect("/cms");
        }
    });
});

// Delete user route
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, result) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'ลบข้อมูลเรียบร้อย',
            };
            res.redirect('/cms');
        }
    })
})

// CMS Login
router.post('/cms_login', (req, res) => {
    var post = req.body;
    if (post.username === 'admin' && post.password === 'tstone555') {
        let ran_user_id = (Math.random() + 1).toString(36).substring(7);
        req.session.user_id = ran_user_id;
        res.redirect('/cms');
    } else {
        res.redirect('/wrong');
    }
})

// CMS Logout
router.get('/cms_logout', function (req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});

// ============================== Autocomplete =======================================

router.get('/search', (req, res) => {
    res.render('search', { title: 'Search' })
});

router.get('/not_found', (req, res) => {
    res.render('not_found', {
        title: "Not found",
    });
});

router.post('/getName', async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await User.find({ fname: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    if (search.length < 1) {
        search = await User.find({ lname: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    }
    if (search.length < 1) {
        search = await User.find({ phone: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    }
    if (search.length < 1) {
        search = await User.find({ company: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    }
    //Limit Search Results to 10
    search = search.slice(0, 10);
    res.send({ payload: search })
});

// Fetch user
router.post('/fetch_user', async (req, res) => {
    let name = req.body.searchbox;
    let user = await User.find({ fname: name });
    if (user == "") {
        user = await User.find({ fname: name + " " });
        if (user == "") {
            res.redirect('/not_found');
        } else {
            res.render('detail', {
                title: "Detail user",
                user: user,
            })
        }
    } else {
        res.render('detail', {
            title: "Detail user",
            user: user,
        })
    }

});

router.post('/update_status', async (req, res) => {
    let userid = req.body.user_id;
    let name = req.body.name;
    let note = req.body.note;
    let gift = req.body.gift_receive;

    if (userid == null) {
        console.log("userid = null");
    } else {
        await User.updateMany({ _id: userid }, { $set: { status: "มาแล้ว", note: note, gift: gift } })
        res.render('registered', {
            title: "Update Complete",
            userid: userid,
            name: name,
        })
    }
})

module.exports = router;