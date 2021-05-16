const express = require('express')
const router = express.Router()
const videos = require('../mockData')
const fs = require('fs')
const geoip = require('geoip-lite');
// const dataMap = require('../ipsocketid')

// get list of video
router.get('/', (req,res)=>{
    // ip=req.ip;
    // dataMap.set(ip,"")
    res.json(videos)
})

// make request for a particular video
router.get('/:id/data', (req,res)=> {
    res.json(videos[id])
})

//streaming route
router.get('/video/:id', (req, res) => {

    ip=req.ip;
    //test my ip
    //ip = "2405:201:8003:20ae:ec1c:2cce:8bff:1c71";
    console.log(req.ip);


//get information about ip
var geo = geoip.lookup(ip);
 
//console.log(geo);
// {
//   range: '',
//   country: 'IN',
//   region: '',
//   city: '',
//   ll: [ 20, 77 ],
//   metro: 0,
//   area: 100,
//   eu: '0',
//   timezone: 'Asia/Kolkata'
// }

    const id = parseInt(req.params.id, 10)
    console.log();
    const user={
        ipaddress:ip,
        info:geo
    }
    console.log(user);
    for (const x of videos) {
        if( x.id===req.params.id)
            x.activeUsers.push(user);
    }
   

    const videoPath = `assets/${req.params.id}.mp4`;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if (videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        console.log("Subham");
        fs.createReadStream(videoPath).pipe(res);
    }
});

// captions route
const captionPath = '../bingePlusBackend/'
router.get('/video/:id/caption', (req, res) => res.sendFile(`assets/captions/${req.params.id}.vtt`, { root: captionPath }));
//router.get('/video/:id/caption', (req, res) => res.sendFile(`assets/captions/${req.params.id}.vtt`));
module.exports = router;