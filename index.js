require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid')
const validURL = require('valid-url');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGOOSE_URI);

const urlSchema = new mongoose.Schema({
    longURL: String,
    shortURL: String,
    shortID: String
})

const URL = new mongoose.model('URL', urlSchema);

var longURL;
var error = "Server Error!! Please Try Again Later.";

app.get('/create', (req, res) => {
    res.render('create', { error: "", newURL: {} });
})

app.post('/create', (req, res) => {
    var shortID = nanoid(11);

    if (req.body.customAlias != "") {
        shortID = req.body.customAlias;
    }

    longURL = req.body.longURL;
    var shortURL = process.env.BASE_URL + "/" + shortID;

    const newURL = new URL({
        longURL: longURL,
        shortURL: shortURL,
        shortID: shortID
    })

    if (validURL.isUri(longURL) && validURL.isUri(shortURL)) {
        URL.findOne({ longURL: longURL }, function (err, result) {
            if (!err) {
                if (result == null) {
                    newURL.save(function (erro) {
                        if (erro) {
                            // console.log(erro);
                            res.render('create', { error: error, newURL: {} });
                        }
                        else {
                            displayShortURL(req, res);
                        }
                    })
                }
                else {
                    // console.log("Original URL already in Database");
                    // res.redirect('/api');
                    displayShortURL(req, res);
                }
            }
            else {
                // console.log("Error Occured in Finding");
                res.render('create', { error: error, newURL: {} });
            }
        })
    }
    else if (!validURL.isUri(longURL) && !validURL.isUri(shortURL)) {
        error = "Invalid Long URL and Custom Alias!";
        res.render('create', { error: error, newURL: {} });
    }
    else if (!validURL.isUri(longURL)) {
        error = "Invalid Long URL!";
        res.render('create', { error: error, newURL: {} });
    }
    else if (!validURL.isUri(shortURL)) {
        error = "Invalid Custom Alias!";
        res.render('create', { error: error, newURL: {} });
    }


    // if (validURL.isUri(longURL)) {


    // }
    // else {
    //     error = "Invalid URL";
    //     res.render('index', { error: error, shortURL: "", shortID: "" });
    // }
})

function displayShortURL(req, res) {
    URL.findOne({ longURL: longURL }, function (err, result) {
        if (!err) {
            res.render('create', { error: "", newURL: result });
        }
    })
}

app.get('/', async (req, res) => {
    res.render('redirect', { error: "", URL: { longURL: "https://shdhost.xyz/" } });
    //res.redirect(result.longURL);
})

app.get('/:shortID', async (req, res) => {
    const result = await URL.findOne({ shortID: req.params.shortID })
    if (result == null) return res.sendStatus(404)
    res.render('redirect', { error: "", URL: result });
    //res.redirect(result.longURL);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Successfully listening");
})