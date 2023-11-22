let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
}


tabBtn.addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
  });

})

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})
//localStorage.setItem("myName","Sarvesh")
//let name = localStorage.getItem("myName")
//console.log(name)
//localStorage.clear()

// let mylead = `["www.awesomelead.com"]`
// mylead = JSON.parse(mylead)
// mylead.push("www.google.com")
// mylead = JSON.stringify(mylead)
// console.log(mylead)

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value);
  inputEl.value = ""
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  
  render(myLeads)
  console.log(localStorage.getItem("myLeads"))
})


function render(leads) {

  let listItems = ""
  for(let i=0; i<leads.length; i++) {
    //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `
    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    // create element
    // set text content
    // append to ul
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}