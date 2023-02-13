const Scooter = require('../src/Scooter')
const User = require('../src/User')

describe('Scooter', () => {
  let scooter;
  beforeEach(() => {
    scooter = new Scooter('station', 'user', 50, false);
  });

  test('rent method should update station to null and user to station1 if scooter is charged and not broken', () => {
    scooter.rent();
    expect(scooter.station).toBe(null);
    expect(scooter.user).toBe('station');
  });

  test('rent method should throw an error if scooter is not charged', () => {
    scooter.charge = 10;
    expect(() => {
      scooter.rent();
    }).toThrowError('scooter needs to charge');
  });

  test('rent method should throw an error if scooter is broken', () => {
    scooter.isBroken = true;
    expect(() => {
      scooter.rent();
    }).toThrowError('scooter needs to be repaired');
  });

  test('dock method should update station to station2 and user to null', () => {
    scooter.dock('station');
    expect(scooter.station).toBe('station');
    expect(scooter.user).toBe(null);
  });

  test('recharge method should increase charge of scooter by 1 every second', () => {
    jest.useFakeTimers();
    scooter.recharge();
    expect(scooter.charge).toBe(50);
    jest.advanceTimersByTime(1000);
    expect(scooter.charge).toBe(51);
    jest.runAllTimers();
    expect(scooter.charge).toBe(100);
  });

  test('requestRepair method should change isBroken to false', () => {
    const scooter = new Scooter("A Station", "A User", 50, true);
    scooter.requestRepair();
  
    setTimeout(() => {
      expect(scooter.isBroken).toBe(false);
    }, 5100);
  });
});
