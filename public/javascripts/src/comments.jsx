var React = require('react');
var Admin = require('./admin.jsx');
module.exports = React.createClass({
	handleClick:function() {
    	  $("#AdminReply").text(this.props.uid);
	},
render: function() {
	  console.log("this.props.lock:"+ this.props.lock == "f");
	  if(this.props.lock == "t"){
	    return (
				<div className="media note animated bounceInRight">
					<h3 className="label label-md label-info">链接来自:{this.props.link} 主题:{this.props.title}</h3>
					<a className="pull-left">
					  <div className="img-circle comments-avatar img-guest" />
					</a>
					<div className="media-body">
						<h5 className="media-heading">
						  <span className="badge badge-success">{this.props.guest }</span>	发布于 
							<span> 
							  {this.props.createTime}
							</span>
						</h5>
					<p>{this.props.comment}</p>
					<hr/>
					<Admin key={this.props.reply.id} reply={this.props.reply}/>
					</div>
				</div>
    )
	  }else{
	    return (
				<div className="media note animated bounceInRight">
					<h3 className="label label-md label-info">链接来自:{this.props.link} 主题:{this.props.title}</h3>
					<a className="pull-left">
					  <div className="img-circle comments-avatar img-guest" />
					</a>
					<div className="media-body">
						<h5 className="media-heading">
						  <span className="badge badge-success">{this.props.guest }</span>	发布于 
							<span> 
							  {this.props.createTime}
								<div className="btn btn-danger pull-right" data-toggle="modal" data-target="#myModal" onClick={this.handleClick} >Reply</div>
							</span>
						</h5>
					<p>{this.props.comment}</p>
					<hr/>
					<Admin key={this.props.reply.id} reply={this.props.reply}/>
					</div>
				</div>
    )
	 }
}
});