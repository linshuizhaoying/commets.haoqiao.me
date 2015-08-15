var React = require('react');
var Comments = require('./comments.jsx')
var SubmitComment = require('./submitComment.jsx')
module.exports = React.createClass({
  getInitialState: function() {
    return {
     data : [{"title":"测试","link":"haoqaio.me","guest":"花开花落","comment":"测试文本Testing!","email":"4799109@qq.com","createTime":"2015年12月12日","reply":""}]
    };
  },
loadCommentsFromServer:function() {
	if($("#adminpass").text().length !=0){
    $.post("/getAllData" , {link:$("#link").text(),adminpass:$("#adminpass").text()}, function(result) {
      if (this.isMounted()) {
        this.setState({
          data:JSON.parse(result)
        });
      }
    }.bind(this));
	}else{
    $.post("/getData" , {link:$("#link").text(),title:$("#name").text()}, function(result) {
      var list = result;
      if (this.isMounted()) {
        this.setState({
          data:JSON.parse(result)
        });
      }
    }.bind(this));
	}
},
componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 2000);
},
adminSubmit: function() {
    $.post("/AdminSubmit" , {uid:$("#AdminReply").text(),adminComment:$("#AdminComment").val()}, function(result) {
    		alert("回复成功!");
    }.bind(this));
    $("#AdminReply").text("");
    $("#AdminComment").val("");
},
render: function() {
	  console.log(this.state.data);
	  var adminpass = $("#adminpass").text();
	  var datas = this.state.data;
	  var lock = $("#lock").text();
		if(datas){
			var CommentItems = datas.map(function(Item) {
	      return <Comments lock={lock} adminpass={adminpass} uid={Item._id} key={Item.id} title={Item.title} guest={Item.guest}  comment={Item.content}  link={Item.link} email={Item.email} createTime={Item.createTime} reply={Item.reply}/>
	    });
    }
    return (
			<div className="portlet box blue">
				<div className="portlet-title">
					<h3 className="caption-subject bold uppercase text-center">评论系统</h3>
				</div>
				<div className="portlet-body">
				  {CommentItems}
				  <SubmitComment/>
				</div>
				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
				      </div>
				      <div className="modal-body">
								<div className="form-group form-md-line-input form-md-floating-label">
									<span id="AdminReply" className="hide"></span>
									<textarea id="AdminComment" ref="AdminContent" rows="6"  className="form-control textarea-style">
									</textarea>
									<label >评论内容</label>
								</div>
				       </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
				        <button type="button" className="btn btn-primary" onClick={this.adminSubmit}>提交</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
    )
}
});