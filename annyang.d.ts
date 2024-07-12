declare module 'annyang' {
  interface Annyang {
    addCommands(commands: { [key: string]: (...args: any[]) => void }): void;
    removeCommands(commands?: string | string[]): void;
    setLanguage(language: string): void;
    start(): void;
    abort(): void;
    isListening(): boolean;
  }

  const annyang: Annyang;
  export = annyang;
}
