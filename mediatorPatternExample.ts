/*
    This pattern reminds me of the observer pattern in a lot of ways. The mediator is roughly analogous to an observable, and the colleagues
    are roughly analagous to observers. The structure is similar, but the way in which the pattern is used is different. The observer pattern
    is used to watch for some object's internal state, while the mediator pattern is used as a way of letting objects easily communicate
    with 1..N different objects in an object graph. The mediator provides a structure that allows one object to easily access any other object, 
    without having to maintain N^2 references between each one, which would quickly become infeasible. It's much cleaner to delegate all of that
    to one single mediator, and have every colleague be able to notify the mediator.
*/

{
  // A class that defines all the behaviour we want from a mediator, designed to be extended but doesn't have to be
  class Mediator {
    // A list of all colleagues we can send a message to
    private readonly colleagues: Colleague[];

    constructor() {
      this.colleagues = [];
    }

    // Add a collague to our list and add ourselves as the colleagues mediator
    public registerColleague(colleague: Colleague) {
      this.colleagues.push(colleague);

      colleague.registerMediator(this);
    }

    // Send a message to every colleague
    public sendMessageToAllColleagues(from: string, message: string) {
      this.sendMessageToColleaguesOn(from, message, _ => true);
    }

    // Send a message to every colleague that satisfies the predicate
    public sendMessageToColleaguesOn(
      from: string,
      message: string,
      predicate: (colleague: Colleague) => boolean
    ) {
      this.colleagues
        .filter(predicate)
        .forEach(colleague => colleague.recieveMessage(from, message));
    }
  }

  // A class that some of the behaviour we want from a colleague, although we still need to say what to do when they recieve a message
  abstract class Colleague {
    private mediator: Mediator;
    private readonly name: string;

    constructor(name: string) {
      this.name = name;
    }

    public getName() {
      return this.name;
    }

    public registerMediator(mediator: Mediator) {
      this.mediator = mediator;
    }

    public abstract recieveMessage(from: string, message: string): void;

    public sendMessageToAllColleagues(message: string) {
      this.mediator.sendMessageToAllColleagues(this.name, message);
    }

    public sendMessageToColleaguesOn(
      message: string,
      predicate: (colleague: Colleague) => boolean
    ) {
      this.mediator.sendMessageToColleaguesOn(this.name, message, predicate);
    }
  }

  class User extends Colleague {
    public recieveMessage(from: string, message: string) {
      console.log(
        `${this.getName()} has recieved message: ${message} from: ${from}`
      );
    }
  }

  // An example of how this might be used
  const chatRoom = new Mediator();
  const jonny = new User("Jonny");
  const jill = new User("Jill");
  const raskolnikov = new User("raskolnikov");

  chatRoom.registerColleague(jonny);
  chatRoom.registerColleague(jill);
  chatRoom.registerColleague(raskolnikov);

  chatRoom.sendMessageToAllColleagues("global", "Hello");
  jonny.sendMessageToAllColleagues("How you doin");
  jill.sendMessageToColleaguesOn(
    "Hello to anyone who's not raskolnikov",
    colleague => colleague.getName() !== "raskolnikov"
  );
}
