export function convertToNumeric(value: string) {
  return Number(value.replace(/\s/g, '').replace('Eur', '').replace(',', '.'));
}

export function generateRandomNonZeroDecimal() {
  const decimal = Math.floor(Math.random() * 9) + 1;
  return decimal / 100;
}

export function addHours(date: Date, hours: number) {
  date.setHours(date.getHours() + hours);
  return date;
}

export function roundToNearest5(date = new Date()) {
  const minutes = 5;
  const ms = 1000 * 60 * minutes;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}

export function roundToNearest10(date = new Date()) {
  const minutes = 10;
  const ms = 1000 * 60 * minutes;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}