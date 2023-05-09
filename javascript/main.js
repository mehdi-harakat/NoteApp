let menu = document.querySelectorAll(".done .date-time i");
let boxes = document.querySelector(".boxes");
let create = document.querySelector(".boxes .create");
let done = document.querySelector(".boxes .done");
let addNote = document.querySelector(".container .add-note");
let exit = document.querySelector(".holder .header i");
let btnSub = document.querySelector(".holder .section button");
let titleInp = document.querySelector(".title #titleInp");
let descriptionInp = document.querySelector(".description #descriptionInp");

// localStorage.clear()

let catcher = [];
fromLocalStor();





let dateOne = new Date();
let dateNow = `${
	months[dateOne.getMonth()]
} ${dateOne.getDate()}, ${dateOne.getFullYear()}`;

function mainFunction() {
	let randomNum = Math.floor(Math.random() * color.length);
	let obj = {
		id: Date.now(),
		title: titleInp.value,
		content: descriptionInp.value,
		time: dateNow,
		randomColor: color[randomNum],
		bool: false,
	};

	helloHello(obj);
}

function helloHello(test) {
	let catcherOne = [];
	catcherOne.push(test);
	catcher.push(test);
	createCard(catcherOne);
	ToLocalstor(catcher);
}

function createCard(e) {

  e.forEach((elem) => {
		let noteTag = `				
      <div data-count="${elem.id}" class="card done" style="background-color:${elem.randomColor}">
        <h3>${elem.title}</h3>
        <p>
          ${elem.content}
        </p>
        <div class="date-time">
          <p>${elem.time}</p>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="delete-edit">
          <div class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
            <p>edit</p>
          </div>
          <div class="delete">
            <i class="fa-regular fa-trash-can"></i>
            <p>delete</p>
          </div>
        </div>
      </div>`;

		create.insertAdjacentHTML("afterend", noteTag);
	});
}

create.addEventListener("click", () => {
	addNote.classList.add("active");
});

exit.addEventListener("click", () => {
	addNote.classList.remove("active");
});

btnSub.addEventListener("click", () => {
	if (titleInp.value != "" && descriptionInp.value != "") {
		mainFunction();
		addNote.classList.remove("active");
	}
	titleInp.value = "";
	descriptionInp.value = "";
});

document.addEventListener("click", (e) => {
	opCloRemEdi(e);
});

function opCloRemEdi(test) {
	if (test.target.classList.contains("fa-ellipsis")) {
		document.querySelectorAll(".delete-edit").forEach((elem) => {
			elem.classList.remove("active");
		});
		test.target.parentElement.nextElementSibling.classList.add("active");
	} else {
		document.querySelectorAll(".delete-edit").forEach((elem) => {
			elem.classList.remove("active");
		});
	}

	if (test.target.classList.contains("delete")) {
		deleteElement(test.target);
	} else if (test.target.classList.contains("edit")) {
		editElement();
	}
}

function deleteElement(test) {
	let filterDelete = catcher.filter((elem) => {
		if (elem.id !== parseInt(test.parentElement.parentElement.dataset.count)) {
			return elem;
		}
	});
}

function editElement() {}

function fromLocalStor() {
	if (window.localStorage.getItem("element")) {
		let hello = JSON.parse(localStorage.getItem("element"));
		catcher = hello;
		createCard(catcher);
	}
}

function ToLocalstor(elem) {
	localStorage.setItem("element", JSON.stringify(elem));
}
