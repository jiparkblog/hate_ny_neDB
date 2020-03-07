const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

//import data library
const Datastore = require("nedb");
//automatically create file
//timestampdata added for chronological order
const db = new Datastore({filename:"data.db", timestampData: true,autoload:true})

db.loadDatabase();

//copy content from db.json to data.db
// const content = fs.readFileSync('./data/db.json');
// let listElement = JSON.parse(content);
// let list = listElement.list;
// list = list.map((list)=>{
//     return{
//        list: list
//     };
// });

// db.insert(list,(err,docs)=>{
//     return docs;
// })


app.use(express.static("public"));
app.use(express.json());

//set html
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/index.html"))
})


//END POINTS

//GET 
app.get("/lists",(req,res)=>{
    db.find({},(err,docs)=>{
        res.json(docs);
    })
})


//POST
app.post("/lists",(req,res)=>{
    const addThis = req.body.list;
    db.insert({list:addThis},(err,newDocs)=>{
        res.json(newDocs)
    // db.find({}, (findErr, entries) => {
    //     return entries;
    // });
    })

});


//DELETE
app.delete("/lists/:name",(req,res)=>{
    const listToDelete = req.params.name;
    db.findOne({ list: listToDelete }, (err, entry) => {
        db.remove(entry, (err) => {
            db.find({}, (err, entries) => {
                res.json(entries);
            });
        })
    });

});

// UPDATE
app.put("/lists/:name",(req,res)=>{
    const listToUpdate = req.params.name;
    const updatedData = req.body;
    db.findOne({list:listToUpdate}, (err, entry) => {
        db.update({_id: entry._id}, updatedData, () => {
            db.find({}, (err, entries) => {
                res.json(entries);
            });
        })
    });

});



//START SERVER
app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
  });