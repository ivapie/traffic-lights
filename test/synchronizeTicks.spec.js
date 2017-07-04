const expect = require('chai').expect;
const lightColorStartingWith = require('../src/core/lightColor');
const synchronizeTicksFor = require('../src/core/synchronizeTicks');

describe('synchronizeTicks', () => {
  it('synchronize the YELLOW color tick between given lights', () => {
    const registeredLightBeingChangedTo = { light: lightColorStartingWith('YELLOW') };
    const registeredLightToSynchronize = { light: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };
    const registeredLights = [registeredLightBeingChangedTo, registeredLightToSynchronize];

    synchronizeTicksFor(registeredLights)(tickToYellow);

    expect(registeredLightToSynchronize.light.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the YELLOW color tick between given lights when registered in the inverse order', () => {
    const registeredLightBeingChangedTo = { light: lightColorStartingWith('YELLOW') };
    const registeredLightToSynchronize = { light: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };
    const invertedRegisteredLights = [registeredLightToSynchronize, registeredLightBeingChangedTo];

    synchronizeTicksFor(invertedRegisteredLights)(tickToYellow);

    expect(registeredLightToSynchronize.light.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the GREEN color tick between given lights', () => {
    const registeredLightBeingChangedTo = { light: lightColorStartingWith('GREEN') };
    const registeredLightToSynchronize = { light: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const registeredLights = [registeredLightBeingChangedTo, registeredLightToSynchronize];

    synchronizeTicksFor(registeredLights)(tickToGreen);

    expect(registeredLightToSynchronize.light.currentTick.color).to.equal('GREEN');
  });

  it('synchronize the GREEN color tick between given lights when registered in the inverse order', () => {
    const registeredLightBeingChangedTo = { light: lightColorStartingWith('GREEN') };
    const registeredLightToSynchronize = { light: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const invertedRegisteredLights = [registeredLightToSynchronize, registeredLightBeingChangedTo];

    synchronizeTicksFor(invertedRegisteredLights)(tickToGreen);

    expect(registeredLightToSynchronize.light.currentTick.color).to.equal('GREEN');
  });
});
