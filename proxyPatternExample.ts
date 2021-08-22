/*
    This is a very intuitive pattern, and is very effective for security or adding extra functionality. My main use case would probably
    be when using an object whose source code I don't have access to. In the case where you do have access to the source code, the issue
    is a little hairy. Seperating security from a base object has nice advantages, but the cost of operating at too many layers of abstraction
    in a highly decoupled system is quite high in terms of how easy your code is to understand. OO apps tend to have far more files
    and lines of code than their procedural and functional counterparts, but the tradeoff is sometimes worth it depending on how likely
    requirements are to change.

    I often use this pattern to provide a thin layer of abstraction over an object that requires some
    boilerplate to interact with. For example in JavaScript/TypeScript, I often wrap the default Map and Set classes with my
    own implementations that automatically stringify keys for when I want to use objects as keys, which saves me from having
    to stringify the keys manually every time I want to interact with them.
*/

{
  // Interface that specifies what methods the type should have, both the proxy and it's wrappee will implement this
  interface Car {
    drive: () => void;
  }

  // Interface for the object that we'd like to wrap
  class OpenCar implements Car {
    public drive() {
      console.log("driving!!");
    }
  }

  // Wraps around the original car and does age validation before allowing the car's methods to be accessed
  class SecureCarProxy implements Car {
    private readonly openCar: OpenCar;
    private readonly driverAge: number;

    constructor(openCar: OpenCar, driverAge: number) {
      this.openCar = openCar;
      this.driverAge = driverAge;
    }

    public drive() {
      if (this.isValidAge()) {
        this.openCar.drive();

        return "User is valid, car successfully driving!";
      } else {
        return "User is too young to drive!";
      }
    }

    private isValidAge() {
      return this.driverAge >= 17;
    }
  }

  // Example of how these may be used
  const secureCar = new SecureCarProxy(new OpenCar(), 16);

  secureCar.drive();
}
