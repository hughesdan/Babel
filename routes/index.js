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
        model.getImages(quantity, function(err, images) {
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
        model.saveImage(imageFileName, user);
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