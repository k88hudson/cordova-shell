var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
// var Link = require('react-router').Link;
var Click = require('../components/Click');

var Menu = React.createClass({
    mixins: [Animation],
    getInitialState: function () {
        return {
            photoSrc: ''
        };
    },
    openCamera: function () {
        if (!navigator.camera) return;
        navigator.camera.getPicture(function onSuccess(data) {
            this.setState({photoSrc: 'data:image/jpeg;base64,' + data});
        }, function (onErr) {
            alert(onErr);
        });
    },
    render: function() {
        return (<main id="menu">
            <nav className="nav">
                <Link back to="main" />
                <h1>Kate Hudson</h1>
            </nav>
            <p><Click handler={this.openCamera}>Open Camera</Click></p>
            <img src={this.state.photoSrc} />
        </main>);
    }
});

module.exports = Menu;
