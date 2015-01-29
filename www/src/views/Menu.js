var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
// var Link = require('react-router').Link;
var {Click} = require('../components/formComponents');

var Menu = React.createClass({
    mixins: [Animation],
    render: function() {
        return (<main id="menu">
            <nav className="nav">
                <Link back to="main" />
                <h1>Kate Hudson</h1>
            </nav>
            <p>lorem ipsum..</p>
        </main>);
    }
});

module.exports = Menu;
