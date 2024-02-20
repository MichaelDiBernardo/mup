function dump(o: object): string {
  return JSON.stringify(o, null, 2);
}

export { dump };
