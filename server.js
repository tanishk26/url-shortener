const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const StoreClicks = require('./models/storeClicks')
const app = express()
const useragent = require('express-useragent');
app.use(useragent.express());

mongoose.connect('mongodb://127.0.0.1/urlShortener',  {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}))

app.get('/',async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/', async (req,res) => {
    const temp = await ShortUrl.findOne({full: req.body.fullUrl})
    if(temp == null)
        {await ShortUrl.create({full: req.body.fullUrl})}
    res.redirect('/')
})
app.get('/analyse',async (req,res) => {
    let result = await StoreClicks.find({full: req.body.analyseURL})
    let cnt = [] 
    let srcArr = []
    res.render('ans',{cnt: cnt, result: result,srcArr: srcArr})
})
app.post('/analyse',async (req,res) => {
    let result = await StoreClicks.find({full: req.body.analyseURL})
    let src = await ShortUrl.find({full: req.body.analyseURL})
    let cnt = [] 
    let srcArr = []
    var leth = 24 
    for(var i=0; i<leth; i++){ 
        cnt.push(0) 
     } 
    for(var i=0; i < result.length; i++){ 
        var k = Math.floor((Date.now()-result[i].date)/3600000) 
        if(k <= 23)
        {cnt[k] = cnt[k] + 1} 
    }
        
            srcArr.push(src.visits)
            srcArr.push(src.visitsFB)
            srcArr.push(src.visitsIG)
            srcArr.push(src.visitsYT)
        
        res.render('ans',{cnt:cnt,result: result,srcArr: srcArr})  
})
app.get('/:shortUrl',async (req,res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if(shortUrl == null)  return res.sendStatus(404);
  shortUrl.visits++;
  shortUrl.save()
    let src = req.query.ref
  const storeClicks = new StoreClicks({
    full: shortUrl.full,
    short: shortUrl.short,
    date: Date.now(),
    userAgent: req.get('user-agent'),
    remoteAdd: req.socket.remoteAddress
}) 
storeClicks.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
  if(src === 'fb'){
    shortUrl.visitsFB = shortUrl.visitsFB + 1
  }
  else if(src === 'ig'){
      shortUrl.visitsIG = shortUrl.visitsIG + 1
  }
  else if(src === 'yt'){
      shortUrl.visitsYT = shortUrl.visitsYT + 1
  }
res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);



// console.log(shortUrl);
// req.session.useragent = {
//     browser: req.useragent.browser,
//     version: req.useragent.version,
//     os: req.useragent.os,
//     platform: req.useragent.platform
//  }
//  console.log(JSON.stringify(req.session.useragent, null ,4))
//  next()
// console.log(storeClicks)
// console.log(req.get('user-agent'))
// console.log(req.socket.remoteAddress)
// var datetime = new Date();
// console.log(datetime);
// var timeInMss = Date.now()
// console.log(timeInMss);
//var datetime = new Date();
// var milliseconds = datetime.getTime();
// console.log(Date.now());
// console.log(shortUrl.date);
