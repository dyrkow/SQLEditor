var search = require('./search.js'),
		editor = require('./ace.js'),
		select = require('./select.js'),
		query  = require('./query.js');

// editor
var mainEditor = editor.create('editor',{theme:'ace/theme/clouds',mode:'ace/mode/sql'});

// search
search.init();

// query page
query.init();

// select mode
select.init({cont:$('.run-view')});

module.exports.editor = mainEditor;//?