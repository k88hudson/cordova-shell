var React = require('react');
var Animation = require('../../mixins/Animation');
var Link = require('../../components/Link/Link');
var Click = require('../../components/Click/Click');
var {Input} = require('../../components/forms/forms');

var Menu = React.createClass({
    mixins: [Animation],
    getInitialState: function () {
        return {
            photoSrc: ''
        };
    },
    openCamera: function () {
        if (!navigator.camera) return;
        navigator.camera.getPicture((data) => {
            this.setState({photoSrc: 'data:image/jpeg;base64,' + data});
        }, function (onErr) {
            alert(onErr);
        }, {
            destinationType: window.Camera.DestinationType.DATA_URL,
            quality: 50
        });
    },
    render: function () {
        return (<main id="menu">
            <nav className="nav">
                <Link back to="main" />
                <h1>Your Profile</h1>
            </nav>
            <Input label="Name" />
            <Input label="City" />
            <Input label="Favourite Colour" />
            <label className="select">
                <select>
                    <option>Dogs</option>
                    <option>Cats</option>
                    <option>Both</option>
                </select>
                <div className="caret ion-chevron-down" />
            </label>
            <p><Click handler={this.openCamera}>Take a profile picture</Click></p>
            <img src={this.state.photoSrc} />
        </main>);
    }
});

module.exports = Menu;
