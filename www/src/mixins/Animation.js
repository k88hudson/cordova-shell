var React = require('react');

var AnimationContext = {

    childContextTypes: {
        getAnimation: React.PropTypes.func.isRequired,
        setAnimation: React.PropTypes.func.isRequired
    },

    getAnimation: function () {
        return this.context.getAnimation();
    },

    setAnimation: function (animation) {
        return this.context.setAnimation(animation);
    },


};

module.exports = AnimationContext;
