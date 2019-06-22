"use strict";
// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// configuration
const app = express();

app.use(bodyParser.json()); // tells the system that you want json to be used.
app.use(bodyParser.urlencoded({
    extended: true
})); // tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false)

app.post('/webhook', (req, res) => {
    console.log("webhook is triggered");//to check if the post function is working well on terminal

    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.queryResult.events));

    if(req.body.queryResult.parameters.random) { // to make this function work only when menu-rec parameter is given
        const idx = Math.floor((Math.random() * 21) + 1);// a random number between 1 and 21 is generated
        var reqUrl = "http://merlabot-api.herokuapp.com/restaurants/" + String(idx); //concat stringified number after the API address

        http.get(reqUrl, (responseFromAPI) => { // using an http request to query database
            let completeResponse = '';
            responseFromAPI.on('data', (chunk) => {
                completeResponse += chunk;
            });//default method of http query, don't edit this part!

            responseFromAPI.on('end', () => {
                const restaurant = JSON.parse(completeResponse);
                var textToSend = `짜잔~~~ ${restaurant[0].restaurant_name} 먹어보는 거 어때?`;
                var imageUrl = `${restaurant[0].image_url}`
                /* the queried url looks like this:
                [
                    {"id":1,
                    "restaurant_name":"Bak Kut Teh",
                    "image_url":"http://merlabot.com/wp-content/uploads/2019/02/image_id_6.jpg"}
                ]
                [0] indicates the first '{}' in '[],' there is only one group in this url anyway
                .restaurant_name indicates accessing the value with this particular key
                */
                console.log(restaurant[0].restaurant_name); // to check on terminal
                return res.json({
                         "payload": {
                            "facebook": {
                                "attachment":{
                                  "type":"template",
                                  "payload":{
                                    "template_type":"generic",
                                    "elements":[
                                      {
                                        "title":textToSend,
                                        "subtitle": "#jmt #싱가포르맛집",
                                        "image_url": imageUrl,
                                        "buttons": [
                                          {
                                            "type": "element_share",
                                            "share_contents": {
                                              "attachment": {
                                                "type": "template",
                                                "payload": {
                                                  "template_type": "generic",
                                                  "elements": [
                                                    {
                                                      "title": "멀라봇이 추천해주는 싱가폴 음식",
                                                      "subtitle": textToSend,
                                                      "image_url": imageUrl,
                                                      "default_action": {
                                                        "type": "web_url",
                                                        "url": "http://m.me/merlabot?ref=invited_by_id"
                                                      },
                                                      "buttons": [
                                                        {
                                                          "type": "web_url",
                                                          "url": "http://m.me/merlabot?ref=invited_by_id",
                                                          "title": "싱가포르 음식 추천 받기"
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              }
                                            }
                                          },
                                        {
                                            "type": "postback",
                                            "title": "또 물어보기",
                                            "payload": "메뉴 추천"
                                        }
                                        ]
                                      }
                                    ]
                                  }
                                }
                          }
                       }
                });
            });
        }, (error) => {
            console.log(error);
            return res.json({ // process error case
                fulfillmentText: 'Something went wrong!',
            });
        });
    } else if (req.body.queryResult.parameters) {
        console.log(JSON.stringify(req.body.queryResult.queryText));
        var string = JSON.stringify(req.body.queryResult.queryText);
        console.log(string.length);
        let textToSend = ' ';
        for (var i = 1; i < string.length - 1; i++){
            textToSend += string[i];
            textToSend += '~';
        }
        var imageUrl = `http://merlabot.com/wp-content/uploads/2019/02/KakaoTalk_Photo_2019-02-19-11-25-29.png`;
                return res.json({
                         "payload": {
                            "facebook": {
                                "attachment":{
                                  "type":"template",
                                  "payload":{
                                    "template_type":"generic",
                                    "elements":[
                                      {
                                        "title":textToSend,
                                        "subtitle": "#고경표 #밉상 #미안해못알아들었어",
                                        "image_url": imageUrl,
                                        "buttons": [
                                          {
                                            "type": "element_share",
                                            "share_contents": {
                                              "attachment": {
                                                "type": "template",
                                                "payload": {
                                                  "template_type": "generic",
                                                  "elements": [
                                                    {
                                                      "title": "고경표",
                                                      "subtitle": textToSend,
                                                      "image_url": imageUrl,
                                                      "default_action": {
                                                        "type": "web_url",
                                                        "url": "http://m.me/merlabot?ref=invited_by_id"
                                                      },
                                                      "buttons": [
                                                        {
                                                          "type": "web_url",
                                                          "url": "http://m.me/merlabot?ref=invited_by_id",
                                                          "title": "고경표"
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                }
                          }
                       }
                });
            }
});


// Logic for running your server with HTTPS here
app.listen((process.env.PORT || 8000), () => {
    console.log("App is up and running...");
}); // set up
