var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;
var Router = require('react-router');
var { State, Route, DefaultRoute, RouteHandler } = Router;
var Animation = require('./mixins/Animation');

var App = React.createClass({
    mixins: [State, Animation],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <TransitionGroup component="div" className="page-container" transitionName={this.getAnimation()}>
                <RouteHandler key={name} {...this.props} />
            </TransitionGroup>
        );
    }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="menu" handler={require('./views/Menu')} />
    <Route name="thanks" handler={require('./views/Thanks')} />
    <DefaultRoute name="main" handler={require('./views/Main')}/>
  </Route>
);

module.exports = function startRouter() {
    React.initializeTouchEvents(true);

    // Use Router.HistoryLocation for HTML5 push state.
    Router.run(routes, function (Handler, state) {
        if (state.action === 'pop') Animation.setAnimation('back');
        React.render(<Handler params={state.params}/>, document.body);
    });
};
