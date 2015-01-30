var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
// var Link = require('react-router').Link;
var Click = require('../components/Click');

var CardGroup = React.createClass({
    render: function () {
        return (<Link to='deck' params={{deckId: this.props.deckId}} className="deck-list-item">
            <div className="avatar">
                <img src={this.props.image} />
            </div>
            <div className="details">
                <h3>{this.props.title}</h3>
            </div>
        </Link>);
    }
});

var decks = require('../stores/decks');

var Main = React.createClass({
    mixins: [Animation],
    render: function() {
        return (<main id="main-menu">
            <nav className="nav">
                <Link to="menu">
                    <span className="ion-android-menu"></span>
                </Link>
                <h1>日本語の語彙</h1>
            </nav>
            {decks.map(deck => <CardGroup key={deck.deckId} {...deck} />)}
        </main>);
    }
});

module.exports = Main;
