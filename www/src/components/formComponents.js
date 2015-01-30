var React = require('react');
var Click = require('./Click');

var Input = module.exports.Input = React.createClass({
    onFocus: function () {
        // We need this because of http://css-tricks.com/webkit-sibling-bug. Sigh
        this.setState({hasFocus: true});
    },
    render: function () {
        return (<div className="input-group">
            <input
                placeholder={this.props.label}
                type={this.props.type || 'text'} required />
        </div>);
    }
});

var InputMaterial = module.exports.InputMaterial = React.createClass({
    onFocus: function () {
        // We need this because of http://css-tricks.com/webkit-sibling-bug. Sigh
        this.setState({hasFocus: true});
    },
    render: function () {
        return (<div className="input-group-material">
            <input type={this.props.type || 'text'} onFocus={this.onFocus} required />
            <span className="bar">
                <span className="left"></span>
                <span className="right"></span>
            </span>
            <span className="highlight"></span>
            <label>{this.props.label}</label>
        </div>);
    }
});

var Checkbox = module.exports.Checkbox = React.createClass({
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

var Switch = module.exports.Switch = React.createClass({
    getInitialState: function() {
        return {
            on: false
        };
    },
    onSwitch: function () {
        this.setState({ on: !this.state.on });
    },
    render: function () {
        return (<Click swipe handler={this.onSwitch} className={'switch' + (this.state.on ? ' on' : '')}>
            <div className="track">
                <div className="switch-toggle"></div>
            </div>
        </Click>);
    }
});
