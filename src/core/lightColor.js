const minutesToMillis = require('./minutesToMillis');

module.exports = function lightColorStartingWith(initialColor) {
  const tickFor = (color) => {
    switch(color) {
      case 'YELLOW':
        return {
          color: 'YELLOW',
          timeout: minutesToMillis(.5)
        };
      case 'GREEN':
        return {
          color: 'GREEN',
          timeout: minutesToMillis(5)
        };
      case 'RED':
        return {
          color: 'RED',
          timeout: minutesToMillis(5)
        };
    }
  };

  const nextTickFor = (currentTick) => {
    switch(currentTick.color) {
      case 'YELLOW':
        return tickFor('RED');
      case 'GREEN':
        return tickFor('YELLOW');
      case 'RED':
        return tickFor('GREEN');
    }
  };

  return {
    currentTick: tickFor(initialColor),
    tick: function() {
      return this.currentTick = nextTickFor(this.currentTick);
    },
    forceTickTo: function(color) {
      this.currentTick = tickFor(color);
    }
  };
};
