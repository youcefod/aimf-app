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

export const getRandomQuestionIndex = (questions, excludeIndex = -1) => {
    // console.log('########### Debug #############');
    // console.log(questions);
    if (excludeIndex > -1 ) {
        questions.splice(excludeIndex, 1);
    }
    const index = Math.floor(Math.random() * questions.length);
    return index;
}