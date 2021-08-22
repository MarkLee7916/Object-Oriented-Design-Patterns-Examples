/*
    I really like this pattern, and I find it to be a simple and elegant solution to the problem of interface mismatching,
    which as first glance can look like an unsolvable problem. 
*/

{
  // Original interface that we want to adapt
  interface Doggo {
    walk: () => string;
    jump: () => string;
  }

  // Interface we want to adapt to
  interface Canine {
    stroll: () => string;
    leap: () => string;
  }

  // Original implementation, in most cases we wouldn't have access to internals of this class
  class GreatDaneDog implements Doggo {
    public walk() {
      return "W E        W A L K I N G";
    }

    public jump() {
      return "W E J U M P I N G";
    }
  }

  // Class that wraps the original GreatDaneDog class using composition and adapts it to the Canine interface
  class GreatDaneCanine implements Canine {
    private readonly greatDaneDog: GreatDaneDog;

    constructor(greatDaneDog: GreatDaneDog) {
      this.greatDaneDog = greatDaneDog;
    }

    public stroll() {
      return this.greatDaneDog.walk();
    }

    public leap() {
      return this.greatDaneDog.jump();
    }
  }

  // Example of how this may be used
  // This function only operates on objects of type Canine, so we need to use our adapted class to use the function
  function getDogToStroll(dog: Canine) {
    return dog.stroll();
  }

  // Create the canine adapter by passing in the original object we want to adapt
  getDogToStroll(new GreatDaneCanine(new GreatDaneDog()));
}
