function editorInitConfig(el,settings){

	/*
		@el - selector
		@settings - object
		@settings.theme - string
		@settings.mode - string

		? - экземпляр этого редактора

		Создаёт на странице новый редактор ace
	*/

	var editor = window.ace.edit(el);


	if(settings){
		editor.setTheme(settings.theme);
		editor.getSession().setMode(settings.mode);
	}else{
		editor.setTheme('ace/theme/clouds');
		editor.getSession().setMode('ace/mode/sql');
	}


	return editor;
}

function setTextEd(ed,val){

	/*
		@ed - editor
		@val - string

		Установливает указанному редактору значение
	*/
	ed.setValue(val);
}

function getTextEd(ed,val){

	/*
		@ed - editor
		@val - string

		Получает значение указанного редактора
	*/
	return ed.getValue();
}

module.exports.setText = setTextEd;
module.exports.getText = getTextEd;
module.exports.create  = editorInitConfig;