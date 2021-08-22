/*
    Overall I really like this pattern's flexibility. You can easily build up a suite of object extensions that you can
    use any time you want and apply to any valid object, which lets you handle lots of different cases during runtime that could 
    arise. This is why it's often used in GUI toolkits, as there's a massive number of combinations and permutations of operations
    that the user might want to use.

    The main caveat of this pattern for me is that it's quite unintuitive. The idea of wrapping a large number of objects around the 
    object you want to operate on, and combining composition and inheritance in opposite directions takes a bit of thinking to get
    your head around, and generally in programming these complex, unintuitive kinds of solutions are discouraged. Someone who's not familiar
    with this pattern will likely struggle to read this code and understand what it's doing.
*/

{
  // Interface for the type of class we want to extend
  interface Cat {
    makeNoise: () => string;
  }

  // Concrete class with a subset of the functionality we might need
  class HouseCat implements Cat {
    public makeNoise(): string {
      return "meow";
    }
  }

  // Interface for extending a cat
  class CatDecorator implements Cat {
    // Reference to the original concrete cat
    protected readonly cat: Cat;

    constructor(cat: Cat) {
      this.cat = cat;
    }

    public makeNoise() {
      return this.cat.makeNoise();
    }
  }

  // Decorator class that extends the functionality of a regular cat by reversing any noise it makes
  class ReverseNoiseDecorator extends CatDecorator {
    // Generic decorator class handles original object reference and constructor, so we just need to call super()
    constructor(cat: Cat) {
      super(cat);
    }

    // Modify makeNoise() by overriding CatDecorator method and apply some transformation to the output
    public makeNoise() {
      return Array.from(this.cat.makeNoise()).reverse().join("");
    }
  }

  // Decorator class that extends the functionality of a regular cat by amplifying any noise it makes
  class LoudenenNoiseDecorator extends CatDecorator {
    // Generic decorator class handles original object reference and constructor, so we just need to call super()
    constructor(cat: Cat) {
      super(cat);
    }

    // Modify makeNoise() by overriding CatDecorator method and apply some transformation to the output
    public makeNoise() {
      return this.cat.makeNoise().toUpperCase();
    }
  }

  // Create house cats with different permutations of extended functionality
  const loudReversedHouseCat = new LoudenenNoiseDecorator(
    new ReverseNoiseDecorator(new HouseCat())
  );

  const reversedHouseCat = new ReverseNoiseDecorator(new HouseCat());

  const loudHouseCat = new LoudenenNoiseDecorator(new HouseCat());

  const regularHouseCat = new HouseCat();
}
