export class Logger {
  constructor(private scope: string) {}

  public log(message: string, ...optionalParams: unknown[]) {
    console.log(`[${this.scope}] ${message} 🌊`, ...optionalParams);
  }

  public warn(message: string, ...optionalParams: unknown[]) {
    console.warn(`[${this.scope}] ${message} 🌊`, ...optionalParams);
  }

  public error(message: string, ...optionalParams: unknown[]) {
    console.error(`[${this.scope}] ${message} 🌊`, ...optionalParams);
  }
}
