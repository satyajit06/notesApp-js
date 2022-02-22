console.log("Welcome to Notes App. This is app.js");
showNotes(); //For displaying the notes saved in localStorage on screen

// If user adds a note, adding that note to localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (evt) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes"); //Extracting (saved) notes (if any) from the localStorage
  if (notes == null) {
    notesObj = []; //If no saved notes found in localStorage, make a blank notes array
  } else {
    notesObj = JSON.parse(notes); //JSON.parse will convert (an existing note) from string to array format
  }
  notesObj.push(addTxt.value); //Adding the user's notes content as array
  localStorage.setItem("notes", JSON.stringify(notesObj)); //Updating localStorage with the newly added note. JSON.stringify will convert the array format note into string format, because in localStorage things have to be kept as string only
  addTxt.value = ""; //Emptying the textarea value after the note has been added to localStorage
  console.log(notesObj);
  showNotes(); //For displaying the notes saved in localStorage on screen
});

function showNotes() {
  let notes = localStorage.getItem("notes"); //fetching notes from localStorage
  if (notes == null) {
    notesObj = []; //If no saved notes found in localStorage, make a blank notes array
  } else {
    notesObj = JSON.parse(notes); //JSON.parse will convert (an existing note) from string to array format
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html =
      html +
      `<div class="noteCard mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title fs-3">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick ="deleteNote(this.id)" class="btn btn-danger">Delete Note</button> 
            </div>
        </div>`;
  }); //this.id:- this represents index
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes found! Add your Notes using the above text area and click "Add Note"`;
  }
}
// Function to delete a note
function deleteNote(index) {
  console.log("I am deleting the note with index ", index);

  let notes = localStorage.getItem("notes"); //fetching notes from localStorage
  if (notes == null) {
    notesObj = []; //If no saved notes found in localStorage, make a blank notes array
  } else {
    notesObj = JSON.parse(notes); //JSON.parse will convert (an existing note) from string to array format
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj)); //Updating localStorage with the newly added (or deleted) note. JSON.stringify will convert the array format note into string format, because in localStorage things have to be kept as string only
  showNotes(); //Now show the notes again after deleting some notes
}

// Filtering the notes from the search bar
let searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value.toLowerCase(); //So that capitalisation in search doesn't affect search results

  console.log("Input event fired! Searched Text:", inputVal);

  let noteCards = document.getElementsByClassName("noteCard");

  console.log(noteCards);

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    console.log(cardTxt);

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
