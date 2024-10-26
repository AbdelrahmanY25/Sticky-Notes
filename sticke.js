let divNotes = document.querySelector(".notes");
let addNotes = document.querySelector(".add-note span");
let divCat = document.querySelector(".cat");

let colors = ["#948b8c", "#ffbc0c", "#ff550a", "#ff006d", "#8535eb", "#3a83ff"];
let currentNote = 1;

const arrayOfNotes = [];
const arrayOfColors = getColorsFromLocalstorage() || [];
const arrayOfTexts = getTextsFromLocalstorage() || [];

let uniquearrayOfColors = [...new Set(arrayOfColors)];

getNotesFromLocalstorage();

createDivsOfCategories();

console.log(arrayOfColors);
console.log(uniquearrayOfColors);

addTxt();

function addNote() {
	let txtArea = document.createElement("textarea");
	let deleteSpan = document.createElement("span");
	let noteDiv = document.createElement("div");
	let colorDiv = document.createElement("div");

	noteDiv.classList.add("note");
	noteDiv.id = `${currentNote}`;
	colorDiv.classList.add("color");
	deleteSpan.classList.add("delete");
	deleteSpan.setAttribute("onclick", `deleteSapn(${currentNote})`);

	txtArea.style.backgroundColor = arrayOfColors[currentNote - 1] || "#948b8c";
	txtArea.value = arrayOfTexts[currentNote - 1] || "";

	deleteSpan.textContent = "Delete";

	for (let i = 0; i < colors.length; i++) {
		let span = document.createElement("span");
		span.style.backgroundColor = colors[i];
		span.dataset.color = `span-${currentNote}-${i + 1}`;
		colorDiv.append(span);
	}

	noteDiv.append(colorDiv);
	noteDiv.append(txtArea);
	noteDiv.append(deleteSpan);
	divNotes.prepend(noteDiv);
	arrayOfNotes.length = currentNote;
	addNotesToLocalStoraage(arrayOfNotes);

	if (!arrayOfColors[currentNote - 1]) {
		arrayOfColors.push("#948b8c");
	};

	if (!arrayOfTexts.length) {
		arrayOfTexts.length = currentNote;
		for (let i = 0; i < arrayOfTexts.length; i++) {
			arrayOfTexts[i] = "";
		}
	}
	currentNote++;
	changeColor();
	addTxt();
}

function changeColor() {
	let allNotes = document.querySelectorAll(".notes .note .color");
	allNotes.forEach(note => {
		note.addEventListener("click", e => {
			note.parentElement.children[1].style.backgroundColor = rgbToHex(e.target.style.backgroundColor);
			arrayOfColors[parseInt(note.parentElement.id) - 1] = rgbToHex(e.target.style.backgroundColor);
			addColorsToLocalStoraage(arrayOfColors);
			let colorsOccurrences = countNameOccurrences(arrayOfColors);
			filterColorsOnCategories(colorsOccurrences);
			location.reload();
		});
	});
}

function addTxt() {
	let txtArea = document.querySelectorAll(".notes .note textarea");
	txtArea.forEach(txt => {
		txt.addEventListener("input", () => {
			arrayOfTexts[parseInt(txt.parentElement.id) - 1] = txt.value;
			addNotesTextToLocalStoraage(arrayOfTexts);
		});
	});
}

function rgbToHex(rgb) {
	let col;
	switch (rgb) {
		case "rgb(148, 139, 140)":
			col = "#948b8c";
			break;
		case "rgb(255, 188, 12)":
			col = "#ffbc0c";
			break;
		case "rgb(255, 85, 10)":
			col = "#ff550a";
			break;
		case "rgb(255, 0, 109)":
			col = "#ff006d";
			break;
		case "rgb(58, 131, 255)":
			col = "#3a83ff";
			break;
		case "rgb(133, 53, 235)":
			col = "#8535eb";
			break;
		default:
			col = rgb; // Return the original RGB value if no match
	}
	return col;
}

function addNotesToLocalStoraage(arrayOfNotes) {
	localStorage.setItem("all-notes", JSON.stringify(arrayOfNotes));
}
function addColorsToLocalStoraage(arrayOfColors) {
	localStorage.setItem("all-colors", arrayOfColors);
}
function addNotesTextToLocalStoraage(arrayOfTexts) {
	localStorage.setItem("all-texts", arrayOfTexts);
}

function getNotesFromLocalstorage() {
	const allNotes = JSON.parse(localStorage.getItem("all-notes")) || [];
	if (allNotes) {
		let numofNotes = allNotes.length;
		for (let i = 0; i < numofNotes; i++) {
			addNote();
		}
	}
}
function getColorsFromLocalstorage() {
	let allColors = localStorage.getItem("all-colors") || [];
	if (allColors.length) {
		allColors = allColors.split(",");
		return allColors;
	}
}
function getTextsFromLocalstorage() {
	let allTexts = localStorage.getItem("all-texts") || [];
	if (allTexts.length) allTexts = allTexts.split(",");
	return allTexts;
}

function deleteSapn(index) {
	let allNotes = JSON.parse(localStorage.getItem("all-notes")) || [];
	allNotes.splice(index - 1, 1);
	localStorage.setItem("all-notes", JSON.stringify(allNotes));

	let allColors = localStorage.getItem("all-colors") || [];
	if (allColors.length) {
		allColors = allColors.split(",");
	}
	allColors.splice(index - 1, 1);
	localStorage.setItem("all-colors", allColors);

	let allTexts = localStorage.getItem("all-texts") || [];
	if (allTexts.length) allTexts = allTexts.split(",");
	allTexts.splice(index - 1, 1);
	localStorage.setItem("all-texts", allTexts);
	location.reload();
}

function createDivsOfCategories() {
	for (let i = 0; i < uniquearrayOfColors.length; i++) {
		let div = document.createElement("div");
		div.classList.add(`cat-${i + 1}`);

		let noteSpan = document.createElement("span");
		noteSpan.className = "note";
		noteSpan.style.backgroundColor = uniquearrayOfColors[uniquearrayOfColors.length - 1 - i];

		let countSpan = document.createElement("span");
		countSpan.className = "count";
		countSpan.innerHTML = 1;

		div.append(noteSpan);
		div.append(countSpan);
		divCat.append(div);
	}
}

function countNameOccurrences(namesArray) {
    const nameCounts = {};

    for (const name of namesArray) {
        nameCounts[name] = (nameCounts[name] || 0) + 1;
    }

    return nameCounts;
}

const nameOccurrences = countNameOccurrences(arrayOfColors);

filterColorsOnCategories(nameOccurrences);

function filterColorsOnCategories(nameOccurrences) {
	let spans = document.querySelectorAll(".cat div");
	for (let i = 0; i < spans.length; i++) {
		for (let j = 0; j < spans.length; j++) {
			if (rgbToHex(spans[i].children[0].style.backgroundColor) === Object.keys(nameOccurrences)[j]) {
				spans[i].children[1].innerHTML = `${Object.values(nameOccurrences)[j]}`;
			}
		}
	}
}

//  localStorage.clear();
