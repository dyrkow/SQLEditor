var App        = require('./App.js'),
		editor     = require('./ace.js'),
		query      = require('./query.js'),
		ajax       = require('./ajax.js'),
		spin       = require('./loader.js'),
		router     = require('./router.js'),
		popup      = require('./pop-up.js'),
		datepicker = require('./datepicker.js'),
		select     = require('./select.js'),

		Page = {
			Type:null,
			SaveBtn : $('#query-save-btn'),
			TestBtn : $('#query-run-btn'),
			Parameters:[],
			initParam:eachParam,
			getParam:getParameter,
			ParamPanel:$('.parameters-panel'),
			TestCont:$('.run-view'),
		},



		// global loader page variable
		loaderWall = $('.loader-wall'),

		// save status
		trigger    = true,

		loader     = $('.js-loader-page'),
		interval   = 0;


function getParameter(name){

	/*
		@name - string

		? есть ли такой параметр

		Получает параметр страницы
	*/

	for(var i=0,l = Page.Parameters.length; i<l;i++){
		var cash =Page.Parameters[i][name];
	
		if(cash){
			return cash;
		}else{
			continue;
		}
	}

	return null;
}

function eachParam(){

	/*

		Инициализирует параметры новыми значениями связанных с ними dom элиментов
	*/

	for(var i=0,l = Page.Parameters.length; i<l;i++){
		var cash =Page.Parameters[i];
		for(var el in cash){
			cash[el] = cash.link.val();
			break;
		}
		
	}
}



function initialize(){

	/*
		
		Инициализация событий, переменных
	*/

	var firstid = router.get('id');

	// first load
	if(firstid){
		query.initLoad();
		ajax.load(firstid);
	}

	// save
	Page.SaveBtn.click(function(e){
		e.preventDefault();

		if(trigger){
			var value = editor.getText(App.editor),
					id    = router.get('id');

			spin.start($(this),'block');

			ajax.save({ID:id,COMENT:value});
		}else{
			popup.create({
				type:'error',
				header:'Ошибка!',
				content:'Вы не можите сохранять не исправный запрос.'
			});
		}
	});

	// test
	Page.TestBtn.click(function(e){
		e.preventDefault();

		var string = editor.getText(App.editor),
				globId = router.get('id');

		spin.start($(this),'block');
		console.log('d');
		Page.initParam();
		console.log('d');

		ajax.run({
			id:globId,
			query:string,
			start_time:Page.getParam('start_time'),
			stop_time:Page.getParam('stop_time')
		});

	});
}

// target status
function targetTar(val){

	/*
		
		Переключает возможность сохранения запроса
	*/

	trigger = val;
}

// render page
function renderQueryPage(data){
	var title = $('.js-title-query'),
			obj   = $('.js-obj-query');

	title.text(data.COMENT);
	obj.text(' d ');
	editor.setText(App.editor,data.QUERYSTRING);
	Page.TestCont.html('');
	Page.ParamPanel.html('');
	trigger=true;
	select.set(false);

	// params
	switch(data.TYPE){
		case 1:
			datepicker.create([createParam('start_time'),createParam('stop_time')]);
			Page.Type=1;
		break;
		case 2:
			datepicker.create([createParam('start_time'),createParam('stop_time')]);
			Page.Type=2;
		break;
		case 3:
			//nothing
			Page.Type=3;
		break;
		case 4:
			datepicker.create([createParam('start_time')]);
			Page.Type=4;
		break;
	}

	query.stopLoad();


	function createParam(name){

		/*
			@name - strign (название параметра)

			? - $
	
			Создаёт параметр привязанный к старнице
		*/

		var id = 'param-control-'+name,
				resString = '<div class="input-group"><input type="text" class="form-control" id="'+id+'"/><label for="'+id+'" class="input-group-addon">'+name+'</label></div>',
				el;

		Page.ParamPanel.append(resString);
		el = $('#'+id);

		Page.Parameters.push(createParamObj(name));

		function createParamObj(name){

			/*
				@name - string

				Создаёт объект параметра с динамическим именем свойства параметра
			*/

			var result = {};

			result[name] = el.val();
			result.link = el;
			return result;
		}

		return el;
	}



}

// loader
function initLoaded(){

	/*
		Инициализирует лоадер страницы
	*/

	loader.css({width:'100px',display:'block'});
	loaderWall.addClass('show');
	interval = setTimeout(function tick(){
		loader.css({width:(loader.width()+10)+''});
		interval =setTimeout(tick,800);
	},800);
}

function stopLoaded(){

	/*
		Заканчивает загрузку страницы (анимацию)
	*/

	clearTimeout(interval);
	loaderWall.removeClass('show');
	loader.css({width:'100%'});
	setTimeout(function(){
		loader.css({display:'none'});
	},400);
}


//render results
function renderResultQuery(data){
	Page.TestCont.children('*').remove();

	if(typeof data == 'string'){
		//err
		Page.TestCont.append('<div class="error">'+data+'</div>');
	}else{
		//obj
		var string = '<table class="result-table-view">',
				dateRegexp = new RegExp('Date[(][0-9]+[)]','g');

		for(var i =0, l = data.length; i<l; i++){
			//строка
			string+='<tr>';
			for(var k =0, lk = data[i].length; k<lk;k++){
				//столбцы
				var cellval=data[i][k],
						execval = dateRegexp.exec(cellval);

				if(execval!==null){
					console.log('start');
					//дата
					var date = new Function('return new '+execval)(),
							day=date.getDate(),
							month=date.getMonth()+1,
							year=date.getFullYear();

					string+='<td class="js-date">'+(day<10?'0'+day:day)+'.'+(month<10? '0'+month:month)+'.'+year+'</td>';

					continue;
				}

				string+='<td>'+cellval+'</td>';
			}
			string+='</tr>';
		}

		Page.TestCont.append(string);
	}
}

module.exports.render   = renderQueryPage;
module.exports.initLoad = initLoaded;
module.exports.stopLoad = stopLoaded;
module.exports.init     = initialize;
module.exports.log      = renderResultQuery;
module.exports.trigger  = targetTar;

