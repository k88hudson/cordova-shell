var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
var {Click} = require('../components/formComponents');

var Messages = React.createClass({
    mixins: [Animation],
    render: function() {
        return (<main>
            <nav className="nav">
                <Link to="menu">
                    <span className="ion-android-menu"></span>
                </Link>
                <h1>Messages</h1>
            </nav>
            <div className="message-card">
                <div className="avatar">
                    <img src="img/Woman-3.svg" />
                </div>
                <div className="details">
                    <h4>Tanay</h4>
                    <p>Hey! I was wondering if you wanted to...</p>
                </div>
            </div>
        </main>);
    }
});

module.exports = Messages;
