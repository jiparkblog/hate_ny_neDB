window.addEventListener("DOMContentLoaded",()=>{

    const entryList=document.getElementById("list");

    //GET
    fetch("/lists").then(res=>res.json()).then((data)=>{
       entryList.innerHTML=getList(data);
    });

    //POST
    const inputForm = document.getElementById("add-form");
    inputForm.onsubmit = (event) =>{
        event.preventDefault();
        //get value from input
        const listInput = event.target.elements["list"];
        const list=listInput.value;
        listInput.value="";
        //fetch data API
        fetch("/lists",
        {
            method:"POST",
            body: JSON.stringify({list:list}),
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then((data) =>{
            addList(data);   
        });
        
    }//on submit



});//DOM LOADED

//addList
function addList(data){
    const entryList=document.getElementById("list");
    var add= document.createElement("div");
    add.innerHTML = 
        `<div data-list="${data.list}" class="lists">${data.list} 
        <button onclick="removeList(event)">X</button>
        <button onclick="editList(event)">Edit</button>
        </div>
        `  ;
    entryList.prepend(add);

 }

 

//get list and display as lists
function getList(data){
   return data.map((data)=>{
        return `<div data-list="${data.list}" class="lists">${data.list} 
                <button onclick="removeList(event)">X</button>
                <button onclick="editList(event)">Edit</button>
                </div>
                `
   }).join("");
}



//REMOVE
function removeList(event){
    const entryList=document.getElementById("list");
    const list = event.target.parentElement.dataset.list;
    fetch(`/lists/${list}`,
    {
        method: "DELETE",
        headers:{
        'Content-Type': 'application/json'  
        }
    }).then(res=>res.json()).then((data)=>{
      entryList.innerHTML=getList(data);
    })
}

// EDIT - UPDATE
function editList(event){
    const entryList=document.getElementById("list");
    const list = event.target.parentElement.dataset.list;
    let input  = document.createElement("input");
    input.setAttribute("class", "editBox");
    input.value= list;
    event.target.parentElement.replaceWith(input);
    let changedVal;
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         changedVal=this.value;

         fetch(`/lists/${list}`,
         {
             method: "PUT",
             headers:{
             'Content-Type': 'application/json'  
             },
             body: JSON.stringify({
                 "list":changedVal
             })
         }).then(res=>res.json()).then((data)=>{
            entryList.innerHTML=getList(data);
            })
        }
      });
     
   


   
}







