const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());

//set html
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/index.html"))
})

//GET /lists
app.get("/lists",(req,res)=>{
    const list = getList();
    res.json(list);
})

//get lists from db.json
function getList(){
    const contents=fs.readFileSync(path.join(__dirname,"./data/db.json"));
    const obj=JSON.parse(contents);
    return obj;
}



//POST
app.post("/lists",(req,res)=>{
    const addThis = req.body.list;
    const list = addNew(addThis);
    res.json(list);
});

//add new list
function addNew(addThis) {
    const list= getList();
    list.list.unshift(addThis);
    fs.writeFileSync(path.join(__dirname,"./data/db.json"), JSON.stringify(list));
    return list;
}


//DELETE
app.delete("/lists/:name",(req,res)=>{
    const listToDelete = req.params.name;
    const list=deleteList(listToDelete);
    res.json(list)
});


//delte function
function deleteList(listToDelete){
    const list=getList();
    //filter out that is NOT 'to be deleted item'
    list.list= list.list.filter(list =>list !== listToDelete);
    fs.writeFileSync(path.join(__dirname,"./data/db.json"),JSON.stringify(list))
    return list;
}




//START SERVER
app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
  });