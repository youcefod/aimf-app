
export const isCorrectName = name => {
    return !name.trim() || name.trim().match(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/) ? true : false;
};

export const isCorrectEmailAddress = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email.trim()).toLowerCase());
};

export const isCorrectPassword = password => {
    return password.length > 5 ? true : false;
};

export const isCorrectZipCode = zipCode => {
    return zipCode.match(/^[0-9]{5}$/) ? true : false;
};

export const isCorrectPhone = phone => {
    return phone.match(/^0[1-9][1-9]{8}$/) ? true : false;
};


export const getFrDate = date => {
    return date.getDate().toString().padStart(2, "0") + '/' + date.getMonth().toString().padStart(2, "0") +
        '/' + birthDate.getFullYear()
        ;
};
