
export const isCorrectName = name => {
    return name.match(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/) ? true : false;
};

export const isCorrectEmailAddress = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
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
