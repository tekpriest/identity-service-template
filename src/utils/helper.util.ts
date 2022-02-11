export const generateRandomString = (length: number): string => {
  const a = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
  let str = '';

  for (let i = 0; i < length; i++) {
    str += a[Math.floor(Math.random() * a.length)];
  }
  return str;
};

export const generateRandomNumber = (length: number): string => {
  const n = '1234567890';
  let str = '';
  for (let i = 0; i < length; i++) {
    str += n[Math.floor(Math.random() * n.length)];
  }
  return str;
};
