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
    onDone: function () {
        console.log('ok!');
        console.log('ok!');
    },
    render: function () {
        return (<main id="add">
            <nav className="nav">
                <Link transition="back" to="main"><span className="ion-android-arrow-back"/></Link>
                <h1>Add new product</h1>
                <Click nodeName="a" className="done" handler={this.onDone}><span className="ion-android-done"/></Click>
            </nav>
            <div className="inner-page-container">
                <Input label="Title" />
                <Input label="Color" />
                <Input label="Image" />
            </div>
        </main>);
    }
});
