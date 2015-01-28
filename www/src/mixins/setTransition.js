var React = require('react');

var setTransition = {
    childContextTypes: {
        getAnimation: React.PropTypes.func.isRequired,
        setAnimation: React.PropTypes.func.isRequired
    },
    getTransition: function () {
        return this.context.transitionName;
    },
    setTransition: function (className) {
        this.context.transitionName = className;
    }
};

module.exports = setTransition;
