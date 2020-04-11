import {
    _getKoran, 
    _getKhatma,
    _saveKhatma }
from './_DATA'


export function getKoran() {
    return _getKoran()
        .then(koran => ({
            koran 
        }))
}


export function getKhatmaApi () {
    return _getKhatma()
        .then(khatma => ({
            khatma 
        }))
}

export function saveKhatmaApi (date) {
    return _saveKhatma(date)
}