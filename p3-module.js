//Possible Coin Values
const coinValues = [1, 5, 10, 25, 50, 100];

//Checks for valid coin value
const validDenomination = (coin) => coinValues.indexOf(coin) !== -1;

//Test Case
//console.log(validDenomination(6));

//Returns value of coin object containing a denomination and a count
//If not a valid denomination, nothing
const valueFromCoinObject = (obj) => {
  const { denom = 0, count = 0 } = obj;
  if (validDenomination(denom) == true) {
    return denom * count;
  } else {
    return 0;
  }
};

//Test Case
//console.log(valueFromCoinObject({ denom: 5, count: 10 }));

//Returns the sum of multiple coin objects
const valueFromArray = (arr) => {
  let sum = arr.reduce((acc, cur) => {
    return (acc += valueFromCoinObject(cur));
  }, 0);
  return sum;
};

//Test Case
/*
console.log(
  valueFromArray([
    { denom: 25, count: 2 },
    { denom: 1, count: 7 },
  ])
);
*/
//Export Function
const coinCount = (...coinage) => {
  return valueFromArray(coinage);
};

//Test Cases
/*
console.log("{}", coinCount({ denom: 5, count: 3 }));
console.log("{}s", coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
const coins = [
  { denom: 25, count: 2 },
  { denom: 1, count: 7 },
];
console.log("...[{}]", coinCount(...coins));
*/

module.exports = { coinCount };
