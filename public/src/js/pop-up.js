var container = $('.pop-up'),
		box       = $('.pop-up-loader'),
		body      = $('body');

function initPopUp(conf){

	/*
		@conf.type - (тип сообщения)(not)
		@conf.header - (контент заголовка)
		@conf.content - (содержимое)

		фунция для создания сообщений
	*/

		var btn,
				string = '';

		body.removeClass('overflow');
		container.children('div[class^="container-"]').remove();

		if(conf.type){
			switch(conf.type){
				case 'success':
					string ='<div class="container--success">';
				break;
				case 'error':
					string = '<div class="container--error">';
				break;
				case 'info':
					string = '<div class="container--info">';
				break;
			}
		}else{
			string ='<div class="container--info">';
		}

		string = string+'<div class="c-header"><span class="h3">'+conf.header+'</span></div><div class="c-content"><p>'+conf.content+'</p></div><div class="c-control"><button class="btn-pop-up">Ok</button></div></div>';
		container.append(string);

		body.addClass('overflow');
		box.addClass('show-pop-up');

		btn=$('.btn-pop-up');

		btn.bind('click',destroy);

	function destroy(e){

		/*
			Функция callback. Удаляет popup
			при клике на элемент btn сообщения
		*/

		box.addClass('hide-pop-up');

		setTimeout(function(){
			btn.unbind('click',destroy);
			box.removeClass('show-pop-up');
			body.removeClass('overflow');
			container.children('div[class^="container--"]').remove();
			box.removeClass('hide-pop-up');
		},200);
	}

}

module.exports.create = initPopUp;