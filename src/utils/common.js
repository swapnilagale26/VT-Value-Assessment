export const scoreCalculator = (data) => {
  function calculateSum(arr, properties) {
    return arr.reduce((accumulator, obj) => {
      properties.forEach((property) => {
        accumulator[property] = (accumulator[property] || 0) + obj[property];
      });
      return accumulator;
    }, {});
  }
  const scoreArray = data.map((i) => i.archetypes);
  const total = calculateSum(scoreArray, Object.keys(scoreArray[0]));
  
  return total;
};

export const findHighestKeysAndValues = (obj) => {
  let highestKeys = [];
  let highestValue = -Infinity;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value > highestValue) {
        highestKeys = [key];
        highestValue = value;
      } else if (value === highestValue) {
        highestKeys.push(key);
      }
    }
  }
  const highestKeyValues = {};
  highestKeys.forEach((key) => {
    highestKeyValues[key] = highestValue;
  });

  return highestKeyValues;
};
