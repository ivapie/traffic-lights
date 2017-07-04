const chai = require('chai');
const sinon = require('sinon');
const lightColorStartingWith = require('../src/core/lightColor');
const minutesToMillis = require('../src/core/minutesToMillis');

const expect = chai.expect;
chai.use(require('sinon-chai'));

const synchronizeTicksFor = require('../src/core/synchronizeTicks');
const initializeVerticalTrafficLightControl = (startTrafficLightWith) => {
  const registeredVerticalLights = [];

  return {
    addNorth: (northLight) => {
      registeredVerticalLights.push({
        started: false,
        light: northLight
      });
    },
    addSouth: (southLight) => {
      registeredVerticalLights.push({
        started: false,
        light: southLight
      });
    },
    activate: () => {
      const activate = (verticalLights) => {
        verticalLights.forEach((lightRegistration) => {
          if (lightRegistration.started) {
            return;
          }
          lightRegistration.started = true;
          startTrafficLightWith(lightRegistration.light)
            .on('tick', synchronizeTicksFor(verticalLights));
        });
      };
      activate(registeredVerticalLights);
    }
  };
};

describe('verticalTrafficLightControl', () => {
  it('starts the traffic light once per activation', () => {
    const startTrafficLightSpy = sinon.stub().returns({ on: () => {} });
    const verticalTrafficLightControl = initializeVerticalTrafficLightControl(startTrafficLightSpy);
    verticalTrafficLightControl.addNorth(lightColorStartingWith('RED'));
    verticalTrafficLightControl.addSouth(lightColorStartingWith('RED'));
    verticalTrafficLightControl.activate();
    verticalTrafficLightControl.activate();
    expect(startTrafficLightSpy).to.have.been.calledTwice;
  });

  it('consistently switches north light to the same color whenever south light changes', () => {
    const southLightColorTicker = lightColorStartingWith('YELLOW');
    const northLightColorTicker = lightColorStartingWith('YELLOW');
    const FIFTEEN_SECONDS = minutesToMillis(.25);
    const clock = sinon.useFakeTimers();

    const verticalTrafficLightControl = initializeVerticalTrafficLightControl(require('../src/core/startTrafficLight'));
    verticalTrafficLightControl.addSouth(southLightColorTicker);
    verticalTrafficLightControl.activate();
    clock.tick(FIFTEEN_SECONDS);

    verticalTrafficLightControl.addNorth(northLightColorTicker);
    verticalTrafficLightControl.activate();

    clock.tick(FIFTEEN_SECONDS);

    expect(northLightColorTicker.currentTick.color).to.equal('RED');

    clock.restore();
  });
});
