const boxes = document.querySelector(".boxes");
const addNewNote = document.querySelector(".create");
const addNote = document.querySelector(".add-note");
const exit = document.querySelector(".add-note i");
const titleInp = document.querySelector(".add-note #titleInp");
const descripInp = document.querySelector(".add-note #descriptionInp");
let buttonNew = document.querySelector(".add-note button");
let titleEdit = document.querySelector(".header h3");
// localStorage.clear()

let arrCatch = [];
fromLocalStorag();
createNewNote(arrCatch);
addNewNote.addEventListener("click", () => {
	addNote.classList.add("active");
});

exit.addEventListener("click", () => {
	if (buttonNew.innerHTML === "Update" && titleEdit.innerHTML === "Update a note") {
		titleEdit.innerHTML = "add a new note";
		buttonNew.innerHTML = "add note";
	}
  titleInp.value = "";
  descripInp.value = "";
	addNote.classList.remove("active");
});

buttonNew.addEventListener("click", () => {
	if (buttonNew.innerHTML === "add note") {
		let obj = makeObject();
		if (titleInp.value != "" || descripInp.value != "") {
			titleInp.value = "";
			descripInp.value = "";
			addNote.classList.remove("active");
			arrCatch.push(obj);
			createNewNote(arrCatch);
			toLocalStore(arrCatch);
		}
	}
});

function makeObject() {
	let color = [
		"#CD6155",
		"#AF7AC5",
		"#5499C7",
		"#48C9B0",
		"#5D6D7E",
		"#F39C12",
		"#117A65",
		"#D4AC0D",
	];
	let randomNumber = Math.floor(Math.random() * color.length);
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let yearMonthDay = new Date();
	let yearOne = yearMonthDay.getFullYear();
	let monthOne = yearMonthDay.getMonth();
	let dayOne = yearMonthDay.getDate();
	test = {
		id: Date.now(),
		title: titleInp.value,
		content: descripInp.value,
		dateTime: `${months[monthOne]} ${dayOne}, ${yearOne}`,
		ranColor: color[randomNumber],
	};
	return test;
}

function createNewNote(test) {
	document.querySelectorAll(".boxes .done").forEach((e) => {
		e.remove();
	});
	test.forEach((elem, index) => {
		let noteTag = `				
      <div class="card done" style="background-color:${elem.ranColor}">
        <h3>${elem.title}</h3>
        <p>
          ${elem.content}
        </p>
        <div class="date-time">
          <p>${elem.dateTime}</p>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="delete-edit">
          <div data-count="${index}" class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
            <p>edit</p>
          </div>
          <div data-count="${index}" class="delete">
            <i class="fa-regular fa-trash-can"></i>
            <p>delete</p>
          </div>
        </div>
      </div>`;

		addNewNote.insertAdjacentHTML("afterend", noteTag);
	});
}

function fromLocalStorag() {
	if (localStorage.getItem("notes")) {
		let hello = JSON.parse(localStorage.getItem("notes"));
		arrCatch = hello;
	}
}

function toLocalStore(test) {
	localStorage.setItem("notes", JSON.stringify(test));
}

document.querySelectorAll(".fa-ellipsis").forEach((e) => {});

document.addEventListener("click", (ee) => {
	if (!ee.target.classList.contains("fa-ellipsis")) {
		document.querySelectorAll(".fa-ellipsis").forEach((el) => {
			el.parentElement.nextElementSibling.classList.remove("active");
		});
	} else {
		document.querySelectorAll(".fa-ellipsis").forEach((el) => {
			el.parentElement.nextElementSibling.classList.remove("active");
			ee.target.parentElement.nextElementSibling.classList.add("active");
		});
	}

	if (ee.target.classList.contains("delete")) {
		let alerting = confirm("are you sure you want to delete this note ??");
		if (alerting) {
			arrCatch.splice(+ee.target.dataset.count, 1);
			createNewNote(arrCatch);
			toLocalStore(arrCatch);
		}
	}

	if (ee.target.classList.contains("edit")) {
		titleEdit.innerHTML = "Update a note";
		buttonNew.innerHTML = "Update";
		buttonNew.dataset.count = +ee.target.dataset.count;
		addNote.classList.add("active");
		titleInp.value = arrCatch[ee.target.dataset.count].title;
		descripInp.value = arrCatch[ee.target.dataset.count].content;
	}

	if (ee.target.innerHTML === "Update") {
		let obj = makeObject();
		arrCatch[+ee.target.dataset.count].title = obj.title;
		arrCatch[+ee.target.dataset.count].content = obj.content;

		createNewNote(arrCatch);
		toLocalStore(arrCatch);
		titleEdit.innerHTML = "add a new note";
		buttonNew.innerHTML = "add note";
		titleInp.value = "";
		descripInp.value = "";
		addNote.classList.remove("active");
	}
});
