/*
    This is another pattern that relies on classes to approximate the job of higher order functions, but there's more layers of 
    abstraction over it. A command is associated purely with effects rather than computations, and the effects are coupled with
    the reversed effect that undoes the original one.

    On top of that you have the invoker, which provides an API for manipulating commands. Most implementations seem to keep a 
    history of all the commands, which allows undoing and looking back on previous commands, which is very useful. In my opinion a 
    better approach would be treat the Reciever as if it's immutable, and keep a history of Receiver instances throughout time. It's cleaner
    to keep track of data than to keep track of effects that change that data in my opinion. If you've ever used React, there's a large
    emphasis on treating data this way.
*/

{
  // Interface that specifies what a command should look like
  interface Command {
    execute: () => void;
    unexecute: () => void;
  }

  // Object we'd like to operate on
  class DogReciever {
    private isLegLifted: boolean;

    public liftLeg() {
      this.isLegLifted = true;
    }

    public dropLeg() {
      this.isLegLifted = false;
    }
  }

  // The concrete command object, essentially simulating a hof but coupling it with an undo command
  class LiftLegCommand {
    private readonly dogReciever: DogReciever;

    constructor(dogReciever: DogReciever) {
      this.dogReciever = dogReciever;
    }

    // Run this command, updating the internal state of the reciever
    public execute() {
      this.dogReciever.liftLeg();
    }

    // Undo any effect that execute() has made
    public unexecute() {
      this.dogReciever.dropLeg();
    }
  }

  // The invoker, which maintains a history of commands and can manipulate this history
  class DogInvoker {
    // Maintain two stacks, one for commands we've executed and one for commands not yet executed
    private readonly dogCommandsToExecute: Command[];
    private readonly dogCommandsExecuted: Command[];

    constructor() {
      this.dogCommandsToExecute = [];
      this.dogCommandsExecuted = [];
    }

    public pushDogCommand(dogCommand: Command) {
      this.dogCommandsToExecute.push(dogCommand);
    }

    public executeCommand() {
      this.dogCommandsToExecute[this.dogCommandsToExecute.length - 1].execute();

      this.dogCommandsExecuted.push(this.dogCommandsToExecute.pop());
    }

    public undoCommand() {
      this.dogCommandsToExecute.push(this.dogCommandsExecuted.pop());

      this.dogCommandsToExecute[
        this.dogCommandsToExecute.length - 1
      ].unexecute();
    }
  }
}
