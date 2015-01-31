var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
var Click = require('../components/Click');

var Message = React.createClass({
    mixins: [Animation],
    render: function() {
        return (<main>
            <nav className="nav">
                <Link back />
                <h1>Messages</h1>
            </nav>
            <p>lorem ipsum..</p>
        </main>);
    }
});

module.exports = Message;
