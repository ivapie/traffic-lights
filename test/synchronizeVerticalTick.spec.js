const expect = require('chai').expect;
const lightColorStartingWith = require('../src/core/lightColor');
const synchronizeVerticalTickFor = require('../src/core/synchronizeVerticalTick');

describe('synchronizeVerticalTick', () => {
  it('synchronize the YELLOW color between lights', () => {
    const lightBeingChangedTo = { light: lightColorStartingWith('YELLOW') };
    const lightToSynchronize = { light: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };

    const registeredVerticalLights = [
      lightBeingChangedTo,
      lightToSynchronize
    ];
    synchronizeVerticalTickFor(
      lightBeingChangedTo,
      registeredVerticalLights
    )(tickToYellow);
    expect(lightToSynchronize.light.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the YELLOW color between lights for inverted registration', () => {
    const lightBeingChangedTo = { light: lightColorStartingWith('YELLOW') };
    const lightToSynchronize = { light: lightColorStartingWith('GREEN') };
    const tickToYellow = { color: 'YELLOW' };

    const invertedVerticalLightsRegistration = [
      lightToSynchronize,
      lightBeingChangedTo
    ];
    synchronizeVerticalTickFor(
      lightBeingChangedTo,
      invertedVerticalLightsRegistration
    )(tickToYellow);
    expect(lightToSynchronize.light.currentTick.color).to.equal('YELLOW');
  });

  it('synchronize the GREEN color between lights', () => {
    const lightBeingChangedTo = { light: lightColorStartingWith('GREEN') };
    const lightToSynchronize = { light: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const registeredVerticalLights = [
      lightBeingChangedTo,
      lightToSynchronize
    ];
    synchronizeVerticalTickFor(
      lightBeingChangedTo,
      registeredVerticalLights
    )(tickToGreen);
    expect(lightToSynchronize.light.currentTick.color).to.equal('GREEN');
  });

  it('synchronize the GREEN color between lights for inverted registration', () => {
    const lightBeingChangedTo = { light: lightColorStartingWith('GREEN') };
    const lightToSynchronize = { light: lightColorStartingWith('RED') };
    const tickToGreen = { color: 'GREEN' };
    const invertedVerticalLightsRegistration = [
      lightToSynchronize,
      lightBeingChangedTo
    ];
    synchronizeVerticalTickFor(
      lightBeingChangedTo,
      invertedVerticalLightsRegistration
    )(tickToGreen);
    expect(lightToSynchronize.light.currentTick.color).to.equal('GREEN');
  });
});
