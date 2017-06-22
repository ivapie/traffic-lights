module.exports = (lightColorTicker) => {
  const scheduleTickFor = (millis) => {
    setTimeout(() => {
      const ticked = lightColorTicker.tick();
      scheduleTickFor(ticked.timeout);
    }, millis);
  };
  scheduleTickFor(lightColorTicker.currentTick.timeout);
};
