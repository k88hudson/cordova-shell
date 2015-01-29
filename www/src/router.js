var React = require('react/addons');
var Router = require('react-router');
var { State, Route, DefaultRoute, RouteHandler } = Router;
var TransitionGroup = React.addons.CSSTransitionGroup;

var Link = require('./components/Link');
var Animation = require('./mixins/Animation');

// var links = [
//     ['forms', 'ion-ios-list', require('./views/Forms')],
//     ['japanese', 'ion-document-text', require('./views/Japanese')],
//     ['headers', 'ion-ios-settings-strong', require('./views/Headers')]
// ];

var App = React.createClass({
    mixins: [ State, Animation ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <TransitionGroup component="div" className="page-container" transitionName={this.getAnimation()}>
                <RouteHandler key={name} />
            </TransitionGroup>
        );
    }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="messages" handler={require('./views/Messages')} />
    <Route name="menu" handler={require('./views/Menu')} />
    <DefaultRoute handler={require('./views/Messages')}/>
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

