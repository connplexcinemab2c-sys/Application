const StringValidation = (string: string) => {
  let validate;
  let stringValidation = /^[a-zA-Z0-9]+$/;
  let i: number;
  for (i = 0; i < string.length; i++) {
    if (stringValidation.test(string.charAt(i))) {
      validate = true;
      break;
    } else {
      validate = false;
    }
  }
  return validate;
};
const checkEmail = (value: string) => {
  //1. const condition = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const condition = new RegExp(
    /^[_a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]+)*@[a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]{3})*(?:\.[_a-za-zA-Z]{2,3})$/,
  );
  //2. const condition = new RegExp(
  //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*(\.\w{2,})+$/,
  // );
  return condition.test(value);
};
const checkPassword = (value: string) => {
  const condition = new RegExp(/.{6,}$/); // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/gm
  return condition.test(value);
};
const checkNumber = (value: string) => {
  const condition = new RegExp(/^[0-9-]{10}$/);
  return condition.test(value);
};
const checkNumeric = (value: string) => {
  const condition = new RegExp(/^[0-9]+$/);
  return condition.test(value);
};
const checkPswd = (value: string) => {
  const condition = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/+_]).{8,}$/,
  );
  return condition.test(value);
};
const checkName = (value: string) => {
  const condition = new RegExp(/^[A-Za-z0-9 ]+$/);
  return condition.test(value);
};

const checkNameString = (value: string) => {
  const condition = new RegExp(/^[A-zÀ-ú ]+$/);
  return condition.test(value);
};

const checkBlankString = (value: string) => {
  const condition = new RegExp(/^\S.*\S$/);
  return condition.test(value);
};

const checkString = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z ]+$/);
  return condition.test(value);
};
// const checkMobileNumber = (value: string) => {
//   const condition = new RegExp(/^(?!(\d)\1{4})(?!.*(\d)\2{4})[6789]\d{9}$/);
//   return condition.test(value);
// };

const checkMobileNumber = (value: string) => {
  const condition = new RegExp(/^[6-9][0-9]{9}$/);
  return condition.test(value);
};
const isValidUrl = (url: string): boolean => {
  const urlRegex =
    /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
  const result = url.match(urlRegex);

  return result !== null;
};
export const mobileNumberPattern = /^[6-9][0-9]{9}$/;
//1. export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//2. export const emailRegex =
//   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})*(\.\w{2,})+$/;
export const emailRegex =
  /^[_a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]+)*@[a-za-zA-Z0-9-]+(\.[_a-za-zA-Z0-9-]{3})*(?:\.[_a-za-zA-Z]{2,3})$/;

const capitalizeFirstLetter = (str: string | undefined) => {
  let tempString = str?.toLowerCase();
  return tempString?.replace(/\b(\w)/g, function (match) {
    return match.toUpperCase();
  });
};

const checkCity = (value: string) => {
  const condition = new RegExp(/^[A-Za-z\s\.\-]+$/);
  return condition.test(value);
};

const checkCompanyName = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/);
  return condition.test(value);
};

const checkNameSpace = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/);
  return condition.test(value);
};

const checkFirstNameSpace = (value: string) => {
  const condition = new RegExp(/^[A-Za-z]+( [A-Za-z]+)? ?$/);
  return condition.test(value);
};

export {
  StringValidation,
  checkEmail,
  checkPassword,
  checkNumber,
  checkPswd,
  checkName,
  checkString,
  checkNumeric,
  isValidUrl,
  checkMobileNumber,
  checkBlankString,
  checkNameString,
  capitalizeFirstLetter,
  checkCity,
  checkCompanyName,
  checkNameSpace,
  checkFirstNameSpace,
};
