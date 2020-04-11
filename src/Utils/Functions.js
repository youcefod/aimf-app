export const isCorrectName = name => {
    return !!(!name.trim() || name.trim().match(/^[a-zA-Z]+(\s{0,1}[a-zA-Z ])*$/));
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

export const isCorrectPhoneNumber = phone => {
    return phone.match(/^0[1-9][0-9]{8}$/) ? true : false;
};


export const getFrDate = (date, time = false) => {
    return date.getDate().toString().padStart(2, "0") + '/' + ((parseInt(date.getMonth().toString()) + 1) + '') .padStart(2, "0") +
        '/' + date.getFullYear() + (time ? ' ' + date.getHours() + ':' + date.getMinutes() + ':' +date.getSeconds() : '')
        ;
};

export const getDateFromFr = frDate => {
    const date = frDate.split('/');
    return new Date(date[2] + '-' + date[1] + '-' + date[0]);
}

export const getFullName = ({lastname, firstname}) => {
    return lastname.toUpperCase() + ' ' + firstname.charAt(0).toUpperCase() +
        firstname.slice(1).toLowerCase();
}

export const getFormatedDate = (dateMillseconde) => {

    const d = new Date(dateMillseconde)
    const year = d.getFullYear() // 2019
    const date = d.getDate() // 23

    const months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ]

    const days = [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi'
      ]

    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]


    const dayIndex = d.getDay()
    const dayName = days[dayIndex]

    return `${dayName} ${date} ${monthName} ${year}`
       
}