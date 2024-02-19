/**
 * Returns a uniform random integer in [min, max].
 * @param min lowest value to generate
 * @param max highest value to generate
 * @returns random integer in [min, max]
 */
function randint(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export { randint };
