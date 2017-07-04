module.exports = (registeredLights) => (tickedLightBeingChanged) => {
  registeredLights
    .map((registeredLight) => registeredLight.lightColorTicker)
    .forEach((registeredLightColorTicker) => {
      registeredLightColorTicker.forceTickTo(tickedLightBeingChanged.color);
    });
};
