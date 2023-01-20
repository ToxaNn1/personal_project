export const convertorISO4217 = (code) => {
  let currency = "";
  switch (code) {
    case (code = 840):
      currency = "USD";
      break;
    case (code = 980):
      currency = "UAH";
      break;
    case (code = 978):
      currency = "EUR";
      break;
  }
  return currency;
};
