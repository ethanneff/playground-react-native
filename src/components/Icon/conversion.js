const items = ['mdiAbTesting'];

const camelCaseToDash = myStr => {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const output = items.reduce((total, item) => {
  const dash = camelCaseToDash(item.replace('mdi', ''));
  total[dash] = 'I.' + item;
  return total;
}, {});
