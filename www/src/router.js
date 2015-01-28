var React = require('react/addons');
var Router = require('react-router');
var { State, Route, DefaultRoute, RouteHandler } = Router;
var TransitionGroup = React.addons.CSSTransitionGroup;

var Nav = require('./components/Nav')
var Link = require('./components/Link');
var Animation = require('./mixins/Animation');

var links = [
    ['forms', 'ion-ios-list', require('./views/Forms')],
    ['japanese', 'ion-document-text', require('./views/Japanese')],
    ['headers', 'ion-ios-settings-strong', require('./views/Headers')]
];

var App = React.createClass({
    mixins: [ State, Animation ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <div className="wrapper">
                <Nav links={links} />
                <TransitionGroup component="div" className="page-container" transitionName={this.getAnimation()}>
                    <RouteHandler key={name} />
                </TransitionGroup>
            </div>
        );
    }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    {links.map((link) => {
        return <Route name={link[0]} handler={link[2]} key={link[0]} />
    })}
    <DefaultRoute handler={links[0][2]}/>
  </Route>
);

module.exports = function () {
    var parentElement = document.getElementById('app');
    React.initializeTouchEvents(true);

    // Router.HistoryLocation,
    Router.run(routes, function (Handler, state) {
        if (state.action === 'pop') Animation.setAnimation('back');
        React.render(<Handler/>, document.body);
    });
};

