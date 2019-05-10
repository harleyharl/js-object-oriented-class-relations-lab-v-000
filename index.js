let store = { drivers: [], passengers: [], trips: [] };

let driverId = 0
let passengerId = 0
let tripId = 0

class Driver {
    constructor(name) {
      this.id = ++driverId;
      this.name = name;
      store.drivers.push(this);
    }

    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.driverId === this.id;
            }.bind(this)
        );
      }

    passengers() {
        return store.passengers.filter(
            function(passenger) {
              return this.trips().filter(
                function(trip) {
                  return trip.passengerId === passenger.id
                }
              )
            }.bind(this)
        );
      }

      // can be refactored to
      // passengers() {
      //   return this.trips().map(trip => {
      //     return trip.passenger();
      //   });
      // }

}

class Passenger {
  constructor(name){
    this.id = ++passengerId
    this.name = name
    store.passengers.push(this)
  }

  trips() {
      return store.trips.filter(
          function(trip) {
              return trip.passengerId === this.id;
          }.bind(this)
      );
    }

  // drivers() {
  //     return store.drivers.filter(
  //         function(driver) {
  //             return this.trips().filter(
  //               function(trip) {
  //                 return trip.driverId == driver.tripId
  //               }
  //             )
  //         }.bind(this)
  //     );
  //   }

    // can refactor to this
    drivers() {
      return this.trips().map(trip => {
        return trip.driver();
      });
    }
}

class Trip {
  constructor(driver, passenger){
    this.id = ++tripId
    this.passengerId = passenger.id;
    this.driverId = driver.id;
    store.trips.push(this)
  }

  driver(){
    return store.drivers.find(
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this)
    )
  }

  passenger(){
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    )
  }

}
