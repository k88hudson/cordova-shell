var React = require('react');

var AnimationContext = {

  childContextTypes: {
    setAnimation: React.PropTypes.func.isRequired
  },

  getAnimation: function () {
    return this.state.animation;
  },

  setAnimation: function (animation) {
    this.setState({animation: animation});
  },

  getChildContext: function () {
    return {
      getAnimation: this.getAnimation,
      setAnimation: this.setAnimation
    };
  }

};

module.exports = AnimationContext;
