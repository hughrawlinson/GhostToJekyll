var fs = require('fs');

if(!process.argv[2]){
	console.error('your command line arguments are wrong and you should feel wrong');
}

fs.readFile(process.argv[2],function(err,fd){
	if(!err){
		var d = JSON.parse(fd);
		for(i in d.db[0].data.posts){
			var postTime = new Date(d.db[0].data.posts[i].created_at);
			var JekyllPost = "";
			JekyllPost = JekyllPost+'---\n';
			JekyllPost = JekyllPost + 'layout: post\n';
			JekyllPost = JekyllPost + 'title: '+d.db[0].data.posts[i].title+'\n';
			JekyllPost = JekyllPost + 'date: '+toJekyllDate(postTime)+'\n';
			JekyllPost = JekyllPost + '---\n';
			JekyllPost = JekyllPost + unescape(d.db[0].data.posts[i].markdown);
			console.log(JekyllPost);
			fs.writeFile(process.argv[3]+toJekyllFileName(d.db[0].data.posts[i])+'.md',JekyllPost,function(err){
				if(err){
					console.error('well, that didn\'t work...');
				}
				console.log('Saved: '+d.db[0].data.posts[i].title);
			});
		}
	}
});

var toJekyllDate = function(d){
	return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
}

var toJekyllFileName = function(d){
	var postTime = new Date(d.created_at);
	return postTime.getFullYear()+'-'+(postTime.getMonth()+1)+'-'+postTime.getDate()+'-'+d.slug;
}
