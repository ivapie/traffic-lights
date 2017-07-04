const chai = require('chai');
const sinon = require('sinon');
const lightColorStartingWith = require('../src/core/lightColor');
const minutesToMillis = require('../src/core/minutesToMillis');

const expect = chai.expect;
chai.use(require('sinon-chai'));

const synchronizeTicksFor = require('../src/core/synchronizeTicks');
const initializeHorizontalTrafficLightControl = (startTrafficLightWith) => {
  const registeredLights = [];

  return {
    addWest: (northLight) => {
      registeredLights.push({
        started: false,
        light: northLight
      });
    },
    addEast: (southLight) => {
      registeredLights.push({
        started: false,
        light: southLight
      });
    },
    activate: () => {
      const activate = (registeredLights) => {
        registeredLights.forEach((lightRegistration) => {
          if (lightRegistration.started) {
            return;
          }
          lightRegistration.started = true;
          startTrafficLightWith(lightRegistration.light)
            .on('tick', synchronizeTicksFor(registeredLights));
        });
      };
      activate(registeredLights);
    }
  };
};

describe('horizontalTrafficLightControl', () => {
  it('starts the traffic light once per activation', () => {
    const startTrafficLightSpy = sinon.stub().returns({ on: () => {} });
    const horizontalTrafficLightControl = initializeHorizontalTrafficLightControl(startTrafficLightSpy);
    horizontalTrafficLightControl.addWest(lightColorStartingWith('RED'));
    horizontalTrafficLightControl.addEast(lightColorStartingWith('RED'));
    horizontalTrafficLightControl.activate();
    horizontalTrafficLightControl.activate();
    expect(startTrafficLightSpy).to.have.been.calledTwice;
  });

  it('consistently switches west light to the same color whenever east light changes', () => {
    const eastLightColorTicker = lightColorStartingWith('YELLOW');
    const westLightColorTicker = lightColorStartingWith('YELLOW');
    const FIFTEEN_SECONDS = minutesToMillis(.25);
    const clock = sinon.useFakeTimers();

    const horizontalTrafficLightControl = initializeHorizontalTrafficLightControl(require('../src/core/startTrafficLight'));
    horizontalTrafficLightControl.addEast(eastLightColorTicker);
    horizontalTrafficLightControl.activate();
    clock.tick(FIFTEEN_SECONDS);

    horizontalTrafficLightControl.addWest(westLightColorTicker);
    horizontalTrafficLightControl.activate();

    clock.tick(FIFTEEN_SECONDS);

    expect(westLightColorTicker.currentTick.color).to.equal('RED');

    clock.restore();
  });
});