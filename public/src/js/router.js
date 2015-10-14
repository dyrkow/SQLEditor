
function emitRoute(param,val,callback){

	/*
		@param - 
		@val - 
		@callback - 

		Вызывает роутер
	*/

	setParam(param,val);
	callback();
}

function getParam(pattern){

	/*
		@pattern - 

		функция ищет параметр по шаблону
	*/

	var hash   = location.hash,
			val,
			regexp = new RegExp('[#&]'+pattern+'=[0-9]+','m');

	val = regexp.exec(hash);

	if(val){
		val = parseInt(val[0].split('=')[1]);

		return val;
	}else{
		return null;
	}

}

function setParam(pattern,val){

	/*
		@patter - 
		@val - 

		Функция которая устанавливает параметр
	*/

	var hash   = location.hash,
			regexp = new RegExp('[#&]'+pattern+'=[0-9]+','m'),
			string;

		if(regexp.test(hash)){
			var item = (regexp.exec(hash)[0]).slice(0,1);

			if(item==='#'){
				string = hash.replace(regexp,'#'+pattern+'='+val);

				location.hash = string;
				return;
			}else{
				if(item==='&'){
					string = hash.replace(regexp,'&'+pattern+'='+val);
					location.hash = string;
					return;
				}
			}
		}else{
			if(hash.slice(hash.length-1,hash)==='&'){
					location.hash = hash+pattern+'='+val;
					return;
				}else{
					if(hash===''){
						location.hash = pattern+'='+val;
						return;
					}else{
						location.hash=hash+'&'+pattern+'='+val;
						return;
					}
				}
		}

}

module.exports.get  = getParam;
module.exports.set  = setParam;
module.exports.emit = emitRoute;