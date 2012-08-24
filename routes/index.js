var model = require('../models'),
    url = require('url');
    
exports.index = function(req, res) {
    res.render('index', {
        title: 'Express'
    })
};

exports.image = function(req, res) {
        if (req.method == 'GET') {
            console.log(req.url);
            var urlObj = url.parse(req.url, true);
             var quantity = parseInt(urlObj.query["quantity"]);
             var audioLanguage = urlObj.query["language"];
            model.getImages(quantity, audioLanguage, function(err, images) {
            return res.send(images);        
        });
    }
    /*
    if (req.method == 'GET') {
        
        
        res.render('image', {
            title: 'Image Page'
        })
        
        var image = model.getImages();
        return res.send(image);
        
    }*/
    else if (req.method == 'POST') {
        // Check body.length for flood attack or faulty client
        
        var imageFileName = req.body.imageFileName;
        var user = req.body.user;
        var usrLanguagePref = req.body.userLanguagePref;
        model.saveImage(imageFileName, user, usrLanguagePref);
    }
};


exports.audio = function(req, res) {
        if (req.method == 'GET') {

    }

    else if (req.method == 'POST') {
        
        var urlObj = url.parse(req.url, true);
        var image = req.body.image;
        var user = req.body.user;
        var audio = req.body.audio;
        var lang = req.body.lang;
        
        model.saveAudio(image, user, audio, lang);

    }
};

exports.user = function(req, res) {
        if (req.method == 'GET') {

    }

    else if (req.method == 'POST') {
        
        var urlObj = url.parse(req.url, true);
        var userID = req.body.user;
        var nativeLanguage = req.body.nativeLanguage;
        var learnLanguage = req.body.learnLanguage;
        
        model.saveUser(userID, nativeLanguage, learnLanguage);

    }
};

exports.queue = function(req, res) {
        if (req.method == 'GET') {
            var urlObj = url.parse(req.url, true);
            var quantity = parseInt(urlObj.query["quantity"]);
            var language = urlObj.query["language"];
            model.getImages(quantity, language, function(err, images) {
            return res.send(images);
            });

    }

    else if (req.method == 'POST') {
        


    }
};