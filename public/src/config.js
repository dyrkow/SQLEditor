var mode,
		config = {
			dev:{
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
				},
				port:3000
			},
			prod:{
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
				},
				port:3000
			}
		};

mode = config.dev;//select mode for change dev or prod

module.exports = mode;