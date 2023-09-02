export class TranslatedName {
  name: string

  constructor(name: string) {
    this.name = name
      .toLowerCase()
      .replace(' ', '')
      .replace('_', '-')
      .replace('(', '')
      .replace(')', '')
  }
}
