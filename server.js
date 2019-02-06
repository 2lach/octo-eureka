const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const { move, curl } = require('./move-json');

app.get('/', function (req, res) {

  const links = [
    'https://www.entreprenor.se/nyheter/han-ar-sveriges-framsta-entreprenor_729641.html',
    'https://www.entreprenor.se/tips-fran-experten/10-tips-sa-far-du-fart-pa-exporten_725738.html',
    'https://www.entreprenor.se/nyheter/staten-tar-utan-att-betala_698764.html',
    'https://www.entreprenor.se/om_entreprenor/information-om-cookies_578230.html',
  ]
  const pickArandom = Math.floor(Math.random() * 4)
  const url = links[pickArandom]

  request(url, function (error, response, html) {
    if (error) {
      return console.log('Error: ', error)
    }
    const $ = cheerio.load(html);
    const json = {
      url,
      articleTitle: "",
      mediaType: "",
      mediaLink: "",
      description: "",
      content: "",
    };

    const mediaType = $('meta[name="articleTypeName"]').attr('content');
    const title = $('head title').text();
    const desc = $('meta[name="description"]').attr('content');

    json.mediaType = mediaType;
    json.articleTitle = title;
    json.description = desc;

    $('#main').filter(function () {
      const data = $(this);

      const content = data.children().find('.col-sm-10');
      let media;
      if (mediaType === 'story') {
        media = data.find('.img-responsive').attr('src').toString();
      } else if (mediaType === 'tv') {
        media = data.find('#tvPlayerWrapper').parent().html();
      }
      json.mediaLink = media;
      json.content = content.text().trim();

    })

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
      if (err) return `JSON file not created: ${err}`
      move();
    });
    res.send(`Well hello there, the data has been fetched, you can now start the frontend, with "npm run frontend" or go over to <a href="http://localhost:3000">frontend</a> if its already running`)
  })
})


app.listen('8080')
console.log('open http://localhost:8080');
curl();

exports = module.exports = app;