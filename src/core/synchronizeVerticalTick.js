module.exports = (lightRegistration, verticalLights) => (ticked) => {
  verticalLights.forEach((registeredVerticalLight) => {
    registeredVerticalLight.light.forceTickTo(ticked.color);
  });
};
