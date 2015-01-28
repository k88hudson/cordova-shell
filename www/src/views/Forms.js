var React = require('react');
var {Click, Switch, Checkbox, Input} = require('../components/formComponents');

var Forms = React.createClass({
    getInitialState: function() {
        return {
            isOn: false
        }
    },
    flip: function (e) {
        this.setState({isOn: !this.state.isOn});
    },
    render: function () {
        return (<main>
            <p><Click
                nodeName="button"
                handler={this.flip}>
                {this.state.isOn ? 'Button On': 'Off'}
            </Click></p>
            <p><Input type="text" label="Name"/></p>
            <label className="select">
                <select>
                    <option>one</option>
                    <option>two</option>
                    <option>three</option>
                </select>
                <div className="caret ion-chevron-down" />
            </label>
            <p><Checkbox>Hello world</Checkbox></p>
        </main>);
    }
});

module.exports = Forms;
