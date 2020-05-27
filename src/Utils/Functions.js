import { DAYS, MONTHS, THAKHAROUBTS } from "./Constants";

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
  if (date instanceof Date) {
    return `${date.getDate().toString().padStart(2, "0")}/${`${
      parseInt(date.getMonth().toString(), 10) + 1
    }`.padStart(2, "0")}/${date.getFullYear()}${
      time ? date.toLocaleTimeString("fr") : ""
    }`;
  }
  return date;
};

export const isoDateToFr = (isoDate: string) => {
  const fullDate = isoDate.split(" ");
  const date = fullDate[0].split("-");
  const time = fullDate.length === 2 ? fullDate[1] : "";
  return `${date[2]}/${date[1]}/${date[0]} ${time}`;
};

export const getIsoDate = (date) => {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${`${
      parseInt(date.getMonth().toString(), 10) + 1
    }`.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  }
  return date;
};

export const formatDateAsApiDate = (dateMillseconde) => {
  const d = new Date(dateMillseconde);
  const year = d.getFullYear(); // 2019
  const month = `${parseInt(d.getMonth().toString(), 10) + 1}`.padStart(2, "0"); // 12
  const day = d.getDate().toString().padStart(2, "0"); // 01
  const hours = d.getHours(); // 18
  const minutes = d.getMinutes(); // 00

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateWithDayAndMonthName = (apiDate) => {
  let date = null;
  if (typeof apiDate === "number" || typeof apiDate === "object") {
    date = new Date(apiDate);
  } else {
    date = new Date(`${apiDate.substring(0, 10)}T${apiDate.substring(11, 20)}`);
  }

  return `${DAYS[date.getDay()]} ${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const getDateFromIso = (isoDate: string) => {
  const fullDate = isoDate.split(" ");
  const date = fullDate[0].split("-");
  const time =
    fullDate.length === 2 ? fullDate[1].split(":") : ["00", "00", "00"];
  return new Date(
    date[0],
    parseInt(date[1], 10) - 1,
    date[2],
    time[0],
    time[1],
    time[2]
  );
};

export const getFullName = ({ lastName, firstName }) => {
  return lastName && firstName
    ? `${lastName.toUpperCase()} ${firstName
        .charAt(0)
        .toUpperCase()}${firstName.slice(1).toLowerCase()}`
    : "";
};

export const formatKhatma = (id, beginAt, isOpen) => {
  return {
    id,
    beginAt,
    isOpen,
    takharoubts: THAKHAROUBTS,
  };
};

export const replaceElement = (arr, newElement) => {
  const newArr = Object.values(arr).filter((element) => {
    return element.id !== newElement.id;
  });
  return newArr.concat(newElement);
};
