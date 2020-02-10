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

export const getRandomQuestionIndex = (excludeIndex = -1) => {
    const questionIndex = [0, 1, 2, 3, 4];
    if (excludeIndex > -1 ) {
        questionIndex.splice(questionIndex.indexOf(excludeIndex), 1);
    }
    return questionIndex[Math.floor(Math.random() * questionIndex.length)];
}