export const generateRandomHexString = () => {
    const min = 16;
    const max = 255;
    let hexString = '#';
    for (let i = 0; i < 3; i++) {
      hexString += (randomize((max - min)) + min).toString(16);
    }
    return hexString;
  };

export const randomize = (max) => {
  return Math.floor(Math.random() * max);
};
