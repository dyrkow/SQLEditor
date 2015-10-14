var loaders = {};

function regLoader(conf){

	/*
		@conf.name - string
		@conf.mode - bool (true - если надо сделать блокировку,false - просто добавить лоадер)
		@conf.el - $
		@conf.block - [] (массив блокируемых элиментов во время работы лоадера)

		Регистрирует новый лоадер
	*/

		loaders[conf.name]={
			el:conf.el,
			mode:conf.mode,
			block:conf.block,
		}

}

function startLoader(name){

	/*
		@name - string

		Запускает лоадер
	*/

	var loader = loaders[name];

		loader.el.addClass('preloader');

		if(loader.mode){
			loader.el.button('loading');
		}

		if(loader.block){
			var length = loader.block.length;

			if(length>0){
				for(var i=0;i<length;i++){
					loader.block[i].button('loading');
				}
			}
		}

}

function stopLoader(name){

	/*
		@name - string

		Останавливает зарегестрированный лоадер
	*/

	var loader = loaders[name];

	loader.el.removeClass('preloader');

	if(loader.mode){
		loader.el.button('reset');
	}

	if(loader.block){
			var length = loader.block.length;

			if(length>0){
				for(var i=0;i<length;i++){
					loader.block[i].button('reset');
				}
			}
		}

}

function unregLoader(name){

	/*
		@name - string (название лоадера)

		Удаляет зарегестрированный лоадер
	*/

	delete loaders[name];

}


module.exports.create = regLoader;
module.exports.delete = unregLoader;
module.exports.start  = startLoader;
module.exports.stop   = stopLoader;