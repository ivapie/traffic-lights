module.exports = (registeredLights) => (tickedLightBeingChanged) => {
  registeredLights.forEach((registeredLight) => {
    registeredLight.light.forceTickTo(tickedLightBeingChanged.color);
  });
};
