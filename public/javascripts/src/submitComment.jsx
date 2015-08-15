var React = require('react');

module.exports = React.createClass({
	handleChange:function() {
    if(event.target.value.length != 0){
    	  console.log(event.target.className.indexOf("edited"));
    	  if(event.target.className.indexOf("edited") == -1){
    	  	  event.target.className = event.target.className + " " + "edited";
    	  }
     	
    }else{
    	  event.target.className = "form-control";
    }
    
	  return;
	},
	
	handleCancel:function() {
    this.refs.CommentName.getDOMNode().value = '';
    this.refs.CommentEmail.getDOMNode().value = '';
    this.refs.CommentContent.getDOMNode().value = '';
	  return;
	},
	handleSubmit:function() {
    $.post("/submit" , {name:$("#name").text(),link:$("#link").text(),CommentName:this.refs.CommentName.getDOMNode().value,CommentEmail:this.refs.CommentEmail.getDOMNode().value,CommentContent:this.refs.CommentContent.getDOMNode().value}, function(result) {
			if(result){
	      if (this.isMounted()) {
	        this.setState({
	          data:JSON.parse(result)
	        });
	      }
			}
    }.bind(this));
    this.handleCancel();
	  return;
	},
	render: function() {
	    return (
				<div className="portlet light">
					<div className="portlet-title">
						<div className="caption font-green">
							<i className="icon-pin font-green"></i>
							<span className="caption-subject bold uppercase"> 发表评论</span>
						</div>
					</div>
					<div className="portlet-body form">
						<form role="form">
						<div className="form-body">
							<div className="form-group form-md-line-input form-md-floating-label">
								<input id="CommentName" ref="CommentName" type="text" className="form-control" onChange={this.handleChange} />
								<label for="CommentName">昵称：</label>
								<span className="help-block">随便填</span>
							</div>
							<div className="form-group form-md-line-input form-md-floating-label">
								<input id="CommentEmail" ref="CommentEmail" type="text" className="form-control"  onChange={this.handleChange} />
								<label for="CommentEmail">邮箱</label>
								<span className="help-block">=-=反正我不作检验,收不到邮件别怪我</span>
							</div>
							<div className="form-group form-md-line-input form-md-floating-label">
								<textarea id="CommentContent" ref="CommentContent" rows="3"  className="form-control textarea-style"  onChange={this.handleChange}>
								</textarea>
								<label for="CommentContent">评论内容</label>
							</div>
					 </div>
							<div className="form-actions noborder">
								<button type="button" onClick={this.handleSubmit} className="btn blue">提交</button>
								<button type="button" onClick={this.handleCancel} className="btn default commentCancel">取消</button>
							</div>
						</form>
					</div>
				</div>
	    )
	}
});