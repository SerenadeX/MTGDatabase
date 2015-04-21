var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require("./config.js");
var request = require("request");
var cheerio = require('cheerio');




app.use(express.static(__dirname + '/public'));

app.get("/getSd", function(req, res, next) {

  request({
    method: 'GET',
    url: 'http://magic.tcgplayer.com/db/deck_search_result.asp?DeckType=0'
  }, function(err, response, body) {
    body = cheerio.load(body);
    decks = body('.bodyWrap tr');
    parsed = [];

    var columnSeen = false;

    decks.each(function(key, deck) {
      if (!columnSeen) {
        columnSeen = true;
        return;
      }



      deck = body(deck);
      stats = deck.children('td');

      var colorEl = body(stats[0]).children('img');
      var colors = [];
      colorEl.each(function(key, color) {
        var colorSrc = body(color).attr('src');
        var s = colorSrc.split('/');
        colorSrc = s[s.length-1].split('.')[0];

        colors.push(colorSrc);
      });





      var titleEl = body(stats[1]).text();
      var href = "http://magic.tcgplayer.com" + body(stats[1]).children('a').attr('href');
      var playerEl = body(stats[2]).text();
      var locEl = body(stats[3]).text();
      var finishedEl = body(stats[4]).text();
      var dateEl = body(stats[5]).text();

      var deckObj = {
        color: colors,
        title: titleEl.toString(),
        player: playerEl.toString(),
        loc: locEl.toString(),
        finished: finishedEl.toString(),
        date: dateEl.toString(),
        href: href
      };
      parsed.push(deckObj);
    });


    res.send(parsed);
  });




});



app.listen(config.PORT, function() {
  console.log("Listening on port " + config.PORT);
});
