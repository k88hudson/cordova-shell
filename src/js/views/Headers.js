var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');

var Headers = React.createClass({
    mixins: [Animation],
    render: function () {
        return (<main>
            <ul className="nav">
                <li><Link transition="forward" to="japanese">ア</Link></li>
            </ul>
            <header>
                <h1>Header</h1>
            </header>
            <header>
                <button className="left">Back</button>
                <h1>Header with buttons</h1>
                <button className="right">Next</button>
            </header>
            <header>
                <button className="left">Back</button>
                <h1>Header with really long text that goes over</h1>
                <button className="right">Next</button>
            </header>
        </main>);
    }
});

module.exports = Headers;
