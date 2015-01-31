var React = require('react');

var DEFAULT_ANIMATION = 'forward';
var animationName = DEFAULT_ANIMATION;

var Animation = {

    getAnimation: function () {
        return animationName;
    },

    setAnimation: function (animation) {
        animationName = animation || DEFAULT_ANIMATION;
    }

    // statics: {
    //     willTransitionTo: function (transition, params, callback) {
    //         console.log(transition, params);
    //     },
    //     willTransitionFrom: function (transition, component) {
    //         console.log(component);
    //     }
    // }

};

module.exports = Animation;
