var React = require('react');
var Animation = require('../mixins/Animation');
var Link = require('../components/Link');
// var Link = require('react-router').Link;
var {Click} = require('../components/formComponents');

var decks = require('../stores/decks');

var Menu = React.createClass({
    mixins: [Animation],
    render: function() {
        var params = this.props.params;
        var data = decks.filter(deck => deck.deckId === params.deckId)[0];
        return (<main id="deck">
            <nav className="nav">
                <Link back to="main" />
                <h1>{data.title}</h1>
            </nav>
            {data.cards.map(card => <div className="card">{card[1] || card[0]}</div>)}
        </main>);
    }
});

module.exports = Menu;
