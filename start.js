var Nightmare = require('nightmare');   
var nightmare = Nightmare({ show: true });
var getYouTubeID = require('get-youtube-id');
var opn = require('opn');
var fs = require('fs');
let text = fs.readFileSync("./songlist.txt").toString('utf-8');
var urls = text.split("\n")
var playlist = "https://www.youtube.com/watch_videos?video_ids="


urls.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto('https://youtube.com')
      .wait('body')
      .evaluate(function() {
       document.querySelector('input#masthead-search-term').value =''
      })
      .type('input#masthead-search-term', url)
      .wait('body')
      .click('button#search-btn')
      .wait('.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link')
      .evaluate(function () {
       return document.querySelector('.yt-lockup-content > .yt-lockup-title > a.yt-uix-tile-link.yt-ui-ellipsis.yt-ui-ellipsis-2.yt-uix-sessionlink.spf-link:nth-child(1)').href;
      })
      .then(function(result){
        results.push(result);
        return results;

      });
  });
}, Promise.resolve([])).then(function(results){
   /*console.dir(results)*/;

    //For array output
    //fs.writeFileSync('songsList.json', JSON.stringify(results));

    results.forEach(function(url) {
    var id = getYouTubeID(url);
    playlist += id +",";
    //console.log(playlist);
    });
    var file = fs.createWriteStream('links.txt');
    file.on('error', function(err) { 'Error!' });
    results.forEach(function(result) { file.write(result + "\r\n"); });
    file.end();
    //console.log('Done!');
}).then(function(){
//results.forEach(function(url) {
//    var id = getYouTubeID(url);
//    var ids= playlist += id +",";
    console.log(playlist);
    opn(playlist);
    console.log('Done!');
  //});
}).then(function() { 
  return nightmare.end(); 
});


