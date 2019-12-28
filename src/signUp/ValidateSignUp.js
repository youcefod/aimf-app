import {isCorrectMobilePhone, isCorrectName, isCorrectEmailAddress, isCorrectPassword, isCorrectZipCode} from "../Utils/Functions";

export const checkFormValues = values => {

    if (!values.lastname) {
        return 'Veuillez renseigner votre nom';
    }
    if (!values.brother) {
        return 'Veuillez renseigner le nom de votre père';
    }
    if (!values.firstname) {
        return 'Veuillez renseigner votre prenom';
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
    if (!values.question1) {
        return 'Veuillez renseigner la réponse à la première question';
    }
    if (!values.question2) {
        return 'Veuillez renseigner la réponse à la deuxième question';
    }

    if (!isCorrectEmailAddress(values.email) ||
        !isCorrectName(values.lastname) ||
        !isCorrectName(values.firstname) ||
        !isCorrectName(values.maidename) ||
        !isCorrectMobilePhone(values.phoneNumber) ||
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