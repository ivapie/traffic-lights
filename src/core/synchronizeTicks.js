module.exports = (registeredLights) => (tickedLightBeingChanged) => {
  registeredLights.forEach((registeredLight) => {
    registeredLight.lightColorTicker.forceTickTo(tickedLightBeingChanged.color);
  });
};
