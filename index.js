//=============================初始定義==============================
const config = require('./config.json');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid')
const validURL = require('valid-url');

var longURL;
var error = "伺服器錯誤，請稍後再試一次。";

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


//==============================資料庫連接==============================
mongoose.connect(config.mongodb_uri);

const urlSchema = new mongoose.Schema({
    longURL: String,
    shortURL: String,
    shortID: String
});
const URL = new mongoose.model('URL', urlSchema);


//==============================創建頁面==============================
app.get('/create', (req, res) => {
    res.render('create', { error: "", newURL: {} });
});

app.post('/create', (req, res) => {
    if (req.body.customAlias == "create") {
        return res.render('create', { error: "想幹嘛", newURL: {} });
    }

    var shortID = nanoid(11);

    if (req.body.customAlias != "") {
        shortID = req.body.customAlias;
    }

    longURL = req.body.longURL;
    var shortURL = config.base_url + "/" + shortID;

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
                            res.render('create', { error: error, newURL: {} });
                        }
                        else {
                            displayShortURL(req, res);
                        }
                    })
                } else {
                    displayShortURL(req, res);
                }
            }
            else {
                res.render('create', { error: error, newURL: {} });
            }
        })
    }
    else if (!validURL.isUri(longURL) && !validURL.isUri(shortURL)) {
        res.render('create', { error: "原網址及自訂短網址格式錯誤", newURL: {} });
    }
    else if (!validURL.isUri(longURL)) {
        res.render('create', { error: "原網址格式錯誤", newURL: {} });
    }
    else if (!validURL.isUri(shortURL)) {
        res.render('create', { error: "原網址格式錯誤", newURL: {} });
    }
});


//==============================Functions==============================
function displayShortURL(req, res) {
    URL.findOne({ longURL: longURL }, function (err, result) {
        if (!err) {
            res.render('create', { error: "", newURL: result });
        }
    })
}


//==============================API系統==============================
app.use(bodyParser.json());

app.post("/api/create", async (req, res) => {
    if (!req.body) return res.send({
        status: "error",
        code: 401,
        message: "No Body"
    });

    console.log(req);
    let longURL = req.body.longURL;
    var shortID = nanoid(11);

    if (req.body.shortID) {
        shortID = req.body.shortID;
    }

    var shortURL = config.base_url + "/" + shortID;

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
                            return res.send({
                                status: "error",
                                code: 500,
                                message: "Server Error"
                            });
                        } else {
                            return res.send({
                                status: "success",
                                code: 201,
                                message: "created",
                                data: {
                                    longURL: longURL,
                                    shortURL: shortURL
                                }
                            });
                        }
                    });
                } else {
                    return res.send({
                        status: "success",
                        code: 200,
                        message: "created",
                        data: {
                            longURL: longURL,
                            shortURL: shortURL
                        }
                    });
                }
            } else {
                return res.send({
                    status: "error",
                    code: 500,
                    message: "Server Error"
                });
            }
        })
    } else if (!validURL.isUri(longURL) && !validURL.isUri(shortURL)) {
        return res.send({
            status: "error",
            code: 400,
            message: "long url and short id illegal"
        });
    } else if (!validURL.isUri(longURL)) {
        return res.send({
            status: "error",
            error: 401,
            message: "long url illegal"
        });
    } else if (!validURL.isUri(shortURL)) {
        return res.send({
            status: "error",
            error: 402,
            message: "short id illegal"
        });
    }
});


//==============================導向程式==============================
app.get('/', async (req, res) => {
    res.render('redirect', { error: "", URL: { longURL: "https://shdhost.xyz/" } });
});

app.get('/:ID', async (req, res) => {
    const result = await URL.findOne({ shortID: req.params.ID })
    if (result == null) return res.sendStatus(404)
    res.render('redirect', { error: "", URL: result });
});

//==============================服務啟動==============================
const port = config.port || 3000;
app.listen(port, () => {
    console.log(`服務架於 ${port} Port`);
});