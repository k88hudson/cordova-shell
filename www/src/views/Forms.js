var React = require('react');
var Click = require('../components/Click');
var Switch = require('../components/Switch');
var Checkbox = require('../components/Checkbox');

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
                {this.state.isOn ? 'On': 'Off'}
            </Click></p>
            <p><Switch /></p>
            <p><input type="text" /></p>
            <label className="select"><select>
                <option>one</option>
                <option>two</option>
                <option>three</option>
            </select></label>
            <p><Checkbox>Hello world</Checkbox></p>
        </main>);
    }
});

module.exports = Forms;
