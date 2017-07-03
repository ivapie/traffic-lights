const expect = require('chai').expect;
const sinon = require('sinon');
const lightColorStartingWith = require('../src/core/lightColor');
const minutesToMillis = require('../src/core/minutesToMillis');
const startTrafficLightWith = require('../src/core/startTrafficLight');

describe('startTrafficLight', () => {
  it('changes the light from RED to GREEN after 5 minutes', () => {
    const lightColorTicker = lightColorStartingWith('RED');
    const clock = sinon.useFakeTimers();
    const FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5;

    startTrafficLightWith(lightColorTicker);

    clock.tick(FIVE_MINUTES_IN_MILLISECONDS - 1);
    expect(lightColorTicker.currentTick.color).to.equal('RED');

    clock.tick(+1);
    expect(lightColorTicker.currentTick.color).to.equal('GREEN');

    clock.restore();
  });

  it('changes the light from GREEN to YELLOW after 5 minutes', () => {
    const lightColorTicker = lightColorStartingWith('GREEN');
    const clock = sinon.useFakeTimers();
    const FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5;

    startTrafficLightWith(lightColorTicker);

    clock.tick(FIVE_MINUTES_IN_MILLISECONDS - 1);
    expect(lightColorTicker.currentTick.color).to.equal('GREEN');

    clock.tick(+1);
    expect(lightColorTicker.currentTick.color).to.equal('YELLOW');

    clock.restore();
  });

  it('changes the light from YELLOW to RED after 30 seconds', () => {
    const lightColorTicker = lightColorStartingWith('YELLOW');
    const clock = sinon.useFakeTimers();
    const THIRTY_SECONDS_IN_MILLISECONDS = 1000 * 30;

    startTrafficLightWith(lightColorTicker);

    clock.tick(THIRTY_SECONDS_IN_MILLISECONDS);
    expect(lightColorTicker.currentTick.color).to.equal('RED');

    clock.restore();
  });

  it('changes the light from YELLOW to RED after 30 seconds after initialization', () => {
    const lightColorTicker = lightColorStartingWith('GREEN');
    const clock = sinon.useFakeTimers();
    startTrafficLightWith(lightColorTicker);

    const FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5;
    clock.tick(FIVE_MINUTES_IN_MILLISECONDS);
    expect(lightColorTicker.currentTick.color).to.equal('YELLOW');

    const THIRTY_SECONDS_IN_MILLISECONDS = 1000 * 30;
    clock.tick(THIRTY_SECONDS_IN_MILLISECONDS);
    expect(lightColorTicker.currentTick.color).to.equal('RED');

    clock.restore();
  });

  it('notify listeners when light color changes', () => {
    const lightColorTicker = lightColorStartingWith('RED');
    const clock = sinon.useFakeTimers();
    const handleOnTickSpy = sinon.spy();

    const startedTrafficLight = startTrafficLightWith(lightColorTicker);
    startedTrafficLight.on('tick', handleOnTickSpy);

    clock.tick(FIVE_MINUTES_IN_MILLISECONDS = 1000 * 60 * 5);

    expect(handleOnTickSpy).to.have.been.calledWith({
      color: 'GREEN',
      timeout: 300000
    });

    clock.restore();
  });
});
