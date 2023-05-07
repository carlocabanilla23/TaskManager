const http = new coreHTTP;
// Block Variable
let listRetrieved = false;
let theList = [];
let tempList = [];

const newObj = {
  name: "newItem",
  completed: false,
};

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const formAlert =  document.querySelector(".form-alert");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");



// Listeners
addButton.addEventListener("click", httpPost);


/* Helper Functions */
function ShowList() {
  let btn = 0;
  let output = `<div>
                <table>
                <tr id="head">
                  <th></th>
                  <th>My Task</th>
                  <th></th>
                  <th></th>
                </tr> `;

  for (const itm of theList) {
    let x = "";
    if (itm.completed == false){
      x = "";
    }else{
      x= "checked";
    } 

    output += ` <tr class="list">
                  <td  class="c1"> <label><input type="checkbox" id="myCheck" onclick="httpUpdate('${itm._id}')" ${x}></label></td>
                  <td  class="c2"> <input id="txt+${btn}" type="textarea" value="${itm.name}" disabled></td>
                  <td  class="c4"> 
                        <button type="button" id="eButton+${btn}" onclick="edit('sButton+${btn}','eButton+${btn}','txt+${btn}')"><i class="fa fa-edit"></i> </button>
                        <button type="button" id="sButton+${btn}" onclick="htppPatch('sButton+${btn}','eButton+${btn}','txt+${btn}','${itm._id}')" style="display:none;"> <i class="fa fa-save"></i></button>
                  </td>      
                  <td  class="c3"> <button class="btn"><i class="fa fa-trash" onclick="httpDelete('${itm._id}')"></i></button></td>
                </tr>`
                btn++;
  }
  output += "</table></div>";
  result.innerHTML = output;
 
}
function edit(sbtn,ebtn,txtbar){
  var sBtn = document.getElementById(sbtn);
  var eBtn = document.getElementById(ebtn);
  var txt = document.getElementById(txtbar);
  var td = document.getElementsByClassName("c4");
  sBtn.style.display = "inline-block";
  eBtn.style.display = "none";
  txt.disabled = false;
  txt.style.backgroundColor = "#ffffff";
}

async function GetList() {
  const listData = await http.get("/api");
  theList = listData;
   if(theList.length === 0){
    result.style.display = "none";
  }else{
    result.style.display = "inline-block"
  }
  ShowList();
  return; 
}


/* Listener Functions */
async function httpPost(e) {
  const newItem = input.value;
  if (newItem === ""){
    return;
  }

  newObj.name = newItem;
  tempList.push(newObj);
  await http.post("/api",newObj);
  ShowList();
  
  e.preventDefault();
}

async function httpDelete(e) {
  
  await http.delete("/api/"+e);
  ShowList();
}

async function httpUpdate(e){
 
  await http.put("/api/"+e,newObj);
  
 
}
async function htppPatch(sbtn,ebtn,txtbar,id){
  var sBtn = document.getElementById(sbtn);
  var eBtn = document.getElementById(ebtn);
  var txt = document.getElementById(txtbar);
  sBtn.style.display = "none";
  eBtn.style.display = "inline-block";
  txt.disabled = true;
  txt.style.removeProperty("background-color");

  newObj.name = txt.value;
  tempList.push(newObj)
  await http.patch("/api/"+id,newObj);
}


// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
 
  showLoading();

  await GetList();

  addButton.disabled = false;
  
}

main();