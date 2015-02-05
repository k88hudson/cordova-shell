var React = require('react');
var Animation = require('../../mixins/Animation');
var Link = require('../../components/Link/Link');
var Click = require('../../components/Click/Click');
var {Input} = require('../../components/forms/forms');

module.exports = React.createClass({
    mixins: [Animation],
    getInitialState: function () {
        return {
            photoSrc: ''
        };
    },
    render: function () {
        return (<main id="add">
            <nav className="nav">
                <Link transition="back" to="main" />
                <h1>Add new product</h1>
                <Click nodeName="a" className="done"><span className="ion-android-done"/></Click>
            </nav>
            <Input label="Title" />
            <Input label="Color" />
            <Input label="Image" />
        </main>);
    }
});
