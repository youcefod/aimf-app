const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

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

export const getApiDate = (dateMillseconde) => {
  const d = new Date(dateMillseconde);
  const year = d.getFullYear(); // 2019
  const month = `${parseInt(d.getMonth().toString(), 10) + 1}`.padStart(2, "0"); // 12
  const day = d.getDate().toString().padStart(2, "0"); // 01
  const hours = d.getHours(); // 18
  const minutes = d.getMinutes(); // 00

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const getFormatedDate = (apiDate) => {
  let date = null;
  if (typeof apiDate === "number") {
    date = new Date(apiDate);
  } else {
    date = new Date(`${apiDate.substring(0, 10)}T${apiDate.substring(11, 20)}`);
  }

  return `${DAYS[date.getDay()]} ${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
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

export const formatKhatma = (id, beginAt, isOpen) => {
  return {
    id,
    beginAt,
    isOpen,
    takharoubts: [
      {
        id: 1,
        name: "El Bakara",
        order: 1,
        pickedTimes: 0,
      },
      {
        id: 2,
        name: "Al Imraan - Ennisaa",
        order: 2,
        pickedTimes: 0,
      },
      {
        id: 3,
        name: "El Maida - El Anaam",
        order: 3,
        pickedTimes: 0,
      },
      {
        id: 4,
        name: "El aaraf - El anfal",
        order: 4,
        pickedTimes: 0,
      },
      {
        id: 5,
        name: "Et attawba - Houd",
        order: 5,
        pickedTimes: 0,
      },
      {
        id: 6,
        name: "Youcef - El hIdjr",
        order: 6,
        pickedTimes: 0,
      },
      {
        id: 7,
        name: "El nahl - El Kahf",
        order: 7,
        pickedTimes: 0,
      },
      {
        id: 8,
        name: "Maryem - El hadj",
        order: 8,
        pickedTimes: 0,
      },
      {
        id: 9,
        name: "El mouminoun - Echouaraa",
        order: 9,
        pickedTimes: 0,
      },
      {
        id: 10,
        name: "Enaml - Essajda",
        order: 10,
        pickedTimes: 0,
      },
      {
        id: 11,
        name: "El hazab - Essafat",
        order: 11,
        pickedTimes: 0,
      },
      {
        id: 12,
        name: "Saad - Foussilat",
        order: 12,
        pickedTimes: 0,
      },
      {
        id: 13,
        name: "Echouraa - El kital",
        order: 13,
        pickedTimes: 0,
      },
      {
        id: 14,
        name: "El fatah - El kamar",
        order: 14,
        pickedTimes: 0,
      },
      {
        id: 15,
        name: "Errahman - Ettahrim",
        order: 15,
        pickedTimes: 0,
      },
      {
        id: 16,
        name: "El moulk - El khatima",
        order: 16,
        pickedTimes: 0,
      },
    ],
  };
};

export const updateArray = (arr, newElement) => {
  const newArr = Object.values(arr).filter((element) => {
    return element.id !== newElement.id;
  });
  return newArr.concat(newElement);
};
