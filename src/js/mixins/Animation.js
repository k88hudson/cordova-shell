var React = require('react');
var DEFAULT_ANIMATION = 'forward';

// Cache current animation here
var animationName = DEFAULT_ANIMATION;

var Animation = {

    getAnimation: function () {
        return animationName;
    },

    setAnimation: function (animation) {
        animationName = animation || DEFAULT_ANIMATION;
    }

};

module.exports = Animation;
