/*
    This pattern makes use of inheritance to define an abstract class in terms of "template methods" and "primitive methods"

    "template methods" -> methods that are completely generic to any subclass, and define high level behaviour that every subclass must follow
    "primitive methods" -> these methods are typically abstract, and are up to the subclasses to implement

    The template methods are typically defined as a skeleton that controls high level behaviour, and the details are filled in by calling the
    primitive methods

    Overall this kind of templating behaviour is very common in programming. You see it quite a lot in functional programming as well, where
    high level functions can be configured to build lower level functions with specific goals in mind. The OO approach suffers from all the
    drawbacks that inheritance in general does, so I would be careful about using this pattern as it can lead to fragile code and code that
    is difficult to reuse in other scenarios due to the coupling between the template classes and concrete classes
*/
{
  // Defines a template that other classes can use to build new classes
  // The template here is for when we want to combine two functions to build a new function that does all the work
  abstract class FunctionalCompositionTemplate<S, I, O> {
    public compute(start: S): O {
      return this.computation2(this.computation1(start));
    }

    public abstract computation1(start: S): I;
    public abstract computation2(intermediate: I): O;
  }

  // Uses the template to build a class that stringifies objects and then halves them
  class StringifyHalve extends FunctionalCompositionTemplate<
    Object,
    string,
    string
  > {
    public computation1(object: Object) {
      return JSON.stringify(object);
    }

    public computation2(str: string) {
      return str.slice(0, str.length / 2);
    }
  }

  // Uses the template to build a class that adds two to a number and then doubles it
  class AddTwoAndDouble extends FunctionalCompositionTemplate<
    number,
    number,
    number
  > {
    public computation1(num: number) {
      return num + 2;
    }

    public computation2(num: number) {
      return num * 2;
    }
  }
}
