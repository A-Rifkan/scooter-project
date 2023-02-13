const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const ScooterApp = require('./ScooterApp');

describe('ScooterApp', () => {
  describe('stations property', () => {
    let app;

    beforeEach(() => {
      app = new ScooterApp();
    });

    it('should be an object', () => {
      expect(typeof app.stations).toBe('object');
    });

    it('should have at least 3 keys', () => {
      expect(Object.keys(app.stations).length).toBeGreaterThanOrEqual(3);
    });

    it('should have values that are arrays', () => {
      Object.values(app.stations).forEach(value => {
        expect(Array.isArray(value)).toBe(true);
      });
    });

    it('should have empty arrays as values initially', () => {
      Object.values(app.stations).forEach(value => {
        expect(value.length).toBe(0);
      });
    });
    describe('ScooterApp registeredUsers property', () => {
        let scooterApp;
      
        beforeEach(() => {
          scooterApp = new ScooterApp();
        });
      
        test('registeredUsers is an object', () => {
          expect(typeof scooterApp.registeredUsers).toBe('object');
        });
      
        test('registeredUsers keys are usernames', () => {
          const username = 'user1';
          const user = new User(username, 'password', 18);
          scooterApp.registerUser(user);
      
          expect(scooterApp.registeredUsers[username]).toBeDefined();
          expect(scooterApp.registeredUsers[username]).toEqual(user);
        });
      
        test('registering a new user adds it to registeredUsers', () => {
          const username = 'user2';
          const user = new User(username, 'password', 20);
          scooterApp.registerUser(user);
      
          expect(scooterApp.registeredUsers[username]).toBeDefined();
          expect(scooterApp.registeredUsers[username]).toEqual(user);
        });
      
        test('registeredUsers is initially empty', () => {
          expect(Object.keys(scooterApp.registeredUsers).length).toBe(0);
        });
      });
      describe('registerUser', () => {
        let scooterApp;
        
        beforeEach(() => {
          scooterApp = new ScooterApp();
        });
        
        test('registers a new user if they are 18 or older and not already registered', () => {
          const user = scooterApp.registerUser('johndoe', 'secret', 18);
          expect(user).toEqual({
            username: 'johndoe',
            password: 'secret',
            age: 18,
            scooter: null,
            isLoggedIn: false
          });
          expect(scooterApp.registeredUsers).toHaveProperty('johndoe');
          expect(scooterApp.registeredUsers['johndoe']).toEqual({
            username: 'johndoe',
            password: 'secret',
            age: 18,
            scooter: null,
            isLoggedIn: false
          });
        });
        
        test('throws error if user is already registered', () => {
          scooterApp.registeredUsers['johndoe'] = {
            username: 'johndoe',
            password: 'secret',
            age: 18,
            scooter: null,
            isLoggedIn: false
          };
          expect(() => {
            scooterApp.registerUser('johndoe', 'secret', 18);
          }).toThrowError('User already registered');
        });
        
        test('throws error if user is under 18 years old', () => {
          expect(() => {
            scooterApp.registerUser('johndoe', 'secret', 17);
          }).toThrowError('User too young to register');
        });
      });
      describe("loginUser", () => {
        let app;
      
        beforeEach(() => {
          app = new ScooterApp();
          app.registerUser("user1", "password", 18);
        });
      
        it("logs in a registered user with correct password", () => {
          const user = app.loginUser("user1", "password");
          expect(user.loggedIn).toBe(true);
          expect(console.log).toHaveBeenCalledWith("user1 has been logged in");
        });
      
        it("throws an error if the user is not registered", () => {
          expect(() => app.loginUser("user2", "password")).toThrowError(
            "Username or password is incorrect"
          );
        });
      
        it("throws an error if the password is incorrect", () => {
          expect(() => app.loginUser("user1", "incorrect")).toThrowError(
            "Username or password is incorrect"
          );
        });
      });
      describe('logoutUser', () => {
        it('should logout a registered user', () => {
          const scooterApp = new ScooterApp();
      
          const registeredUser = scooterApp.registerUser('JohnDoe', 'password123', 21);
          scooterApp.loginUser('JohnDoe', 'password123');
      
          const logoutResult = scooterApp.logoutUser('JohnDoe');
      
          expect(logoutResult).toBe('User JohnDoe is logged out');
        });
      
        it('should throw an error if the user is not registered', () => {
          const scooterApp = new ScooterApp();
      
          expect(() => {
            scooterApp.logoutUser('JaneDoe');
          }).toThrowError('No such user is logged in');
        });
      });
      describe('createScooter', () => {
        it('creates a new scooter and adds it to the specified station', () => {
          const scooterApp = new ScooterApp();
          const station = 'Central Park';
      
          scooterApp.createScooter(station);
          const scootersAtStation = scooterApp.stations[station];
      
          expect(scootersAtStation).toHaveLength(1);
          expect(scootersAtStation[0]).toBeInstanceOf(Scooter);
          expect(scootersAtStation[0].station).toBe(station);
        });
      
        it('throws an error if the specified station does not exist', () => {
          const scooterApp = new ScooterApp();
          const station = 'Non-existent Station';
      
          expect(() => scooterApp.createScooter(station)).toThrowError('No such station');
        });
      });
      describe("dockScooter", () => {
        test("docks a scooter to a station", () => {
          const scooter = new Scooter();
          const station = "station1";
          const app = new ScooterApp();
      
          // Add a scooter to the station list
          app.dockScooter(scooter, station);
          expect(app.stations[station]).toContain(scooter);
          expect(scooter.docked).toBe(true);
        });
      
        test("throws error if station does not exist", () => {
          const scooter = new Scooter();
          const station = "invalid_station";
          const app = new ScooterApp();
      
          expect(() => app.dockScooter(scooter, station)).toThrowError(
            "no such station error"
          );
        });
      
        test("throws error if scooter already at station", () => {
          const scooter = new Scooter();
          const station = "station1";
          const app = new ScooterApp();
      
          app.dockScooter(scooter, station);
          expect(() => app.dockScooter(scooter, station)).toThrowError(
            "scooter already at station error"
          );
        });
      });
      
      describe("rentScooter", () => {
        test("rents a scooter to a user", () => {
          const scooter = new Scooter();
          const user = new User("user1", "password", 18);
          const station = "station1";
          const app = new ScooterApp();
      
          app.dockScooter(scooter, station);
          app.rentScooter(scooter, user);
      
          expect(app.stations[station]).not.toContain(scooter);
          expect(scooter.user).toBe(user);
          expect(scooter.docked).toBe(false);
        });
      
        test("throws error if scooter is already rented", () => {
          const scooter = new Scooter();
          const user = new User("user1", "password", 18);
          const station = "station1";
          const app = new ScooterApp();
      
          app.dockScooter(scooter, station);
          app.rentScooter(scooter, user);
          expect(() => app.rentScooter(scooter, user)).toThrowError(
            "scooter already rented"
          );
        });
      });
      describe('ScooterApp print method', () => {
        let app;
        beforeEach(() => {
          app = new ScooterApp();
        });
      
        test('Logs registered users and stations with scooters count', () => {
          // Register a user
          app.registerUser('john', 'password', 25);
      
          // Create a scooter and dock it at a station
          const scooter = app.createScooter('station1');
          app.dockScooter(scooter, 'station1');
      
          // Spy on the console.log method to capture its output
          jest.spyOn(console, 'log').mockImplementation(() => {});
      
          // Call the print method
          app.print();
      
          // Check that the correct output was logged to the console
          expect(console.log).toHaveBeenCalledWith('Registered Users:');
          expect(console.log).toHaveBeenCalledWith({ 'john': { username: 'john', age: 25, isLoggedIn: false } });
          expect(console.log).toHaveBeenCalledWith('Stations:');
          expect(console.log).toHaveBeenCalledWith({ 'station1': [{ id: expect.any(Number), station: 'station1', isRented: false }] });
        });
      });
  });
});
