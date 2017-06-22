const expect = require('chai').expect;
const sinon = require('sinon');
const lightColorStartingWith = require('../src/core/lightColor');
const minutesToMillis = require('../src/core/minutesToMillis');

describe('lightColor', () => {
  it('switches from RED to GREEN', () => {
    const lightColorTicker = lightColorStartingWith('RED');
    expect(lightColorTicker.currentTick.timeout).to.equal(minutesToMillis(5));

    const tick = lightColorTicker.tick();
    expect(tick.color).to.equal('GREEN');
    expect(tick.timeout).to.equal(minutesToMillis(5));
  });

  it('switches from GREEN to YELLOW', () => {
    const lightColorTicker = lightColorStartingWith('GREEN');
    const tick = lightColorTicker.tick();
    expect(tick.color).to.equal('YELLOW');
    expect(tick.timeout).to.equal(minutesToMillis(.5));
  });

  it('switches from YELLOW to RED', () => {
    const lightColorTicker = lightColorStartingWith('YELLOW');
    expect(lightColorTicker.currentTick.timeout).to.equal(minutesToMillis(.5));

    const tick = lightColorTicker.tick();
    expect(tick.color).to.equal('RED');
    expect(tick.timeout).to.equal(minutesToMillis(5));
  });
});
