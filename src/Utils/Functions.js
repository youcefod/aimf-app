export const isCorrectName = (name) => {
  return !!(
    !name ||
    !name.trim() ||
    name.trim().match(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/)
  );
};

export const isCorrectEmailAddress = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email.trim()).toLowerCase());
};

export const isCorrectPassword = (password) => {
  return password.length > 7;
};

export const isCorrectZipCode = (zipCode) => {
  return !!zipCode.match(/^[0-9]{5}$/);
};

export const isCorrectPhoneNumber = (phone) => {
  return !!phone.match(/^0[1-9][0-9]{8}$/);
};

export const getFrDate = (date, time = false) => {
  return `${date.getDate().toString().padStart(2, "0")}/${`${
    parseInt(date.getMonth().toString(), 10) + 1
  }`.padStart(2, "0")}/${date.getFullYear()}${
    time ? ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` : ""
  }`;
};

export const getIsoDate = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`${
      parseInt(date.getMonth().toString(), 10) + 1
    }`.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }
  return date;
};

export const getDateFromFr = (frDate) => {
  const date = frDate.split("/");
  return new Date(`${date[2]}-${date[1]}-${date[0]}`);
};

export const getFullName = ({ lastName, firstName }) => {
  return lastName && firstName
    ? `${lastName.toUpperCase()} ${firstName
        .charAt(0)
        .toUpperCase()}${firstName.slice(1).toLowerCase()}`
    : "";
};
