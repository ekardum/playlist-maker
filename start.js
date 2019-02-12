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
       document.querySelector('input#search').value =''
      })
      .type('input#search', url)
      .wait('body')
      .click('button#search-icon-legacy')
      .wait(1000)
      .evaluate(function () {
       return document.querySelector('.ytd-two-column-search-results-renderer #contents .ytd-item-section-renderer #video-title').href;
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


