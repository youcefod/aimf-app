import {
    isCorrectPhoneNumber,
    isCorrectName,
    isCorrectEmailAddress,
    isCorrectPassword,
    isCorrectZipCode
} from "../../Utils/Functions";
import {CREATE_ACTION, MARRIED, UPDATE_ACTION} from "../../Utils/Constants";

export const checkFormValues = values => {

    if (!values.gender) {
        return 'Veuillez renseigner votre sexe';
    }
    if (!values.lastname) {
        return 'Veuillez renseigner votre nom';
    }
    if (!values.father) {
        return 'Veuillez renseigner le nom de votre père';
    }
    if (!values.firstname) {
        return 'Veuillez renseigner votre prenom';
    }
    if (!values.conjugalSituation) {
        return 'Veuillez renseigner votre situation conjugale';
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
    if (values.action === CREATE_ACTION) {
        if (!values.response1) {
            return 'Veuillez renseigner la réponse à la première question';
        }
        if (!values.response2) {
            return 'Veuillez renseigner la réponse à la deuxième question';
        }
    }
    if (values.action === UPDATE_ACTION && !values.fonction) {
        return 'Veuillez renseigner votre fonction';
    }
    if (values.action === UPDATE_ACTION && values.conjugalSituation === MARRIED && !(parseInt(values.numberOfChildren, 10) >= 0)) {
        return 'Veuillez renseigner le nombre de vos enfants';
    }
    const errorsPAssword = (values.action === CREATE_ACTION && (!isCorrectPassword(values.newPassword) ||
        !isCorrectPassword(values.confirmPassword)));

    if (!isCorrectEmailAddress(values.email) ||
        !isCorrectName(values.lastname) ||
        !isCorrectName(values.firstname) ||
        !isCorrectName(values.middlename) ||
        !values.action === UPDATE_ACTION && isCorrectName(values.fonction) ||
        !isCorrectPhoneNumber(values.phoneNumber) ||
        !isCorrectZipCode(values.zipCode) ||
        errorsPAssword

    ) {
        return 'Veuillez corriger les erreurs affichées dans le formulaire';
    }

    if (values.newPassword != values.confirmPassword) {
        return 'Les deux mots de passe doivent êtres identiques';
    }

    if (values.action === UPDATE_ACTION && values.currentPassword && (!values.newPassword || !values.confirmPassword)) {
        return 'Veuillez remplir le nouveau mot de passe et la confirmation de celui-ci';
    }
    return null;
}