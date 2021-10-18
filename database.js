const fs = require('fs');
var videoIndex = JSON.parse(fs.readFileSync('./database/videos.json'));

var validLetters = "abcdefghijklmnopqrstuvwxyz1234567890";

function generateID(){
    return Math.random().toString(16).slice(8);
}

function saveVideoIndex(){
    fs.writeFileSync('./database/videos.json', JSON.stringify(videoIndex));
}

function createVideo(file, name, description){
    if(!file.name.endsWith(".mp4")){
        return false;
    }
    var idValid = false;
    var id = "";
    while(!idValid){
        id = generateID();
        console.log(id);
        if(videoIndex[id] == null){
            idValid = true;
        }
    }
    file.mv('./public/videos/'+id+'.mp4');
    videoIndex[id] = {
        name: name,
        description: description,
        id: id
    };
    saveVideoIndex();
    return '/video/'+id;
}

function getVideoMeta(id){
    return videoIndex[id];
}

module.exports.createVideo = createVideo;
module.exports.getVideoMeta = getVideoMeta;