var ajax        = require('./ajax.js'),
		query       = require('./query.js'),
		spin        = require('./loader.js');

var mainBox     = $('.search-fild'),
		fild        = mainBox.children('.main-search'),
		result      = mainBox.children('.result-search'),
		sbtn        = mainBox.children('.input-group-btn').children('button'),
		black       = mainBox.children('.black'),
		body        = $('body'),

		// search variables
		timeoutFild = 600,
		timeoutBtn  = 400;

function initialize(){

	/*

		Инициализирует модуль поиска
	*/

	// loaders
	spin.create({name:'input_loader',el:fild,mode:false});
	spin.create({name:'input_',el:fild,mode:false});

	// input
	fild.keyup(function(e){
		var value = $(this).val();
		result.html('');

		if(value.length>=3){

			delaySearch(function(){
				spin.start('input_loader');
				ajax.search(fild.val());
			},timeoutFild);
		}

	});

	fild.focus(function search(e){
		result.html('');

		if(!mainBox.hasClass('shower')){
			mainBox.addClass('shower');
			body.addClass('overflow');
		}

	});


	// button
	sbtn.click(function(e){
		e.preventDefault();

		var value = fild.val();

		result.html('');

		if(value.length>=3){
			delaySearch(function(){
				spin.start('input_loader');
				ajax.search(fild.val());
			},timeoutBtn);
		}

	});

	sbtn.focus(function(){
		if(!mainBox.hasClass('shower')){
			mainBox.addClass('shower');
			body.addClass('overflow');
		}
	});


	// items
	result.click(function(e){
		var self = $(e.target);

		if(self.hasClass('non')){
			return;
		}

		disSearch();
		query.initLoad();
		ajax.load(self.attr('data-query-id'));

	});


	// black
	black.click(function(){
		disSearch();
	});

	var delaySearch = (function(){
		var currentTime = 0;

		return function(callback, ms){
			clearTimeout (currentTime);
			currentTime = setTimeout(callback, ms);
		};
	})();
}

function disSearch(){

	/*
	
		Скрывает тёмный фон у поиска
	*/

	mainBox.removeClass('shower');
	body.removeClass('overflow');
	result.html('');
}

function renderResultItems(data){

	/*
		@data - [] (Полученные данные ajax.search)

		Рендерит найденные данные
	*/

	if(data.length<1){
		result.append('<div class="non">По данному запросу нету данных</div>');
		return;
	}

	for(var i = 0, l = data.length; i<l;i++){
		result.append('<div class="result-item" data-query-id="'+data[i].ID+'"> '+data[i].COMENT+' </div>');
	}

}

module.exports.init        = initialize;
module.exports.renderItems = renderResultItems;