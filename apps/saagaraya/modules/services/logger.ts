export class Logger {
  constructor(private scope: string) {}

  public log(message: string) {
    console.log(`[${this.scope}] ${message}`);
  }

  public warn(message: string) {
    console.warn(`[${this.scope}] ${message}`);
  }

  public error(message: string) {
    console.error(`[${this.scope}] ${message}`);
  }
}
