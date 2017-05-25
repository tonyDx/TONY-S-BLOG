const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(bodyParser.json());

// 模板引擎设置;
app.set('view engine','ejs');

const  url = 'mongodb://localhost:27017/node_blog';

let db;

MongoClient.connect(url, (err, database) => {
    if(err) return console.log(err);

    db= database;

    app.listen(80,()=>{
        console.log('listening on 80')
    });
});


app.get('/', (req, res) => {
    let data = db.collection('blog_data').find().toArray((err,result) => {
        /**
         * 模板引擎渲染
         */
        res.render('index.ejs',{quotes:result})
    });

    /**
     * 发送静态文件过去
     */
    // res.sendfile(__dirname+'/index.html')

});

app.post('/quotes',(req,res)=>{
    console.log(req.body);
    db.collection('blog_data').save(req.body,(err,result)=>{
        if(err)return console.log(err);

        console.log('saved to database');

        res.redirect('/');

    })
});


app.put('/quotes',(req,res)=>{
    db.collection('blog_data').findOneAndUpdate(
        {
            name: req.body.name1
            // sort: {_id:-1}//最后一条
        },//query
        {
            $set: {
                name: req.body.name2,
                quote: req.body.quote
            }
        },//updata
        {
            sort: {_id:-1},
            upsert: true//如果没有就强制插入一条
        },///option
        (err,result) => {
            if(err)return res.send(err);
            console.log(err,result);
            res.send(result);
        }
    )
});


app.delete('/quotes', (req, res) => {
    db.collection('blog_data').findOneAndDelete(
        {name: req.body.name},
        (err, result) => {
            if (err) return res.send(500, err);
            res.send('A darth vadar quote got deleted')
        })
});