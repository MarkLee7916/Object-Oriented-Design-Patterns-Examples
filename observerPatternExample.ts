/* 
   Overall I like this pattern and find it very useful when using it alongside the model view controller pattern. 
   In a language with callbacks you could get the observers to pass in update functions rather that using an interface. 
*/

{
  interface Observer {
    update: () => void;
  }

  // An observable class designed to be extended, provides methods to manipulate observer list
  class Observable {
    protected readonly observers: Observer[];

    constructor() {
      this.observers = [];
    }

    public addObserver(observer: Observer) {
      this.observers.push(observer);
    }

    public removeObserver(observer: Observer) {
      const indexToRemove = this.observers.lastIndexOf(observer);

      this.observers.splice(indexToRemove, 1);
    }

    public countObservers() {
      return this.observers.length;
    }

    public clearObservers() {
      this.observers.length = 0;
    }

    public notify() {
      this.observers.forEach(observer => observer.update());
    }
  }

  // Class we want to observe, with internal state that is of interest to other classes
  class Thermometer extends Observable {
    private temperature: number;

    public getTemperature() {
      return this.temperature;
    }
  }

  // Classes that observe the Thermometer, and change behaviour depending on what thermometers state is
  class Heater implements Observer {
    private isHeating: boolean;
    private readonly thermometer: Thermometer;
    private static readonly TEMPERATURE_THRESHOLD = 10;

    constructor(thermometer: Thermometer) {
      thermometer.addObserver(this);

      this.thermometer = thermometer;
      this.update();
    }

    public update() {
      this.isHeating =
        this.thermometer.getTemperature() < Heater.TEMPERATURE_THRESHOLD;
    }

    public getIsHeating() {
      return this.isHeating;
    }
  }

  class TemperatureWarning implements Observer {
    private warning: string;
    private readonly thermometer: Thermometer;
    private static readonly WARNING_THRESHOLD = 20;

    constructor(thermometer: Thermometer) {
      thermometer.addObserver(this);

      this.thermometer = thermometer;
      this.update();
    }

    public update() {
      this.warning =
        this.thermometer.getTemperature() < TemperatureWarning.WARNING_THRESHOLD
          ? "Everything is fine"
          : "Overheating, panic!";
    }

    public getWarning() {
      return this.warning;
    }
  }

  // Example of how these might be instantiated
  const thermometer = new Thermometer();
  const heater = new Heater(thermometer);
  const temperatureWarning = new TemperatureWarning(thermometer);
}
