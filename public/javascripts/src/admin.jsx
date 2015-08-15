var React = require('react');

module.exports = React.createClass({
render: function() {
	if(this.props.reply.length != 0 ){
    return (
			<div className="media note">
				<a className="pull-left">
				  <div className="img-circle comments-avatar img-admin" /> 
				</a>
				<div className="media-body">
					<h5 className="media-heading">
					  <span className="badge badge-success">临水照影</span>
						<span>回复于
						 {this.props.reply[0].createTime}
						</span>
					</h5>
				<p>{this.props.reply[0].comment}</p>
				<hr/>
				</div>
			</div>

    )
  }else{
  	  return (<div></div>)
  }
}
});