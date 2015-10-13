
function createDatePicker(els){

	/*
		@el - [$,$]

		Устанавливает датапикер на элимент
	*/

	var date = new Date();

	for(var i=0,l=els.length;i<l;i++){
		els[i].datetimepicker({
			language: 'ru',
			pickTime: false,
			pickDate:true,
			showToday:true,
			defaultDate:date,
			sideBySide:true,
		});

	}

}

module.exports.create = createDatePicker;