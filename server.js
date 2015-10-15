var express = require('express'),
		bodyParser = require('body-parser'),
		config = require(__dirname+'\\public\\src\\config.js'),

		app = express();

app.use(express.static(__dirname+'/public/dist'));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.get(config.search.url,function(req,res){
	var data = [
		{
			ID:1,
			COMENT:'Прокатка'},
		{
			ID:2,
			COMENT:'План (Стан 5000)'},
		{
			ID:3,
			COMENT:'Поступление слябов'},
		{
			ID:4,
			COMENT:'Прокат (Возврат)'},
		{
			ID:5,
			COMENT:'Поступление на УЗО'},
		{
			ID:60021,
			COMENT:'План (ТЭСЦ-4) //запрос с неизвесным id'},
	];

	setTimeout(function(){
		res.json(data);
	},1000);
});

app.get(config.get.url,function(req,res){
	var data;

	switch(req.query.ID){
		case '1':
			data={
				ID:1,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'Прокатка',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:1,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
		case '2':
			data={
				ID:2,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'План (Стан 5000)',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:2,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
		case '3':
			data={
				ID:3,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'Поступление слябов',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:3,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
		case '4':
			data={
				ID:4,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'Прокат (Возврат)',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:4,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
		case '5':
			data={
				ID:5,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'Поступление на УЗО',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:1,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
		case '6':
			data={
				ID:6,
				QUERYSTRING:"Select\t'Принято с 1-го предъявления' as pr\n\t,Nvl(kf,0) as fact\n\t,p2.day\nFrom\n\t(\n\tSELECT \n\t\t   Trunc(t0.ENTRY_TIME+5/24, 'hh24') as day\n\t\t   ,sum( CASE WHEN mchar.projects='2WELD' THEN 0.5 ELSE 1 END) kf\n\t\t\tFROM SHEET_STACKER t0\n\t\t\t  LEFT JOIN PIPE_MAIN_CHARACTERISTICS mchar ON (t0.god=mchar.god AND t0.truba=mchar.truba AND t0.shop=mchar.shop)\n\t\t\t  LEFT JOIN MV_SHEET_STACKER_OTK1 otk ON (t0.god=otk.god AND t0.truba=otk.truba AND t0.shop=otk.shop)\n\t\t\t WHERE \n\t\t\t  ((t0.TRUBA BETWEEN 200001 AND 799999) OR (t0.TRUBA BETWEEN 900001 AND 999999)) and\n\t\t\t  t0.ENTRY_TIME BETWEEN :start_time AND :stop_time\n\t\t\t  and t0.SHOP=128\n\t   Group By Trunc(t0.ENTRY_TIME+5/24, 'hh24')\n\t) p1\n\tRight Join\n\t(\n\t\tSelect :start_time + (level + 4)/24 as day\n\t\tFrom dual\n\t\tConnect By :stop_time-:start_time > (level-1)/24\n\t) p2 on p1.day = p2.day\n\n\tOrder By p2.day",
				COMENT:'План (ТЭСЦ-4)',
				DBLINK_ID:231,
				PLAN:1,
				DELETE_FLAG:0,
				DELETE_DATETIME: null,
				TYPE:1,
				RESPONSIBLE:null,
				SOURCE:null
			};
		break;
	}
	setTimeout(function(){
		res.json(data);
	},2000);
});

app.post(config.test.url,function(req,res){
	var answer;
		answer={
			result:true,
			error:'Error: unenspectit token ; on line 12.',
			data:[ [26, "System.Data.OracleClient", "ТЭСЦ - 3", 0, null, null], [25, "Data Source=INAPP;Persist Security Info=True;User ID=ed;Password = EDPASSWD1;Unicode=True", "System.Data.OracleClient", "Комбинированый", 0, null, null], [24,"Data Source=MDB;Persist Security Info=True;User ID=tesc4;Password=tesc4;Unicode=True","System.Data.OracleClient","ТЭСЦ - 4",0,null,null],[9,"Data Source=LPK;Persist Security Info=True;User ID=omk;Password=OMK;","System.Data.OracleClient","ЛПК",0,null,null],[27,"Data Source=MDB;Persist Security Info=True;User ID=admintesc5;Password=nhe,ysq5;Unicode=True","System.Data.OracleClient","ТЭСЦ - 5",0,null,null],[28,"Data Source=MDB;Persist Security Info=True;User ID=tesc2;Password=tesc2;Unicode=True","System.Data.OracleClient","ТЭСЦ - 2",0,null,null],[10,"Data Source=STAN;Persist Security Info=True;User ID=L3Main;Password=trust","System.Data.OracleClient","Стан 5000 (L3Main)",0,null,null],[8,"Data Source=OS1;Persist Security Info=True;User ID=MATERIAL;Password = trust;Unicode=True","System.Data.OracleClient","Стан 5000",0,null,null],[29,"Data Source=KPC;Persist Security Info=True;User ID=kpc;Password=rjktcysq;","System.Data.OracleClient","КПЦ",0,null,null],[30,"Data Source=MDB;Persist Security Info=True;User ID=VPO;Password=VPO14;Unicode=True","System.Data.OracleClient","Мартен",0,null,null],[31,"Password=craas;User ID=saarc;Data Source=MDB;Persist Security Info=True","System.Data.OracleClient","ТЭСЦ - 2 (СААРЦ)",0,null,null],[32,"Data Source=MDB;Persist Security Info=True;User ID=oracle;Password=oraebs","System.Data.OracleClient","Z ERP DALLY",0,null,null],[33,"Data Source=MDB;Persist Security Info=True;User ID=intershop;Password=intershop","System.Data.OracleClient","ВМЗ-Техно",0,null,null]]
		};

	setTimeout(function(){
		res.json(answer);
	},2000);
});

app.post(config.save.url,function(req,res){
	setTimeout(function(){
		res.json({result:true});
	},3000);
});

app.listen(config.port);

console.log('Start server on port '+config.port+' !');