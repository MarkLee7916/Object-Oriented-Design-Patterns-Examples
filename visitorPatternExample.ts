/*
    The visitor pattern is a very nice pattern for decoupling objects from functionality. This is a nice way of making functionality more
    reusable and more modular as you can reason about a type of behaviour seperately from what the behaviour operates on. This is mainly useful
    for when you have a hierarchy of types, as this is a typical situation where this flexibility is needed.
    
    It seems like this is one of those design patterns that addresses a shortcoming in a programming language. 
    
    The reason we can't just apply method overloading directly to our data is because in languages like Java, C# and TypeScript, method overloading
    is done at compile time while interface/inheritance polymorphism is done at runtime. When we have a construct whose type is the interface 
    (i.e List<Integer> list = new ArrayList<>()) the compiler doesn't know the actual concrete type, so won't be able to determine which overloaded 
    method to call.

    A lot of examples have a generic visitor interface with method overloading for the types it has to visit, but I avoid this as it introduces
    inflexibility with the types. For instance a Salesman Visitor might want a different return type from a Customer Visitor, which is why they
    would be different interfaces. 

    One way of fixing this would be to paramaterize the interface, but method overloading for interfaces doesn't exist in TypeScript. Another
    way to fix this would to hardcode the type to void and get any data you need through mutation, but that's not a good solution as mutation
    is difficult to track and reason about.
*/

// Describes a type of person who'd want to deal with vehicles, although there may be more types of salesmen i.e honest, dishonest, by the book
interface SalesmanVisitor {
  getCarValue: (car: Car) => number;
  getTruckValue: (truck: Truck) => number;
}

// Describes a type of person who'd want to deal with vehicles, although there may be more types of mechanics i.e honest, dishonest, by the book
interface MechanicVisitor {
  getCarOpinion: (car: Car) => string;
  getTruckOpinion: (truck: Truck) => string;
}

// Standard interface for a vehicle, only necessary to demonstrate how this is likely to be used (i.e programming to interfaces)
interface Vehicle {
  getNumberOfWheels: () => number;
  getWheelPressure: () => number;
  getYearlyTax: () => number;
  acceptSalesman: (visitor: SalesmanVisitor) => number;
  acceptMechanic: (visitor: MechanicVisitor) => string;
}

// A concrete visitor that has their own idea of how to evaluate different types of vehicles
class HonestSalesmanVisitor implements SalesmanVisitor {
  getCarValue(car: Car) {
    return car.getNumberOfWheels() + car.getYearlyTax();
  }

  getTruckValue(truck: Truck) {
    return truck.getNumberOfWheels() + truck.getYearlyTax() - 5;
  }
}

// A concrete visitor that has their own idea of how to evaluate different types of vehicles
class DishonestSalesmanVisitor implements SalesmanVisitor {
  getCarValue(car: Car) {
    return 10 * (car.getNumberOfWheels() + car.getYearlyTax());
  }

  getTruckValue(truck: Truck) {
    return 10 * (truck.getNumberOfWheels() + truck.getYearlyTax() - 5);
  }
}

// A concrete visitor that has their own idea of how to evaluate different types of vehicles
class HonestMechanicVisitor implements MechanicVisitor {
  getCarOpinion(car: Car) {
    return car.getWheelPressure() > 100 ? "Looks good" : "Needs fixed";
  }

  getTruckOpinion(truck: Truck) {
    return truck.getWheelPressure() > 1000 ? "Looks good" : "Needs fixed";
  }
}

// A concrete visitor that has their own idea of how to evaluate different types of vehicles
class DishonestMechanicVisitor implements MechanicVisitor {
  getCarOpinion(car: Car) {
    return car.getWheelPressure() > 10000 ? "Looks good" : "Needs fixed";
  }

  getTruckOpinion(truck: Truck) {
    return truck.getWheelPressure() > 100000 ? "Looks good" : "Needs fixed";
  }
}

// A class for Cars, a type of vehicle that each Visitor evaluates separately
class Car implements Vehicle {
  private static readonly WHEEL_COUNT = 4;
  private static readonly PRESSURE = 0.25;
  private readonly weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  getNumberOfWheels() {
    return Car.WHEEL_COUNT;
  }

  getWheelPressure() {
    return (this.weight * Car.PRESSURE) / this.getNumberOfWheels();
  }

  getYearlyTax() {
    return Car.WHEEL_COUNT;
  }

  acceptSalesman(visitor: SalesmanVisitor) {
    return visitor.getCarValue(this);
  }

  acceptMechanic(visitor: MechanicVisitor) {
    return visitor.getCarOpinion(this);
  }
}

// A class for Trucks, a type of vehicle that each Visitor evaluates separately
class Truck implements Vehicle {
  private static readonly PRESSURE = 0.5;
  private readonly wheelCount: number;
  private readonly weight: number;
  private readonly loadWeight: number;

  constructor(weight: number, wheelCount: number, loadWeight: number) {
    this.weight = weight;
    this.wheelCount = wheelCount;
    this.loadWeight = loadWeight;
  }

  getNumberOfWheels() {
    return this.wheelCount;
  }

  getWheelPressure() {
    return (
      (this.weight * Truck.PRESSURE) /
      this.getNumberOfWheels() /
      this.loadWeight
    );
  }

  getYearlyTax() {
    return this.wheelCount * 1.23;
  }

  acceptSalesman(visitor: SalesmanVisitor) {
    return visitor.getTruckValue(this);
  }

  acceptMechanic(visitor: MechanicVisitor) {
    return visitor.getTruckOpinion(this);
  }
}

// Example of how this may be used
const vehicles: Vehicle[] = [new Car(10), new Truck(100, 8, 50)];

const honestSalesman = new HonestSalesmanVisitor();
const dishonestMechanic = new DishonestMechanicVisitor();

vehicles.forEach(vehicle => {
  const priceEvaluation = vehicle.acceptSalesman(honestSalesman);
  const needsFixed = vehicle.acceptMechanic(dishonestMechanic);

  console.log(priceEvaluation, needsFixed);
});
