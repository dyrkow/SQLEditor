var search  = require('./search.js'),
		query   = require('./query.js'),
		popup   = require('./pop-up.js'),
		spin    = require('./loader.js'),
		select  = require('./select.js'),
		config  = require('../config.js'),
		router  = require('./router.js');

function searchItems(data){

	/*
		@data string (Наименование запроса )

		--data - json [{ID:'',COMENT:''},{},...]

		Выполняет поиск в бд совпадающих с заданным значением результатов
	*/

	$.ajax({
		url:config.search.url,
		method:'GET',
		// data:{COMENT:data},
		data:{COMENT:data,TYPE:'Search'},
		dataType:'json',
		cache:false
	})
	.done(function(data){

		search.renderItems(data);
		spin.stop('input_loader');
	})
	.fail(function(err){
		spin.stop('input_loader');
		popup.create({
			type:'error',
			header:'Ошибка!',
			content:'На сервере произошла ошибка. Попробуйте ещё раз.',
		});
	});
}

function getQuery(data){

	/*
		@data - number (идентификатор необходимого запроса)

		--data - json

		Выполняет запрос к бд чтобы отобразить всю информацию о редактируемом запросе(запрашиваемом)
	*/

	$.ajax({
		url:config.get.url,
		method:'GET',
		// data:{ID:data},
		data:{ID:data,TYPE:'GetQuery'},
		dataType:'json',
		cache:false,
	})
	.done(function(data){

		if(data.result===false){
			popup.create({
				type:'error',
				header:'Ошибка',
				content:'Не удалось загрузить данный запрос.'
			});
			query.stopLoad();
			return;
		}

		router.emit('id',data.ID,function(){query.render(data);});
		query.Page.LOAD_PAGE=true;
	})
	.fail(function(err){
		query.stopLoad();
		query.Page.LOAD_PAGE=false;
		popup.create({
			type:'error',
			header:'Ошибка!',
			content:'Не удалось загрузить данный запрос.',
		});
	});
}

function runQuery(data){

	/*
		@data.id - number (идентификатор запроса)
		@data.query - sting (сам sql текст)

		--data - json

		Выполняет запрос к бд чтобы выполнить его
	*/

	$.ajax({
		url:config.test.url,
		method:'POST',
		// data:{ID:data.id,QUERYSTRING:data.query,PARAMS:data.params},
		data:{ID:data.id,QUERY:data.query,PARAMS:data.params,TYPE:'TestQuery'},
		dataType:'json',
		cache:false,
	})
	.done(function(an){
		if(an.result){
			spin.stop('test_loader');
			query.log(an.data);
			query.trigger(true);
			select.set(true);
		}else{
			spin.stop('test_loader');
			query.log(an.error);
			query.trigger(false);
		}
	})
	.fail(function(err){
		spin.stop('test_loader');
		popup.create({
			type:'error',
			header:'Ошибка!',
			content:'На сервере произошла ошибка. Попробуйте ещё раз.',
		});
	});
}

function setQuery(data){

	/*
		@data.id - number (идентификатор)
		@data.jquery - string (текст запроса)

		--data -json 

		Выполняет запрос чтобы сохранить изменённый запрос
	*/

	$.ajax({
		url:config.save.url,
		method:'POST',
		// data:{ID:data.id,QUERYSTRING:data.query},
		data:{ID:data.id,QUERYSTRING:data.query,TYPE:'SaveQuery'},
		dataType:'json',
		cache:false
	})
	.done(function(data){
		if(data.result){
			spin.stop('save_loader');
			popup.create({
				type:'success',
				header:'Сохранено!',
				content:'Изменения были сохранены в базу данных.',
			});
		}else{
			spin.stop('save_loader');
			popup.create({
				type:'error',
				header:'Не сохранено!',
				content:'Данные не были сохранены, попробуйте ещё раз.'
			});
		}
	})
	.fail(function(err){
		spin.stop('save_loader');
		popup.create({
			type:'error',
			header:'Ошибка!',
			content:'На сервере произошла ошибка. Попробуйте ещё раз.',
		});
	});

}

module.exports.search = searchItems;
module.exports.load   = getQuery;
module.exports.run    = runQuery;
module.exports.save   = setQuery;