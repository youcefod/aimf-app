import {isCorrectPhone, isCorrectName, isCorrectEmailAddress, isCorrectPassword, isCorrectZipCode} from "../Utils/Functions";

export const checkFormValues = values => {

    if (!values.lastname) {
        return 'Veuillez renseigner votre nome';
    }
    if (!values.firstname) {
        return 'Veuillez renseigner votre prenome';
    }
    if (!values.birthDate) {
        return 'Veuillez renseigner votre date de naissance';
    }
    if (!values.zipCode) {
        return 'Veuillez renseigner votre code postal';
    }
    if (!values.phoneNumber) {
        return 'Veuillez renseigner votre numéro de téléphone';
    }
    if (!values.email) {
        return 'Veuillez renseigner votre email';
    }

    if (!isCorrectEmailAddress(values.email) ||
        !isCorrectName(values.lastname) ||
        !isCorrectName(values.firstname) ||
        !isCorrectName(values.maidename) ||
        !isCorrectPhone(values.phoneNumber) ||
        !isCorrectPhone(values.phoneNumber) ||
        !isCorrectZipCode(values.zipCode) ||
        !isCorrectPassword(values.password)||
        !isCorrectPassword(values.confirmPassword)

    ) {
        return 'Veuillez corriger les erreurs dans le formulaire';
    }

    if (values.password != values.confirmPassword) {
        return 'Les deux mots de passe doivent êtres identiques';
    }

    return null;
}