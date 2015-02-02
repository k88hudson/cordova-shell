var React = require('react');
var Link = require('../../components/Link/Link');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            on: false
        };
    },
    onClick: function () {
        this.setState({on: !this.state.on});
    },
    render: function () {
        return (<main id="done-page">
            <Link back to="main" className="back-btn" />
            <h1><span className="icon ion-android-done" /><br />Thanks!</h1>

        </main>);
    }
});

