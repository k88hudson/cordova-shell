var React = require('react');

var Headers = React.createClass({
    render: function() {
        return (<div>
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
        </div>);
    }
});

module.exports = Headers;
