import firebase from "react-native-firebase";

export const getQuestions = (setQuestions) => {
    const questions = [];
    firebase.firestore()
        .collection("questions")
        .get()
        .then(docs => {
            docs.forEach(function (doc) {
                questions.push(doc.data().question) ;
            });
            setQuestions(questions.splice(0, 5), 1);
            setQuestions(questions, 2);
        })
        .catch(error => {
            setQuestions([]);
        });
}

export const getRandomQuestion = (questions, excludeIndex = -1) => {
    if (excludeIndex > -1 ) {
        questions.splice(excludeIndex, 1);
    }
    return questions[Math.floor(Math.random() * questions.length)];
}