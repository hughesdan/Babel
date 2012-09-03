var db = require('mongojs').connect('mongodb://babel:Cantone$e@staff.mongohq.com:10027/babel');

var saveImage = function(file, usr, usrLanguagePref) {

        //save the image document
        var imagesCollection = db.collection('Images');
        var Image = {};
        Image.imageFileName = file;
        Image.user = usr;
        Image.userLanguagePref = usrLanguagePref;
        Image.date = new Date();
        Image.random = Math.random();
        imagesCollection.save(Image);
        
        //add it to the audio queue for caption recording
        var collectionName = usrLanguagePref + 'Queue';
        var audioQueueCollection = db.collection(collectionName);
        var QueueItem = {};
        QueueItem.imageFileName = file;
        QueueItem.date = Image.date;
        QueueItem.count = 0;
        audioQueueCollection.save(QueueItem);

    }

exports.saveImage = saveImage;


//exports.getImages = getImages;
var getImages = function(quantity, audioLanguage, user, callback) {
//add these parameters: audio does not exist, language==foo, user=foo, tags contains foo
        var imagesCollection = db.collection('Images');
        var random = Math.random();

        imagesCollection.find({
            "audioLanguage": audioLanguage,
            "random": {
                $gt: random
            }
        }).limit(quantity, function(err, docs) {
            if (docs.length < quantity) {
                imagesCollection.find({
                    "audioLanguage": audioLanguage,
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

var getFromQueue = function(quantity, language, callback) {
        var collectionName = language + 'Queue';
        var queueCollection = db.collection(collectionName);

        queueCollection.find().sort({count: 1, date: 1})limit(quantity), callback(err, docs);

    }

exports.getImages = getImages;

var saveAudio = function(image, usr, audio, lang) {
        var imagesCollection = db.collection('Images');
        var Audio = {};
        Audio.audioFileName = audio;
        //Audio.imageFileName = image;
        //the audio object is stored inside of the image object so we don't need imagefilename
        Audio.user = usr;
        Audio.audioLanguage = lang;
        Audio.date = new Date();
        imagesCollection.update({
            imageFileName: image
        }, { $push : {
            audioFiles: Audio //this was previously [Audio] but that was causing a double array in mongo.  delete comment if this fixes the issue.
        }}, function(err) {
            //the update is complete
        });
    }

exports.saveAudio = saveAudio;

var saveUser = function(userID, nativeLanguage, learnLanguage, emailAddress) {

        var usersCollection = db.collection('Users');
        var User = {};
        User.userID = userID;
        User.nativeLanguage = nativeLanguage;
        User.learnLanguage = learnLanguage;
        User.emailAddress = emailAddress;
        User.date = new Date();
        usersCollection.save(User);

    }

exports.saveUser = saveUser;