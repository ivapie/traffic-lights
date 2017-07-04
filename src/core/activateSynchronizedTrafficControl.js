const synchronizeTicksFor = require('./synchronizeTicks');

module.exports = (registeredLights, startTrafficLightWith) => {
  registeredLights.forEach((lightRegistration) => {
    if (lightRegistration.started) {
      return;
    }
    lightRegistration.started = true;
    startTrafficLightWith(lightRegistration.light)
      .on('tick', synchronizeTicksFor(registeredLights));
  });
};
