export const formatterBankBalance = (balance) => {
  let result = String(balance).split("");
  if (result.length <= 2) {
    result.unshift("0", ",");
    return result.join("");
  } else {
    result.splice(result.length - 2, 0, ",");
    return result.join("");
  }
};
