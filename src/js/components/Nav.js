var React = require('react');
var Link = require('./Link');

module.exports = React.createClass({
    render: function () {
        return (
            <ul className="nav">
                {this.props.links.map(link => <li key={link[0]}><Link transition="fadeout" to={link[0]}><span className={link[1]} /></Link></li>)}
            </ul>
        );
    }
});
