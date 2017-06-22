const minutesToMillis = require('./minutesToMillis');

module.exports = function lightColorStartingWith(initialColor) {
  return {
    currentTick: {
      color: initialColor,
      timeout: initialColor === 'YELLOW' ? 30000 : 300000
    },
    tick: function() {
      if (this.currentTick.color === 'YELLOW') {
        this.currentTick = {
          color: 'RED',
          timeout: minutesToMillis(5)
        };
      } else if (this.currentTick.color === 'GREEN') {
        this.currentTick = {
          color: 'YELLOW',
          timeout: minutesToMillis(.5)
        };
      } else if (this.currentTick.color === 'RED') {
        this.currentTick = {
          color: 'GREEN',
          timeout: minutesToMillis(5)
        };
      }
      return this.currentTick;
    }
  };
};
