/*
    To be honest I'm not really sure how much of a "pattern" this is, rather than an intuitive result of favouring composition over
    inheritance. To me the main thing is that the abstractions and implementations (or as I prefer to call them, the wrappers and wrappees)
    conform to interfaces that allow them to be mixed and matched independently. If we didn't force them to conform to interfaces, then we
    would lose this flexibilty, as one implementation's API might end up differing from anothers, which would mean that the abstraction would
    have to pick one or the other when deciding how it implements its methods.
*/

{
  // This acts as the "abstraction", although in this case it's just an interface with a has-a relationship to a concrete interface
  interface Room {
    rest: () => string;
  }

  // This acts as the "implementation"
  interface Furniture {
    sit: (duration: number) => string;
  }

  // A conrete implementation of a room, with a has-a relationship that works with any furniture
  class Conservatory implements Room {
    private readonly furniture: Furniture;
    private static readonly REST_DURATION = 1;

    constructor(furniture: Furniture) {
      this.furniture = furniture;
    }

    public rest() {
      return this.furniture.sit(Conservatory.REST_DURATION);
    }
  }

  // A conrete implementation of a room, with a has-a relationship that works with any furniture
  class LivingRoom implements Room {
    private readonly furniture: Furniture;
    private static readonly REST_DURATION = 8;

    constructor(furniture: Furniture) {
      this.furniture = furniture;
    }

    public rest() {
      return this.furniture.sit(LivingRoom.REST_DURATION);
    }
  }

  // A concrete implementation of a piece of furniture, which will be injected into a room
  class Couch implements Furniture {
    public sit(duration: number) {
      return duration > 2 ? "My back hurts" : "That was a good TV show";
    }
  }

  // A concrete implementation of a piece of furniture, which will be injected into a room
  class Bed implements Furniture {
    public sit(duration: number) {
      return duration > 3
        ? "Oh no I fell asleep I was supposed to be at work hours ago"
        : "Always good to have a rest";
    }
  }
}
