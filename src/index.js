import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import { SERVER_URL } from './constants'
import "./jokeFacade"
import jokeFacade from "./jokeFacade"

document.getElementById("all-content").style.display = "block"


document.getElementById("all-content").style.display = "block"

//show all persons
function fetchAllPersons() {
  fetch('https://abefisk.dk/ca/api/ca/all_persons')
      .then(res => res.json())
      .then(data => {
        const allRows = data.map(p => getPersonTableRow(p))
        document.getElementById("tablerows").innerHTML = allRows.join("")
      });
}

let getAllPersonsBtn = document.getElementById("getAllPersons");

//and event to show all persons btn
getAllPersonsBtn.addEventListener('click', (mouse)=> {
  mouse.preventDefault();
  fetchAllPersons();
});

let url;

//get person by phone
function getByPhone() {
  url = 'https://abefisk.dk/ca/api/ca/person_by_number/'+ document.getElementById("phone_number").value;
  fetch(url)
    .then(res => res.json())
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_phone_body").innerHTML = allRows.join("")
    });
}

//get person by hobby
function getByHobby() {
  url = 'https://abefisk.dk/ca/api/ca/person_by_hobby/'+ document.getElementById("hobby").value;
  fetch(url)
    .then(res => res.json())
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_hobby_body").innerHTML = allRows.join("")
    });
}

//get by zip
function getByZip() {
  url = 'https://abefisk.dk/ca/api/ca/person_by_city/'+ document.getElementById("zip_code").value;
  fetch(url)
    .then(res => res.json())
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_zip_body").innerHTML = allRows.join("")
    });
}

//get table data
function getPersonTableRow(p)
{
  return `<tr>
    <td>${p.id}</td>
    <td>${p.email}</td>
    <td>${p.first_name}</td>
    <td>${p.last_name}</td>
    <td>${p.phones}</td>

    </tr>`
}
/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/


function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("person_html").style = "display:none"
  document.getElementById("get_person_by_phone_html").style = "display:none"
  document.getElementById("get_person_by_hobby_html").style = "display:none"
  document.getElementById("get_person_by_zip_html").style = "display:none"
  document.getElementById("address_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "person": hideAllShowOne("person_html"); break
    case "get_person_by_phone": hideAllShowOne("get_person_by_phone_html"); break
    case "get_person_by_hobby": hideAllShowOne("get_person_by_hobby_html"); break
    case "get_person_by_zip": hideAllShowOne("get_person_by_zip_html"); break
    case "address": hideAllShowOne("address_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}

function submitAction(evt) {
  const id = evt.target.id;
  switch (id) {
    case "phone_number_submit_button": 
    getByPhone();
      break;
    case "hobby_submit_button":
    getByHobby();
    break;
    case "zip_submit_button":
      alert("test")
    getByZip();
    break;
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
document.getElementById("phone_number_submit_button").onclick = submitAction;
document.getElementById("hobby_submit_button").onclick = submitAction;
document.getElementById("zip_submit_button").onclick = submitAction;
hideAllShowOne("about_html");


