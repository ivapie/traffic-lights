const expect = require('chai').expect;
const lightColorStartingWith = require('../src/core/lightColor');
const synchronizeTicksFor = require('../src/core/synchronizeTicks');

describe('synchronizeTicks', () => {
  it('synchronize the YELLOW color tick between given lights', () => {
    const registeredLightBeingChangedTo = { lightColorTicker: lightColorStartingWith('YELLOW') };
    const registeredLightToSynchronize = { lightColorTicker: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };
    const registeredLights = [registeredLightBeingChangedTo, registeredLightToSynchronize];

    synchronizeTicksFor(registeredLights)(tickToYellow);

    expect(registeredLightToSynchronize.lightColorTicker.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the YELLOW color tick between given lights when registered in the inverse order', () => {
    const registeredLightBeingChangedTo = { lightColorTicker: lightColorStartingWith('YELLOW') };
    const registeredLightToSynchronize = { lightColorTicker: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };
    const invertedRegisteredLights = [registeredLightToSynchronize, registeredLightBeingChangedTo];

    synchronizeTicksFor(invertedRegisteredLights)(tickToYellow);

    expect(registeredLightToSynchronize.lightColorTicker.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the GREEN color tick between given lights', () => {
    const registeredLightBeingChangedTo = { lightColorTicker: lightColorStartingWith('GREEN') };
    const registeredLightToSynchronize = { lightColorTicker: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const registeredLights = [registeredLightBeingChangedTo, registeredLightToSynchronize];

    synchronizeTicksFor(registeredLights)(tickToGreen);

    expect(registeredLightToSynchronize.lightColorTicker.currentTick.color).to.equal('GREEN');
  });

  it('synchronize the GREEN color tick between given lights when registered in the inverse order', () => {
    const registeredLightBeingChangedTo = { lightColorTicker: lightColorStartingWith('GREEN') };
    const registeredLightToSynchronize = { lightColorTicker: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const invertedRegisteredLights = [registeredLightToSynchronize, registeredLightBeingChangedTo];

    synchronizeTicksFor(invertedRegisteredLights)(tickToGreen);

    expect(registeredLightToSynchronize.lightColorTicker.currentTick.color).to.equal('GREEN');
  });
});
