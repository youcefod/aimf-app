const getRandomQuestionIndex = (excludeIndex = -1) => {
  const questionIndex = [0, 1, 2, 3, 4];
  if (excludeIndex > -1) {
    questionIndex.splice(questionIndex.indexOf(excludeIndex), 1);
  }
  return questionIndex[Math.floor(Math.random() * questionIndex.length)];
};

export default getRandomQuestionIndex;
