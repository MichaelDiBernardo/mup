export const dump = (val: any): string => {
  return JSON.stringify(val, null, 2);
};
