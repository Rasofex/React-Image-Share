export function TranslatedName(name: string): string {
  return name
    .toLowerCase()
    .replace(' ', '')
    .replace('_', '-')
    .replace('(', '')
    .replace(')', '')
}
