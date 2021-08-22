/*
    I think this is a great pattern, especially when faced with a complex inheritance/interface hierarchy with lots of similar
    concrete classes. It can abstract out these hierarchies, leaving a system that looks much simpler from a client's point of view, 
    which is especially useful for hierachies that run deep and have lots of abstract classes lying in between the root of the
    tree and the concrete classes/leaves of the tree.

    It becomes even more useful if the concrete classes use constructor overloading, which is notoriously unreadable and doesn't say 
    anything of what the different constructors are actually for.
*/

{
  // Interface that specifies the traits of a condiment
  interface Condiment {
    getColor: () => string;
  }

  // Interface that specifies the traits of a condiment factory
  interface CondimentFactory {
    createCondiment: () => Condiment;
  }

  // Concrete condiment classes
  class Ketchup implements Condiment {
    public getColor() {
      return "red";
    }
  }

  class Mustard implements Condiment {
    public getColor() {
      return "yellow";
    }
  }

  class Mayo implements Condiment {
    public getColor() {
      return "white";
    }
  }

  // These factories allow us to use whatever means of generating condiment instances that our application needs
  class RandomCondimentFactory implements CondimentFactory {
    public createCondiment() {
      const randomNumBetweenZeroAndOne = Math.random();

      if (randomNumBetweenZeroAndOne < 0.33) {
        return new Ketchup();
      } else if (randomNumBetweenZeroAndOne > 0.66) {
        return new Mustard();
      } else {
        return new Mayo();
      }
    }
  }

  class RoundRobinCondimentFactory implements CondimentFactory {
    private lastCondimentCreated: Condiment;

    public createCondiment() {
      if (
        !this.lastCondimentCreated ||
        this.lastCondimentCreated instanceof Mayo
      ) {
        const ketchup = new Ketchup();
        this.lastCondimentCreated = ketchup;
        return ketchup;
      } else if (this.lastCondimentCreated instanceof Ketchup) {
        const mustard = new Mustard();
        this.lastCondimentCreated = mustard;
        return mustard;
      } else {
        const mayo = new Mayo();
        this.lastCondimentCreated = mayo;
        return mayo;
      }
    }
  }

  // Example of how this may be used
  const roundRobinCondimentFactory = new RoundRobinCondimentFactory();

  roundRobinCondimentFactory.createCondiment();
  roundRobinCondimentFactory.createCondiment();
  roundRobinCondimentFactory.createCondiment();
}
