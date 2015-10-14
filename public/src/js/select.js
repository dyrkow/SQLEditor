
var start     = null,
		table     = null,
		globalSum = 0;

function setMode(mode){
	if(mode===true){
		table = $('.result-table-view');
	}else{
		table=null;
	}
}

function initialSelectMode(conf){

	/*
		@conf.cont - элимент который делигирует события

		Функция создаёт обработкичи на события и реализует функционал
	*/

	function col(cell){
		return cell.parent().children('td').index(cell);
	}

	function selectTo(cell,e){

		if(start === null){
			return;
		}

		table.find('td').removeClass('select');

		var stop = $(cell),
				tbl  = table,
				rs   = tbl.children('tbody').children('tr'),
				r0   = rs.index(start.parent()), c0 = col(start),
				r1   = rs.index(stop.parent()), c1 = col(stop),
				sum  = 0;

		for (var i = r0; i <= r1; i++) {
			var cells = $(rs.get(i)).children("td");

			for (var j = c0; j <= c1; j++) {
					var cell   = $(cells.get( j)),
							regexp = /[^0-9]/g,
							val;

					cell.addClass('select');

					if(regexp.test(cell.text())){
						//не число
						continue;
					}

					val = parseInt(cell.text());

					if(cell.hasClass('js-date')){
						continue;
					}else{
						sum +=val;
					}
			}

		}

		globalSum = sum;
	}

	conf.cont.bind('mousedown',function mouseDown(e){

		if(table !== null){
			$('.r-lable').remove();
			if(e.target.nodeName==='TABLE'){
				return false;
			}
			if(e.target.nodeName === 'TD'){
				start = $(e.target);
				selectTo(e.target,e);
				return false;
			}
		}

		//событие произошло на контаинере либо без результирующей таблицы
		return;
	});

	conf.cont.bind('mouseover',function mouseOver(e){
		if(table !== null){
			if(e.target.nodeName==='TD'){
				selectTo(e.target,e);
			}
		}
	});

	conf.cont.bind('mouseup',function mouseUpTd(e){
		if(table !== null){
			if(e.target.nodeName==='TD'){
				selectTo(e.target,e);

				if(e.target.className === 'select'){
					$(e.target).append('<div class="r-lable">'+globalSum+'</div>');
				}

				start = null;
			}
		}
	});

	$("body").bind('mouseup',function mouseUpBody(){
		if(table !== null){
			start = null;
		}
	});
}

module.exports.init = initialSelectMode;
module.exports.set = setMode;
