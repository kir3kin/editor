/**
* @Phrathes editor
* @author: Igor Ahabanin (kir3kin@gmail.com)
* @version: 1.0
*/
var mainField = document.getElementById('edit-field');
if (!mainField) console.error("Main field for Editor is unavailable");
mainField.addEventListener("change", getSave);

var originalText;
var postEditText;
var historyActivity = [];
var globalIndex = -1;


if (mainField.value) {
	originalText = mainField.value;
	getSave();
} else {
	originalText = "";
}



// editor
var editor = document.getElementById('editor');

// editor.addEventListener("click", delegationEvent);





function delegationEvent() {

}

// controls button
var controlsButton = {
	Original: editor.getElementsByClassName('original-but')[0],
	Clear: editor.getElementsByClassName('clear-but')[0],
	Copy: editor.getElementsByClassName('copy-but')[0],
	FindReplace: editor.getElementsByClassName('find-replace-but')[0],
	Undo: editor.getElementsByClassName('undo-but')[0],
	Redo: editor.getElementsByClassName('redo-but')[0],

	UpperCase: editor.getElementsByClassName('upper-but')[0],
	LowerCase: editor.getElementsByClassName('lower-but')[0],
	Capitalize: editor.getElementsByClassName('capit-but')[0],
	CapitalizeFirst: editor.getElementsByClassName('capit-first-but')[0],
	AddPlus: editor.getElementsByClassName("add-plus-but")[0],
	DelPlus: editor.getElementsByClassName("del-plus-but")[0],
	AddQuot: editor.getElementsByClassName("add-quot-but")[0],
	AddBrackets: editor.getElementsByClassName("add-brackets-but")[0],
	AddDash: editor.getElementsByClassName("add-dash-but")[0],
	AddDashQuot: editor.getElementsByClassName("add-dash-quot-but")[0],
	AddDashBrackets: editor.getElementsByClassName("add-dash-brackets-but")[0],

	DelSpaces: editor.getElementsByClassName("del-spaces-but")[0],
	DelTabs: editor.getElementsByClassName("del-tabs-but")[0],
	DelSpaceDash: editor.getElementsByClassName("del-space-dash-but")[0],
	ReplaceSpace: editor.getElementsByClassName("replace-space-but")[0],
	DelSpecial: editor.getElementsByClassName("del-special-but")[0],
	ReplaceSpecial: editor.getElementsByClassName("replace-special-but")[0],


	Sort: editor.getElementsByClassName("sort-but")[0],
	ReverseSort: editor.getElementsByClassName("reverse-sort-but")[0],
	DelDuplicate: editor.getElementsByClassName("del-duplicate-but")[0],
};

// controlsButton.Original.addEventListener("click", getOriginal);
// controlsButton.Clear.addEventListener("click", getClear);
// controlsButton.Copy.addEventListener("click", getCopy);
// controlsButton.FindReplace.addEventListener("click", getFindReplace);
// controlsButton.Undo.addEventListener("click", getUndo);//заменить на делегирование
// controlsButton.Redo.addEventListener("click", getRedo);//заменить на делегирование

// controlsButton.UpperCase.addEventListener("click", getUpperCase);
// controlsButton.LowerCase.addEventListener("click", getLowerCase);
// controlsButton.Capitalize.addEventListener("click", getCapitalize);
// controlsButton.CapitalizeFirst.addEventListener("click", getCapitalizeFirst);
// controlsButton.AddPlus.addEventListener("click", getAddPlus);
// controlsButton.DelPlus.addEventListener("click", getDelPlus);
// controlsButton.AddQuot.addEventListener("click", getAddQuot);
// controlsButton.AddBrackets.addEventListener("click", getAddBrackets);
// controlsButton.AddDash.addEventListener("click", getAddDash);
// controlsButton.AddDashQuot.addEventListener("click", getAddDashQuot);
// controlsButton.AddDashBrackets.addEventListener("click", getAddDashBrackets);

// controlsButton.DelSpaces.addEventListener("click", getDelSpaces);
// controlsButton.DelTabs.addEventListener("click", getDelTabs);
// controlsButton.DelSpaceDash.addEventListener("click", getDelSpaceDash);
// controlsButton.ReplaceSpace.addEventListener("click", getReplaceSpace);
// controlsButton.DelSpecial.addEventListener("click", getDelSpecial);
// controlsButton.ReplaceSpecial.addEventListener("click", getReplaceSpecial);

// controlsButton.Sort.addEventListener("click", getSort);
// controlsButton.ReverseSort.addEventListener("click", getReverseSort);
// controlsButton.DelDuplicate.addEventListener("click", getDelDuplicate);

function setIndex() {
	var index;
	if (globalIndex < 0) {
		index = historyActivity.length;
	} else {
		index = ++globalIndex;
	}
	return index;
}

function setHistory(value, index) {
	if (historyActivity[index - 1] === value) return;
	if (historyActivity[index] === value) return;
	historyActivity.splice(index, 0, value);
}

// edit functions
function getOriginal() {
	mainField.value = originalText;
}

function getUpperCase() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gim, function(match) {
		return match.toUpperCase();
	});
	setHistory(mainField.value, index);
}

function getLowerCase() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gim, function(match) {
		return match.toLowerCase();
	});
	setHistory(mainField.value, index);
}

function getCapitalize() {
	if (!originalText) return;
	var index = setIndex();
	editText = originalText.toLowerCase();
	mainField.value = editText.replace(/[^a-zа-я][а-яa-z]|^[a-zа-я]/gim, function(match) {
		return match.toUpperCase();
	});
	setHistory(mainField.value, index);
}

function getCapitalizeFirst() {
	if (!originalText) return;
	var index = setIndex();
	editText = originalText.toLowerCase();
	mainField.value = editText.replace(/^[^a-zа-я]*[a-zа-я]/gm, function(match) {
		return match.toUpperCase();
	});
	setHistory(mainField.value, index);
}

// add edit functions
function getAddPlus() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/[а-яa-z]+/gim, function(match) {
		return "+" + match;
	});
	setHistory(mainField.value, index);
}

function getDelPlus() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/\+[а-яa-z]+/gim, function(match) {
		return match.slice(1);
	});
	setHistory(mainField.value, index);
}

function getAddQuot() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gm, function(match) {
		return "\"" + match + "\"";
	});
	setHistory(mainField.value, index);
}

function getAddBrackets() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gm, function(match) {
		return "[" + match + "]";
	});
	setHistory(mainField.value, index);
}

function getAddDash() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gm, function(match) {
		return "-" + match;
	});
	setHistory(mainField.value, index);
}

function getAddDashQuot() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gm, function(match) {
		return "-\"" + match + "\"";
	});
	setHistory(mainField.value, index);
}

function getAddDashBrackets() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/.+/gm, function(match) {
		return "-[" + match + "]";
	});
	setHistory(mainField.value, index);
}

function getDelSpaces() {
	if (!originalText) return;
	var index = setIndex();
	var intermediateText = originalText.replace(/^ +| +$/gm, "");
	mainField.value = intermediateText.replace(/ +/gm, " ");
	setHistory(mainField.value, index);
}

function getDelTabs() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/\t/gm, "");
	setHistory(mainField.value, index);
}

function getDelSpaceDash() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/ -.*/gm, "");
	setHistory(mainField.value, index);
}

function getReplaceSpace() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/ /gm, "_");
	setHistory(mainField.value, index);
}


function getDelSpecial() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/[\(\)`~!@#\$%\^&\*_=\+\[\]\{\}\|;':",\/<>\?\\]/gm, "");
	setHistory(mainField.value, index);
}


function getReplaceSpecial() {
	if (!originalText) return;
	var index = setIndex();
	mainField.value = originalText.replace(/[\(\)`~!@#\$%\^&\*_=\+\[\]\{\}\|;':",\/<>\?\\]/gm, " ");
	setHistory(mainField.value, index);
}

function getSort() {
	if (!originalText) return;
	var index = setIndex();
	var interM = originalText.split("\n");
	for (var i = interM.length; i >= 0; i--) {
		if (!interM[i]) interM.splice(i, 1);
	}
	mainField.value = interM.sort().join("\n");
	setHistory(mainField.value, index);
}

function getReverseSort() {
	if (!originalText) return;
	var index = setIndex();
	var interM = originalText.split("\n");
	for (var i = interM.length; i >= 0; i--) {
		if (!interM[i]) interM.splice(i, 1);
	}

	mainField.value = interM.sort(function(a, b) {
		if (a < b) return 1;
		if (a > b) return -1;
		if (a = b) return 0;
	}).join("\n")
	setHistory(mainField.value, index);
}

function getDelDuplicate() {
	if (!originalText) return;
	var index = setIndex();
	var interM = originalText.split("\n");
	for (var i = interM.length; i >= 0; i--) {
		if (!interM[i]) interM.splice(i, 1);
	}

	// var n = interM.length, B = [];
	// for (var i = 1, j = 0, t; i < n+1; i++) {
	// 	if (interM[i - 1] === interM[i]) t = interM[i-1];
	// 	if (interM[i-1] !== t) B[j++] = interM[i-1];
	// }
	// mainField.value = B.join("\n");

	var obj = {};
	for (var i = 0; i < interM.length; i++) {
		var str = interM[i];
		obj[str] = true;
	}
	B = Object.keys(obj);

	mainField.value = B.join("\n");
	setHistory(mainField.value, index);
}

function getClear() {
	mainField.value = "";
}

function getCopy() {
	mainField.focus();
	mainField.setSelectionRange(0, mainField.value.length);
	var success = document.execCommand('copy');
	if (!success) console.error('don\'t copy');
}

function getFindReplace() {
	if (!originalText) return;
	var elem = document.getElementById('find').value;
	if(!elem) return;
	var index = setIndex();
	var sensetive = document.getElementById('case-sensive').checked;
	var pattern = new RegExp(elem, (sensetive)? 'gm' : 'gim');
	var value = document.getElementById('replace').value || "";
	mainField.value = originalText.replace(pattern, value);
	setHistory(mainField.value, index);
}

function getUndo() {
	if (globalIndex === -1) {
		if ((historyActivity.length - 1) === 0) return;
		globalIndex = historyActivity.length - 1;
	}
	if (globalIndex <= 0) return;
	globalIndex--;
	if (mainField.value === historyActivity[globalIndex]) return;
	mainField.value = historyActivity[globalIndex];
}

function getRedo() {
	if (globalIndex === -1) return;
	if (globalIndex === historyActivity.length - 1) return;
	globalIndex++;
	mainField.value = historyActivity[globalIndex];
}


function getSave() {
	var index = setIndex();
	originalText = mainField.value;
	setHistory(mainField.value, index);
}