var db = require('mongojs').connect('mongodb://babel:Cantone$e@staff.mongohq.com:10027/babel');

var saveImage = function(file, usr) {

        var imagesCollection = db.collection('Images');
        var Image = {};
        Image.imageFileName = file;
        Image.user = usr;
        Image.date = new Date();
        Image.random = Math.random();
        imagesCollection.save(Image);

    }

exports.saveImage = saveImage;


//exports.getImages = getImages;
var getImages = function(quantity, callback) {

        var imagesCollection = db.collection('Images');
        var random = Math.random();

        imagesCollection.find({
            "random": {
                $gt: random
            }
        }).limit(quantity, function(err, docs) {
            if (docs.length < quantity) {
                imagesCollection.find({
                    "random": {
                        $lte: random
                    }
                }).limit(quantity, function(err, moreDocs) {
                    callback(err, moreDocs)
                });
            }
            else {
                callback(err, docs);
            }
        });

    }

exports.getImages = getImages;


var saveAudio = function(image, usr, audio, lang) {
//{ $push : { field : value, field2 : value2 } }
        var imagesCollection = db.collection('Images');
        var Audio = {};
        Audio.audioFileName = audio;
        Audio.imageFileName = image;
        Audio.user = usr;
        Audio.audioLanguage = lang;
        Audio.date = new Date();
        imagesCollection.update({
            imageFileName: image
        }, { $push : {
            audioFiles: [Audio]
        }}, function(err) {
            //the update is complete
        });
    }

exports.saveAudio = saveAudio;