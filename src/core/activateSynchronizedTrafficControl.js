const synchronizeTicksFor = require('./synchronizeTicks');

module.exports = (registeredLights, startTrafficLightWith) => {
  registeredLights.forEach((registeredLight) => {
    if (registeredLight.started) {
      return;
    }
    registeredLight.started = true;
    startTrafficLightWith(registeredLight.lightColorTicker)
      .on('tick', synchronizeTicksFor(registeredLights));
  });
};
