/*
    Personally, I feel like this pattern is obsolete in any language that has higher order functions. It essentially 
    approximates hofs by using stateless classes, which is a bit at odds with the original intended use of classes.

    Overall it's a good pattern if you're programming in a language that doesn't have hofs, as you get a lot of their power
    at the cost of the verbosity associated with having a layer of abstraction on top of the operations you'd like to execute.
*/

{
  // This class is the blueprint for a dog, with dependency injection
  class Dog {
    private readonly bark: Bark;
    private readonly jump: Jump;

    constructor(bark: Bark, jump: Jump) {
      this.bark = bark;
      this.jump = jump;
    }

    public executeBark() {
      return this.bark.bark();
    }

    public executeJump() {
      return this.jump.jump();
    }
  }

  // These interfaces create a generic type for whatever behaviour we want from a dog
  interface Bark {
    bark: () => string;
  }

  interface Jump {
    jump: () => string;
  }

  // These classes provide concrete implementations for the interface behaviour
  class BarkLoud implements Bark {
    public bark() {
      return "THIS IS A LOUD BARK BOI";
    }
  }

  class BarkQuiet implements Bark {
    public bark() {
      return "this is a rather quiet bark";
    }
  }

  class JumpHigh implements Jump {
    public jump() {
      return "Large                         jump";
    }
  }

  class JumpLow implements Jump {
    public jump() {
      return "Small  jump";
    }
  }

  // We can instantiate different permutations of dogs by mixing and matching behaviours
  const staffy = new Dog(new BarkLoud(), new JumpHigh());

  const greatDane = new Dog(new BarkLoud(), new JumpLow());

  const spaniel = new Dog(new BarkQuiet(), new JumpHigh());

  const yorkie = new Dog(new BarkQuiet(), new JumpLow());
}
