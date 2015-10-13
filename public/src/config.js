var MODE = config.dev;//select mode for change dev or prod

var config = {
	dev:{
		ajax:{
			search:{
				url:'/search',
			},
			test:{
				url:'/test'
			},
			save:{
				url:'/save',
			},
			get:{
				url:'/getquery'
			}
		}
	},
	prod:{
		ajax:{
			search:{
				url:'SqlPageService.aspx',
			},
			test:{
				url:'SqlPageService.aspx'
			},
			save:{
				url:'SqlPageService.aspx',
			},
			get:{
				url:'SqlPageService.aspx'
			}
		}
	}

}

module.exports = MODE;