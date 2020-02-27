window.addEventListener("DOMContentLoaded",()=>{

    const loveList=document.getElementById("list");

    //getting all data and putting it on html
    fetch("/lists").then(res=>res.json()).then((data)=>{
        loveList.innerHTML=getList(data.list);
    });

    //Adding to list from input form
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
            loveList.innerHTML = getList(data.list);
        });

    }//on submit



});//DOM LOADED

//get list and display as lists
function getList(data){
    return data.map((data)=>{
        return `<div data-list="${data}" class="lists">${data} 
                <button onclick="removeList(event)">X</button>
                <button onclick="editList(event)">Edit</button>
                </div>
                `
    }).join("");
}

//REMOVE
function removeList(event){
    const loveList=document.getElementById("list");
    const list = event.target.parentElement.dataset.list;

    fetch(`/lists/${list}`,
    {
        method: "DELETE",
        headers:{
        'Content-Type': 'application/json'  
        }
    }).then(res=>res.json()).then((data)=>{
        loveList.innerHTML=getList(data.list);
    })
}





