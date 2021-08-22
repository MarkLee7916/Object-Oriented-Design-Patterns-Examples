/*
    This pattern reminds me of finite state machines, which are a staple of an undergrad computing science course. The main difference is that
    all behaviours are implemented uniformly across all of the states, which is better for extensibilty as you can easily extend the number of
    behaviours a state can implement if it was previously only implementing a small subset of the total states.

    In my opinion long chains of conditionals in a function are sometimes a bit of an antipattern. They are a typical sign of the single 
    responsibilty principle being broken, as we're performing lots of different tasks depending on some conditions. This pattern provides a nice 
    alternative by using the state objects to encapsulate behaviours for specific states, meaning that we don't have to keep checking what
    the state is. I'm not sure if this would extend to more complicated conditionals, where conditions are based on combinations of states i.e
    if (state1 and state2 || not state3) etc
*/

{
  interface AbstractState {
    cancel(): string;
    book(): string;
  }

  // A state for bookings that have been cancelled
  class CancelledState implements AbstractState {
    private readonly oldID: number;
    private readonly context: Context;

    constructor(oldID: number, context: Context) {
      this.oldID = oldID;
      this.context = context;
    }

    public cancel() {
      return "You've already cancelled this!";
    }

    public book() {
      this.context.setCurrentState(new PendingState(this.oldID, this.context));
      return `Rebooked using old ID: ${this.oldID}`;
    }
  }

  // A state where nothing has been booked yet
  class OpenState implements AbstractState {
    private readonly context: Context;

    constructor(context: Context) {
      this.context = context;
    }

    public cancel() {
      return "You haven't booked anything yet";
    }

    public book() {
      const id = Math.random() * 100;

      this.context.setCurrentState(new PendingState(id, this.context));
      return `Event booked with id: ${id}`;
    }
  }

  // A state where a booking has already been made and confirmed
  class BookedState implements AbstractState {
    private readonly id: number;
    private readonly context: Context;

    constructor(id: number, context: Context) {
      this.context = context;
    }

    public cancel() {
      this.context.setCurrentState(new CancelledState(this.id, this.context));
      return "Event cancelled";
    }

    public book() {
      return "You've already booked this event!";
    }
  }

  // A state where a booking has been made but not confirmed
  class PendingState implements AbstractState {
    private static readonly BOOKING_DELAY = 10000;

    constructor(id: number, context: Context) {
      setTimeout(() => {
        context.setCurrentState(new BookedState(id, context));
      }, PendingState.BOOKING_DELAY);
    }

    public cancel() {
      return "Please wait for booking to load before performing an action!";
    }

    public book() {
      return "Please wait for booking to load before performing an action!";
    }
  }

  // Main application that holds the state, passed into the state objects as a parameter (has-a)
  class Context {
    private currentState: AbstractState;

    constructor() {
      this.currentState = new OpenState(this);
    }

    public setCurrentState(newState: AbstractState) {
      this.currentState = newState;
    }
  }
}
