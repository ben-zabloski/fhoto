export const serializeDate = (date: Date) =>
  date.toISOString().slice(0, -5).replace(/:+/g, '.');

export const deserializeDate = (value: string): Date =>
  new Date(value.replace(/\./g, ':'));
