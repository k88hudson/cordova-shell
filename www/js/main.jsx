var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var NavState = Router.Navigation;
var TransitionGroup = React.addons.CSSTransitionGroup;

var Click = React.createClass({
    defaults: {
        touched: false,
        touchdown: false,
        coords: { x:0, y:0 },
        evObj: {}
    },

    getInitialState: function() {
        return this.defaults;
    },

    handler: function() {
        typeof this.props.handler == 'function' && this.props.handler.apply(this, arguments);
    },

    getCoords: function(e) {
        if (e.touches && e.touches.length) {
            var touch = e.touches[0];
            return {
                x: touch.pageX,
                y: touch.pageY
            };
        }
    },

    onTouchStart: function(e) {
        this.setState({
            touched: true,
            touchdown: true,
            coords: this.getCoords(e),
            evObj: e
        });
    },

    onTouchMove: function(e) {
        if (this.props.swipe) return;
        var coords = this.getCoords(e);
        var distance = Math.max(
            Math.abs(this.state.coords.x - coords.x),
            Math.abs(this.state.coords.y - coords.y)
        );
        if (distance > 6) {
            this.setState({ touchdown: false });
        }
    },

    onTouchEnd: function() {
        if (this.state.touchdown) {
            this.handler.call(this, this.state.evObj);
        }
    },

    onClick: function(e) {
        e.preventDefault();
        if ( this.state.touched ) {
            return;
        }
        this.handler.apply(this, arguments)
        this.setState(this.defaults)
    },

    render: function() {
      var classNames = ['touchclick']

      this.props.className && classNames.push(this.props.className)
      this.state.touchdown && classNames.push('touchdown')

      return React.DOM[this.props.nodeName || 'button']({
        className: classNames.join(' '),
        href: this.props.href,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onClick: this.onClick
      }, this.props.children)
    }
  });

var Switch = React.createClass({
    getInitialState: function() {
        return {
            on: false
        };
    },
    onSwitch: function () {
        this.setState({ on: !this.state.on });
    },
    render: function () {
        return (<Click swipe handler={this.onSwitch} className={'switch' + (this.state.on ? ' on' : '')}>
            <div className="track">
                <div className="switch-toggle"></div>
            </div>
        </Click>);
    }
});

console.log(NavState);
var Link = React.createClass({
    mixins: [NavState],
    switchView: function () {
        this.transitionTo(this.props.to, this.props.params, this.props.query);
    },
    render: function () {
        return (
            <Click nodeName="a" href={this.props.to} handler={this.switchView}>
            {this.props.children}
            </Click>
        );
    }
});

var Forms = React.createClass({
    getInitialState: function() {
        return {
            isOn: false
        }
    },
    flip: function (e) {
        this.setState({isOn: !this.state.isOn});
    },
    render: function () {
        return (<div>
            <p><Click
                nodeName="button"
                handler={this.flip}
                className={this.state.isOn ? 'on' : ''}>
                Standard button
            </Click></p>
            <p><Switch /></p>
        </div>);
    }
});

var Other = React.createClass({
    render: function () {
        return (
            <div>Other</div>
        );
    }
});

module.exports = function() {

    var parentElement = document.getElementById('app');
    React.initializeTouchEvents(true);

    var App = React.createClass({
        mixins: [ Router.State ],
        render: function () {
            var name = this.getRoutes().reverse()[0].name;
            return (
                <div className="wrapper">
                    <header>
                      <ul className="nav">
                        <li><Link to="forms">Forms</Link></li>
                        <li><Link to="other">Other</Link></li>
                      </ul>
                    </header>
                    <TransitionGroup component="div" className="page-container" transitionName="moveOver">
                        <RouteHandler key={name} />
                    </TransitionGroup>
                </div>
            );
        }
    });

    var routes = (
      <Route name="app" path="/" handler={App}>
        <Route name="forms" handler={Forms}/>
        <Route name="other" handler={Other}/>
        <DefaultRoute handler={Forms}/>
      </Route>
    );
    // Router.HistoryLocation,
    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });

};
