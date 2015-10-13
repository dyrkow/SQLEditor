var cont;

function startLoader(el,mode){
	cont = el;
	cont.addClass('preloader');
	if(mode&&mode==='block'){
		cont.button('loading');
	}

}
function stopLoader(mode){
	cont.removeClass('preloader');
	if(mode&&mode==='block'){
		cont.button('reset');
	}

}

module.exports.start = startLoader;
module.exports.stop = stopLoader;