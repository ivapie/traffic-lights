module.exports = (lightColorTicker) => {
  let tickEvent = () => {};
  const scheduleTickFor = (millis) => {
    setTimeout(() => {
      const ticked = lightColorTicker.tick();
      tickEvent(ticked);
      scheduleTickFor(ticked.timeout);
    }, millis);
  };
  scheduleTickFor(lightColorTicker.currentTick.timeout);
  return {
    on: (eventName, callback) => {
      // TODO Use an event emitter when consumers start to require multiple
      //      event registration.
      //      At the moment of this, I choose to build the simplest
      //      implementation which satisfied my use case while making a robust
      //      interface to be extended later.
      tickEvent = callback
    }
  };
};
