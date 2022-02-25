export const formValidator = (name, value) => {
  switch (name) {
    case "name":
      const validate = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(value);
      return {
        [name]: !validate,
      };
    case "day":
      const validate1 = value.length > 0 && Number(value) <= 30 ? true : false;
      return {
        [name]: !validate1,
      };
    case "month":
      const validate2 = value.length > 0 && Number(value) <= 12 ? true : false;

      return {
        [name]: !validate2,
      };
    case "year":
      const validate3 =
        value.length > 0 && Number(value) < new Date().getFullYear()
          ? true
          : false;

      return {
        [name]: !validate3,
      };
    case "hour":
      const validate4 = Number(value) > 0 && Number(value) <= 12 ? true : false;
      return {
        [name]: !validate4,
      };
    case "min":
      const validate6 = Number(value) > 0 && Number(value) <= 60 ? true : false;

      return {
        [name]: !validate6,
      };
    case "city":
      const validate7 = value.length > 0 ? true : false;

      return {
        [name]: !validate7,
      };
    case "gender":
      const validate8 = value.length > 0 ? true : false;

      return {
        [name]: !validate8,
      };
    case "relation":
      const validate9 = value.length > 0 ? true : false;

      return {
        [name]: !validate9,
      };
  }
};
