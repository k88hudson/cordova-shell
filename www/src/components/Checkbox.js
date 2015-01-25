var React = require('react');
var Click = require('./Click');

var Checkbox = React.createClass({
    getInitialState: function () {
        return {
            checked: false
        };
    },
    onChange: function (e) {
        this.setState({checked: !this.state.checked});
    },
    render: function () {
        var className = 'checkbox' + (this.state.checked ? ' on' : '');
        return (
            <div className={className}>
                <Click nodeName="a" href="#" handler={this.onChange}>
                    <div className="checkbox-indicator">
                        <span className="check ion-checkmark" />
                    </div>
                    <div>{this.props.children}</div>
                </Click>
                <input type="checkbox" onChange={this.onChange} checked={this.state.checked}/>
            </div>
        );
    }
});

module.exports = Checkbox;
