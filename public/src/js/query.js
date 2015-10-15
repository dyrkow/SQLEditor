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
			LOAD_PAGE:false,// индикатор рагрузки страницы(false-приложение пустое)
			SaveBtn : $('#query-save-btn'),
			TestBtn : $('#query-run-btn'),
			PForm: $('#param-form'),
			Parameters:[],
			initParam:eachParam,
			getParam:getParameter,
			ParamPanel:$('.parameters-panel'),
			TestCont:$('.run-view'),
			InfoPanel:$('.q-info-panel')
		},

		// save status (устанавливается в зависимости от выполнения запроса)
		trigger    = true,

		//loader page
		loader     = $('.js-loader-page'),
		loaderWall = $('.loader-wall'),
		interval   = 0;



function initialize(){

	/*
		
		Инициализация событий, переменных
	*/

	var firstid = router.get('id');

	// loaders
	spin.create({name:'save_loader',el:Page.SaveBtn,mode:true,block:[Page.TestBtn]});
	spin.create({name:'test_loader',el:Page.TestBtn,mode:true,block:[Page.SaveBtn]});

	// first load
	if(firstid!==null){
		query.initLoad();
		ajax.load(firstid);
	}

	//form
	Page.PForm.bind('submit',function(e,mode){
		e.preventDefault();
		if(mode==='save'){
			if(trigger){
				var value = editor.getText(App.editor),
						id = $('input[name=id]').val(),
						data = {};

				spin.start('save_loader');

				data.id=id;
				data.query = value;
				data.type='SaveQuery';

				console.log(data);

				ajax.save(data);
			}else{
				popup.create({
					type:'error',
					header:'Ошибка!',
					content:'Вы не можите сохранять не исправный запрос.'
				});
			}

		}else{
			if(mode==='test'){
				var string = editor.getText(App.editor),
						data = Page.PForm.serializeJSON();
						data.type='TestQuery';

				spin.start('test_loader');

				data.query = string;

				ajax.run(data);

			}else{
				return false;
			}
		}
		
	});

	// save
	Page.SaveBtn.click(function(e){
		e.preventDefault();

		if(!Page.LOAD_PAGE){
			// если запрос не загружен на страницу то нельзя сохранять
			return false;
		}

		Page.PForm.trigger('submit',['save']);

	});

	// test
	Page.TestBtn.click(testQuery);

	function testQuery(e){
		e.preventDefault();

		if(!Page.LOAD_PAGE){
			//если не был загружен запрос на страницу
			return false;
		}

		Page.PForm.trigger('submit',['test']);

	}
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
	var title  = $('.js-title-jquery'),
			infoP  = $('#info-person'),
			infoDb = $('#info-bdlink'),
			infoS  = $('#info-sourse'),
			infoSt = $('#info-status');

			console.log(Page.InfoPanel);

	Page.InfoPanel.children('span').children('small').text('');

	title.text(data.COMENT);

	if(data.DELETE_FLAG===undefined||data.DELETE_FLAG==null){
		infoSt.append('<em>Отсутствует<em>');
	}else{
		if(data.DELETE_FLAG===0){
			infoSt.addClass('bg-info ');
			infoSt.text('Активен');
		}else{
			if(data.DELETE_FLAG===1){
				infoSt.addClass('bg-danger');
				infoSt.text('Удалён');
			}
		}
	}

	if(data.RESPONSIBLE===null||data.RESPONSIBLE===''||data.SNAME===undefined){
		infoP.append('<em>Отсутствует<em>');
	}else{
		infoP.text(data.RESPONSIBLE);
	}

	if(data.SNAME===null||data.SNAME ===''||data.SNAME===undefined){
		infoDb.append('<em>Отсутствует<em>');
	}else{
		infoDb.text(data.SNAME);
	}

	if(data.SOURCE===null||data.SOURCE ===''||data.SNAME===undefined){
		infoS.append('<em>Отсутствует<em>');
	}else{
		infoS.text(data.SOURCE);
	}

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
				resString = '<div class="input-group"><input type="text" name="'+name+'" class="form-control" id="'+id+'"/><label for="'+id+'" class="input-group-addon">'+name+'</label></div>',
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

// param
function getParameter(name){

	/*
		@name - string

		? значение параметра либо null

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


// render results
function renderResultQuery(data){
	Page.TestCont.html('');

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
module.exports.Page     = Page;

