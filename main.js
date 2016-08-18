/**
* @Phrase Editor
* @author: Igor Ahabanin (kir3kin@gmail.com)
* @version: 1.0
*/
var editor = document.getElementById('editor');//			editor's body
PhraseEditor(editor);//																Initializing pharse editor
// var anchor = new PhraseEditor(editor);//							for monitoring panel

function PhraseEditor(editor) {
	var self = this;

	//=== editor field ===//
	this.mainField = document.getElementById('edit-field');
	if (!self.mainField) console.error("Main field for Editor is unavailable");

	this.historyActivity = [];
	this.globalIndex = -1;

	//=== service functions ===//
	this.setIndex = function() {
		var index;
		if (self.globalIndex < 0) index = self.historyActivity.length;
		else index = ++self.globalIndex;
		return index;
	};

	this.setHistory = function(value, index) {
		if (self.historyActivity[index - 1] === value) return;
		if (self.historyActivity[index] === value) return;
		self.historyActivity.splice(index, 0, value);
	};

	this.getSave = function() {
		var index = self.setIndex();
		self.setHistory(self.mainField.value, index);
	};

	//======================//
	//=== Edit functions ===//
	//======================//
	// common function
	//================
	this.getUpperCase = function() {
		self.mainField.value = self.mainField.value.replace(/.+/gim, function(match) {
			return match.toUpperCase();
		});
	};

	this.getLowerCase = function() {
		self.mainField.value = self.mainField.value.replace(/.+/gim, function(match) {
			return match.toLowerCase();
		});
	};

	this.getCapitalize = function() {
		editText = self.mainField.value.toLowerCase();
		self.mainField.value = editText.replace(/[^a-zа-я][а-яa-z]|^[a-zа-я]/gim, function(match) {
			return match.toUpperCase();
		});
	};

	this.getCapitalizeFirst = function() {
		editText = self.mainField.value.toLowerCase();
		self.mainField.value = editText.replace(/^[^a-zа-я]*[a-zа-я]/gm, function(match) {
			return match.toUpperCase();
		});
	};

	this.getRefreshHistory = function() {
		self.historyActivity = [];
		self.globalIndex = -1;
		self.getSave();
	}

	// add edit functions
	this.getAddPlus = function() {
		self.mainField.value = self.mainField.value.replace(/[а-яa-z]+/gim, function(match) {
			return "+" + match;
		});
	};

	this.getDelPlus = function() {
		self.mainField.value = self.mainField.value.replace(/\+[а-яa-z]+/gim, function(match) {
			return match.slice(1);
		});
	};

	this.getAddQuot = function() {
		self.mainField.value = self.mainField.value.replace(/^[\["-]*([a-zа-я\d\s.,]+?["-\[\]]*?[a-zа-я\d\s.,]+?)[\]\n"-]*$/gim, "\"$1\"");
	};

	this.getAddBrackets = function() {
		self.mainField.value = self.mainField.value.replace(/^[\["-]*([a-zа-я\d\s.,]+?["-\[\]]*?[a-zа-я\d\s.,]+?)[\]\n"-]*$/gim, "[$1]");
	};

	this.getAddDash = function() {
		self.mainField.value = self.mainField.value.replace(/^[\["-]*([a-zа-я\d\s.,]+?["-\[\]]*?[a-zа-я\d\s.,]+?)[\]\n"-]*$/gim, "-$1");
	};

	this.getAddDashQuot = function() {
		self.mainField.value = self.mainField.value.replace(/^[\["-]*([a-zа-я\d\s.,]+?["-\[\]]*?[a-zа-я\d\s.,]+?)[\]\n"-]*$/gim, "-\"$1\"");
	};

	this.getAddDashBrackets = function() {
		self.mainField.value = self.mainField.value.replace(/^[\["-]*([a-zа-я\d\s.,]+?["-\[\]]*?[a-zа-я\d\s.,]+?)[\]\n"-]*$/gim, "-[$1]");
	};

	this.getDelSpaces = function() {
		var intermediateText = self.mainField.value.replace(/^ +| +$/gm, "");
		self.mainField.value = intermediateText.replace(/ +/gm, " ");
	};

	this.getDelTabs = function() {
		self.mainField.value = self.mainField.value.replace(/\t/gm, "");
	};

	this.getDelSpaceDash = function() {
		self.mainField.value = self.mainField.value.replace(/ -.*/gm, "");
	};

	this.getReplaceSpace = function() {
		self.mainField.value = self.mainField.value.replace(/ /gm, "_");
	};

	this.getDelSpecial = function() {
		self.mainField.value = self.mainField.value.replace(/[\(\)`~!@#\$%\^&\*_=\+\[\]\{\}\|;':",\/<>\?\\]/gm, "");
	};

	this.getReplaceSpecial = function() {
		self.mainField.value = self.mainField.value.replace(/[\(\)`~!@#\$%\^&\*_=\+\[\]\{\}\|;':",\/<>\?\\]/gm, " ");
	};

	this.setDelEmptyLine = function(interM) {
		for (var i = interM.length; i >= 0; i--) {
			if (!interM[i]) interM.splice(i, 1);
		}
		return interM;
	}

	this.getSort = function() {
		var interM = self.mainField.value.split("\n");
		self.setDelEmptyLine(interM);
		self.mainField.value = interM.sort().join("\n");
	};

	this.getReverseSort = function() {
		var interM = self.mainField.value.split("\n");
		self.setDelEmptyLine(interM);
		self.mainField.value = interM.sort(function(a, b) {
			if (a < b) return 1;
			if (a > b) return -1;
			if (a = b) return 0;
		}).join("\n")
	};

	this.getDelDuplicate = function() {
		var obj = {};
		var interM = self.mainField.value.split("\n");
		self.setDelEmptyLine(interM);
		for (var i = 0; i < interM.length; i++) {
			var str = interM[i];
			obj[str] = true;
		}
		self.mainField.value = Object.keys(obj).join("\n");
	};

	this.getClear = function() {
		self.mainField.value = "";
	};

	this.getCopy = function() {
		self.mainField.focus();
		self.mainField.setSelectionRange(0, self.mainField.value.length);
		var success = document.execCommand('copy');
		if (!success) console.error('don\'t copy');
	};

	this.getFindReplace = function() {
		var elem = document.getElementById('find').value;
		if(!elem) return;
		var sensetive = document.getElementById('case-sensative').checked;
		var pattern = new RegExp(elem, (sensetive)? 'gm' : 'gim');
		var value = document.getElementById('replace').value || "";
		self.mainField.value = self.mainField.value.replace(pattern, value);
	};

	this.getUndo = function() {
		if (self.globalIndex === -1) {
			if ((self.historyActivity.length - 1) === 0) return;
			self.globalIndex = self.historyActivity.length - 1;
		}
		if (self.globalIndex <= 0) return;
		self.globalIndex--;
		if (self.mainField.value === self.historyActivity[self.globalIndex]) return;
		self.mainField.value = self.historyActivity[self.globalIndex];
	};

	this.getRedo = function() {
		if (self.globalIndex === -1) return;
		if (self.globalIndex === self.historyActivity.length - 1) return;
		self.globalIndex++;
		self.mainField.value = self.historyActivity[self.globalIndex];
	};

	// initial preparation
	self.mainField.addEventListener("change", self.getSave);
	if (self.mainField.value) self.getSave();

	// deligation event
	editor.onclick = function(e) {
		var target = e.target;
		var action = target.getAttribute('data-action');
		if (target.getAttribute('data-info') !== "no-save") if (!self.mainField.value) return;
		if (action) {
			// console.time("action");// время перестановки с сохранением
			// console.time("without save");// время перестановки без сохранения
			self["get" + action]();
			// console.timeEnd("without save");
			if (target.getAttribute('data-info') !== "no-save") self.getSave();
			// console.timeEnd("action");
		}
	};
}

//==== Monitoring panel ====//
// document.getElementById('history').onclick = function() {
// 	console.warn(anchor.historyActivity);
// };
// document.getElementById('history-count').onclick = function() {
// 	console.warn("Всего элементов истории: " + anchor.historyActivity.length);
// };
// document.getElementById('count').onclick = function() {
// 	console.warn("Всего редактируемых строк: " + anchor.mainField.value.split("\n").length);
// };
// document.getElementById('global-index').onclick = function() {
// 	console.warn("Индекс истории: " + anchor.globalIndex);
// };
//=== /Monitoring panel/ ===//