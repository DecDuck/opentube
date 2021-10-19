const fs = require('fs');
const ffmpeg = require('ffmpeg')
if(!fs.existsSync('./database/videos.json')){
    fs.writeFileSync('./database/videos.json', "{}");
}
var videoIndex = JSON.parse(fs.readFileSync('./database/videos.json'));

var validLetters = "abcdefghijklmnopqrstuvwxyz1234567890";

function generateID() {
    return Math.random().toString(16).slice(8);
}

function saveVideoIndex() {
    fs.writeFileSync('./database/videos.json', JSON.stringify(videoIndex));
}

function createVideo(file, name, description) {
    if (!file.name.endsWith(".mp4")) {
        return false;
    }
    var idValid = false;
    var id = "";
    while (!idValid) {
        id = generateID();
        console.log(id);
        if (videoIndex[id] == null) {
            idValid = true;
        }
    }
    var path = './public/videos/' + id + '.mp4';
    fs.writeFileSync(path, file.data);
    try {
        var process = new ffmpeg(path);
        process.then(function (video) {
            // Callback mode
            video.fnExtractFrameToJPG('./public/thumbnails/', {
                frame_rate: 1,
                number: 1,
                keep_pixel_aspect_ratio: true,
                keep_aspect_ratio: true,
                file_name: id + '.jpg'
            }, function (error, files) {
                console.log(error);
                console.log(files);
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
    videoIndex[id] = {
        name: name,
        description: description,
        id: id
    };
    saveVideoIndex();
    
    return '/video/' + id;
}

function getRandomVideos(amount) {
    var videoIds = [];
    var allVideoIds = Object.keys(videoIndex);
    if(allVideoIds.length == 0){
        return [];
    }
    if(allVideoIds.length > amount){
        for (let i = 0; i < amount; i++) {
            videoIds[i] = allVideoIds[Math.round(Math.random() * 100) % allVideoIds.length];
        }
    }else{
        videoIds = allVideoIds;
        for(let i = allVideoIds.length; i < amount; i++){
            videoIds[i] = null;
        }
    }
    return videoIds;
}

function getVideoMeta(id) {
    if (videoIndex[id] == null) {
        return null;
    }
    return videoIndex[id];
}

module.exports.createVideo = createVideo;
module.exports.getVideoMeta = getVideoMeta;
module.exports.getRandomVideos = getRandomVideos;
