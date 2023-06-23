class BaseHelper {
  formatData(values) {
    Object.keys(values).forEach((item) => {
      if (!isNaN(values[item])) {
        values[item] = parseFloat(values[item]);
      } else {
      }
    });
    return values;
  }
  formatVND(value) {
    return value.toLocaleString("it-IT", {
      style: "currency",
      currency: "USD",
    });
  }
}

export default new BaseHelper();
