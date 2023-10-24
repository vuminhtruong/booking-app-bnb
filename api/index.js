const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/User');
const Place = require('./model/Place');
const Booking = require('./model/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
require('dotenv').config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));

mongoose.connect(process.env.MONGO_URL);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const pass = bcrypt.compareSync(password, userDoc.password);
        if (pass) {
            jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, process.env.jwtSecret, {}, (err, token) => { //set cookies
                if (err) {
                    throw err;
                }
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(user.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json();
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const name = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + name,
    })
    res.json(name);
})

const photoMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, process.env.jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: user.id,
            title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc);
    });
});

app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.jwtSecret, {}, async (err, user) => {
        const { id } = user;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, process.env.jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (user.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('change data successfully');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

function getUserDataFromToken(req) {
    return new Promise((resolve, rejects) => {
        jwt.verify(req.cookies.token, process.env.jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            resolve(user);
        });
    });
}

app.post('/bookings', async (req, res) => {
    const user = await getUserDataFromToken(req);
    const {
        place, checkIn, checkOut, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, name, phone, price ,user:user.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

app.get('/bookings', async (req, res) => {
    const user = await getUserDataFromToken(req);
    res.json(await Booking.find({
        user:user.id
    }).populate('place'));
});

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.listen(4000);