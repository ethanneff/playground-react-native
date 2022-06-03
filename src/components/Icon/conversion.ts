const items = ['mdiAbTesting'];

const camelCaseToDash = (myStr: string) => {
  return myStr.replace(/[a-z][A-Z]/gu, '$1-$2').toLowerCase();
};

export const output = items.reduce((total: Record<string, string>, item) => {
  const dash = camelCaseToDash(item.replace('mdi', ''));
  total[dash] = `I.${item}`;
  return total;
}, {});
