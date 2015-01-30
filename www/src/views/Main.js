var React = require('react');
//var Firebase = require('firebase');
var ReactFireMixin = require('../mixins/ReactFire');

var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
// var Link = require('react-router').Link;
var Click = require('../components/Click');
var {Input} = require('../components/formComponents');

var firebaseApp = 'https://webmakerchat.firebaseio.com/demo/';

var Messages = React.createClass({
    render: function () {
        return (<div className="messages">
            {this.props.data && this.props.data.map(function(message) {
                return <p>{message.name + ': ' + message.text}</p>
            })}
        </div>);
    }
});

var MessageForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var textEl = this.refs.text.getDOMNode();
        var name = 'anonymous';
        var text = textEl.value.trim();
        this.props.onMessageSubmit({name: name, text: text});
        textEl.value = '';
        return false;
      },
      render: function() {
        return (
          <form className="message-form">
            <div className="input-group">
                <input type="text" label="Say something..." ref="text" />
            </div>
            <Click handler={this.handleSubmit}>Submit</Click>
          </form>
        );
      }
    });

var Main = React.createClass({
    mixins: [Animation, ReactFireMixin],
    getInitialState: function() {
      return {data: []};
    },
    handleMessageSubmit: function (message) {
      var messages = this.state.data;
      messages.push(message);
      this.setState({data: messages});

      this.firebaseRefs['data'].push(message);
    },
    componentWillMount: function() {
        this.bindAsArray(new Firebase(firebaseApp + 'messages'), 'data');
    },
    render: function() {
        return (<main id="main-menu">
            <nav className="nav">
                <Link to="menu">
                    <span className="ion-android-menu"></span>
                </Link>
                <h1>Messages</h1>
                <Link to="menu">
                    <span className="ion-android-add"></span>
                </Link>
            </nav>
            <Messages data={this.state.data} />
            <MessageForm onMessageSubmit={this.handleMessageSubmit} />
        </main>);
    }
});

module.exports = Main;
