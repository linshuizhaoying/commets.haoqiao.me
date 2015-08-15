var express = require('express');
var router = express.Router();
var NewsData = require('../database/comment');
var moment = require('moment');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '临水照影  评论系统'});
});
router.post('/AdminSubmit', function(req, res, next) {
	console.log("Admin提交中...");
	var reply = new Object();
	reply.createTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	reply.comment = req.body.adminComment;
	NewsData.update({_id:req.body.uid}, {
		$set: {reply: reply}
	}, function(err) {
		if(err){
			console.log(err)
			return
		}
	 res.send("ok");
	 res.end();
	});

});
router.post('/submit', function(req, res, next) {
	console.log("提交中...");
	var newsdata = new NewsData(NewsData);
	newsdata.title = req.body.name;
	newsdata.link = req.body.link ;
	newsdata.guest = req.body.CommentName;
	newsdata.email  = req.body.CommentEmail;
	newsdata.content = req.body.CommentContent;
	newsdata.createTime  = moment().format('MMMM Do YYYY, h:mm:ss a');
	newsdata.date = moment();
	newsdata.reply;
	newsdata.save(function(err) {
	if (err) {
		console.log('保存失败');
	}else{
		console.log('数据保存成功');
		NewsData.find({ title: req.body.title }, function(err, content) {
		if(content!=null){
			//console.log(content[0]);
			res.send(JSON.stringify(content));
			res.end();
			//console.log("找到了content" + JSON.stringify(content)); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
		}else{
		  res.send(JSON.stringify(""));
		  res.end();
		}
	});
	}
	
	});
});
router.post('/getData', function(req, res, next) {
//	NewsData.find({link:req.body.link}, function(err, content) {
	NewsData.find({link:req.body.link,title: req.body.title},null,{sort:{_id:-1}},function(err, content){
		if(content!=null){
		console.log("getdate");
			res.send(JSON.stringify(content));
			res.end();
			//console.log("找到了content" + JSON.stringify(content)); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
		}else{
		  res.send(JSON.stringify(""));
		  res.end();
		}
	});
});
router.post('/getAllData', function(req, res, next) {
	if(req.body.adminpass =="123"){
	  	NewsData.find(null,null,{sort:{_id:-1}},function(err, newsdata) {
			res.send(JSON.stringify(newsdata));
			res.end();
		});
	}else{
		NewsData.find({link:req.body.link,title: req.body.title }, null,{sort:{_id:-1}},function(err, content) {
			if(content!=null){
				//console.log(content[0]);
				res.send(JSON.stringify(content));
				res.end();
				//console.log("找到了content" + JSON.stringify(content)); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
			}else{
			  res.send(JSON.stringify(""));
			  res.end();
			}
		});
	}

});
router.get('/show/:name/:link', function(req, res, next) {
	NewsData.findOne({ link:req.body.link,title: req.body.title }, function(err, content) {
		if(content!=null){
			console.log("找到了"); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
		}else{
			console.log("没找到");
		}
	});
  res.render('index', {title: '临水照影  评论系统', lock:"t",name:req.params.name,link:req.params.link});
});
router.get('/show/:name/:link/:adminpass', function(req, res, next) {
  	NewsData.find(function(err, newsdata) {
		console.log("newsdata:"+newsdata);
	});
	if(req.params.adminpass == "123"){
		res.render('index', {title: '临水照影  评论系统', lock:"f",name:req.params.name,link:req.params.link,adminpass:req.params.adminpass});
	}else{
		res.render('index', {title: '临水照影  评论系统', lock:"t",name:req.params.name,link:req.params.link,adminpass:req.params.adminpass});
	}
  
});
module.exports = router;
