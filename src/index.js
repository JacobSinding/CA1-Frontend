import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import { SERVER_URL } from './constants'
import "./jokeFacade"
import jokeFacade from "./jokeFacade"

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
    .then(handleHttpErrors)
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_phone").innerHTML = allRows.join("")
    });
}

//get person by hobby
function getByHobby() {
  url = 'https://abefisk.dk/ca/api/ca/person_by_hobby/'+ document.getElementById("hobby").value;
  fetch(url)
    .then(handleHttpErrors)
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_hobby").innerHTML = allRows.join("")
    });
}

//get by zip
function getByZip() {
  url = 'https://abefisk.dk/ca/api/ca/person_by_city/'+ document.getElementById("zip_code").value;
  fetch(url)
    .then(handleHttpErrors)
    .then(data => 
    {
      const allRows = data.map(p => getPersonTableRow(p))
      document.getElementById("person_by_zip").innerHTML = allRows.join("")
    });
}

//get table data
function getPersonTableRow(p)
{
  return `<tr>
    <th>${p.id}</th>
    <th>${p.email}</th>
    <th>${p.first_name}</th>
    <th>${p.last_name}</th>
    <th>${p.phones}</th>

    </tr>`
}

function createPerson() {
  const data = {
    email: document.getElementById("createEmail").value,
    first_name: document.getElementById("createFirstName").value,
    last_name: document.getElementById("createLastName").value
  }

  fetch(`https://abefisk.dk/ca/api/ca/create_person/`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  alert("test")
}

function getAllCities() {
  fetch(`https://abefisk.dk/ca/api/ca/get_all_zipcodes/`)
  .then (handleHttpErrors)
  .then (data => {
    const allRows = data.map(p => getCities(p));
    document.getElementById("get_cities_body").innerHTML = allRows.join("")
  })
}

function getCities(data) {
  return `<tr>
  <th scope="row">${data.zipCode}</th>
  <th>${data.city}</th>
</tr>`
}

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/


function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("person_html").style = "display:none"
  document.getElementById("create_person_html").style = "display:none"
  document.getElementById("get_person_by_phone_html").style = "display:none"
  document.getElementById("get_person_by_hobby_html").style = "display:none"
  document.getElementById("get_person_by_zip_html").style = "display:none"
  document.getElementById("get_cities_html").style = "display:none"
  document.getElementById("address_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "person": hideAllShowOne("person_html"); break
    case "create_person": hideAllShowOne("create_person_html"); break
    case "get_person_by_phone": hideAllShowOne("get_person_by_phone_html"); break
    case "get_person_by_hobby": hideAllShowOne("get_person_by_hobby_html"); break
    case "get_person_by_zip": hideAllShowOne("get_person_by_zip_html"); break
    case "get_cities": hideAllShowOne("get_cities_html");  getAllCities(); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}


function handleHttpErrors(res)
{
  if (!res.ok)
  {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function errorHandling(err)
{
  console.log(err)
  if (err.status)
  {
    err.fullError.then(e => console.log(e.message))
  }
  else
  {
    console.log("Network error")
  }
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
    getByZip();
    break;
    case "create_person_button":
    createPerson();
    break;
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
document.getElementById("phone_number_submit_button").onclick = submitAction;
document.getElementById("hobby_submit_button").onclick = submitAction;
document.getElementById("zip_submit_button").onclick = submitAction;
document.getElementById("create_person_button").onclick = submitAction;
hideAllShowOne("about_html");


