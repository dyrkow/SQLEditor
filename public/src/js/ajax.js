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
		// url:'/Search',
		url:config.search.url,
		method:'GET',
		// data:{COMENT:data},
		data:{COMENT:data,TYPE:'Search'},
		dataType:'json',
		cache:false
	})
	.done(function(data){
		spin.stop();
		search.renderItems(data);
	})
	.fail(function(err){
		spin.stop();
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
		// url:'/GetQuery',
		url:config.get.url,
		method:'GET',
		// data:{ID:data},
		data:{ID:data,TYPE:'GetQuery'},
		dataType:'json',
		cache:false,
	})
	.done(function(data){
		router.emit('id',data.ID,function(){query.render(data);});
	})
	.fail(function(err){
		popup.create({
			type:'error',
			header:'Ошибка!',
			content:'На сервере произошла ошибка. Попробуйте ещё раз.',
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

	$.ajax({//todo post
		// url:'/TestQuery',
		url:config.test.url,
		method:'POST',
		// data:{ID:data.id,QUERYSTRING:data.query,PARAMS:data.params},
		data:{ID:data.id,QUERY:data.query,PARAMS:data.params,TYPE:'TestQuery'},
		dataType:'json',
		cache:false,
	})
	.done(function(an){
		if(an.result){
			spin.stop('block');
			query.log(an.data);
			query.trigger(true);
			select.set(true);
		}else{
			spin.stop('block');
			query.log(an.error);
			query.trigger(false);
		}
	})
	.fail(function(err){
		spin.stop('block');
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

	$.ajax({//todo post
		// url:'/SaveQuery',
		url:config.save.url,
		method:'POST',
		// data:{ID:data.id,QUERYSTRING:data.query},
		data:{ID:data.id,QUERYSTRING:data.query,TYPE:'SaveQuery'},
		dataType:'json',
		cache:false
	})
	.done(function(data){
		if(data.result){
			spin.stop('block');
			popup.create({
				type:'success',
				header:'Сохранено!',
				content:'Изменения были сохранены в базу данных.',
			});
		}else{
			spin.stop('block');
			popup.create({
				type:'error',
				header:'Не сохранено!',
				content:'Данные не были сохранены, попробуйте ещё раз.'
			});
		}
	})
	.fail(function(err){
		spin.stop();
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