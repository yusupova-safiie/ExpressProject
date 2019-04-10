/*
const MongoClient=require('mongodb').MongoClient;
var data = require ('./data.js').data;

const mongoClient = new MongoClient('mongodb://localhost:3000', {UseNewUrlParser:true});

mongoClient.connect(function(err,client){
  if(err) return console.log(err);
  // работа с БД
  const db=client.db("all");
  const collection = db.collection("heroes");
  let hero = {name:"", picture:""};      //доделать
  collection.insertOne(hero, function(err,result){
    if(err) console.log(err);
    console.log(result.ops);
  })
  client.close();
});
*/

const mongoose = require('mongoose');

var uri = "mongodb+srv://new-user:<password>@cluster0-pjzc2.mongodb.net/test?retryWrites=true";

uri = uri.replace("<password>", "Asqwer_2001")
uri = uri.replace("test", "EXPRESSPROJECT YUSUPOVA S I-2-18") 

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
var async = require('async')
var Hero = require('./models/hero').Hero;
// очистим бд
// вставим 5 героев
// закроем соединение с бд
function open(callback){
  mongoose.connection.on('open', callback)
}

function dropDB(callback){
  var db = mongoose.connection.db
  db.dropDatabase(callback)}

function insertHero(callback){
    async.parallel([
      function(callback){
        var jack = new Hero({
          nick: "jack"
        })
        jack.save(function(err,jack){
          callback(err, "Ледяной Джек")
        })
      },
      function(callback){
        var fairy = new Hero({
          nick: "fairy"
        })
        fairy.save(function(err,fairy){
          callback(err,"Зубная Фея")
        })
      },
      function(callback){
        var rabbit =new Hero({
          nick: "rabbit"
        })
        rabbit.save(function(err,rabbit){
          callback(err,"Пасхальный кролик")
        })
      },
      function(callback){
        var santa =new Hero({
          nick: "santa"
        })
        santa.save(function(err,santa){
          callback(err,"Ник Северянин")
        })
      },
      function(callback){
        var sandman =new Hero({
          nick: "sandman"
        })
        sandman.save(function(err,sandman){
          callback(err,"Песочник")
        })
      }
    ],
    function(err,result){
      callback(err)
    })
  }
  function close(callback){
    mongoose.disconnect(callback)
  }

  async.series([
    open,
    dropDB,
    insertHero,
    close
  ],
function(err,result){
  if(err) throw err
}
)
