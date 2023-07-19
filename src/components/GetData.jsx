import React, { useState } from 'react';
import { qnaList } from '../Data';

const GetData = () => {
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 인덱스 상태 추가
  const [answers, setAnswers] = useState([]); // 사용자가 선택한 답변들을 담을 상태 추가
  const object = qnaList; // 원본 배열

  // 중복 없이 랜덤한 인덱스 2개를 담을 결과 배열
  const randomObjects = [];
  while (randomObjects.length < 2) {
    const randomIndex = Math.floor(Math.random() * object.length);
    if (!randomObjects.includes(object[randomIndex])) {
      randomObjects.push(object[randomIndex]);
    }

    console.log(randomObjects)
  }

  const handleNextQuestion = (answerType) => {
    // 다음 질문 인덱스로 업데이트
    setQuestionIndex((prevIndex) => prevIndex + 1);
    // 선택한 답변을 answers 배열에 추가
    setAnswers((prevAnswers) => [...prevAnswers, answerType]);
  };

  // 질문을 모두 푼 경우
  if (questionIndex === randomObjects.length) {
    return (
      <div>
        
        <h1>모든 질문이 완료됐습니다!</h1>
        <h2>당신은 00 에 배정되었습니다!!</h2>
        <h3>선택한 답변들:</h3>
        {
          <>
            <p>그리핀도르:</p>
            <p>후블푸프:</p>
            <p>레번클로:</p>
            <p>슬리데린:</p>
          </>
        }
        {answers.map((answer, index) => (
          <>
            <span key={index}>{`${index + 1}번: ${answer} `}</span>
            <br />
            <></>
          </>
        ))}
      </div>
    );
  }

  return (
    <div>
      {randomObjects.map((v, index) => {
        if (index === questionIndex) {
          return (
            <div key={index}>
              <h1>{index + 1 + '/' + randomObjects.length}</h1>
              <h2>{v.q}</h2>
              {v.a.map((answer, answerIndex) => (
                <React.Fragment key={answerIndex}>
                  <button onClick={() => handleNextQuestion(answer.type)}>{answer.answer}</button>
                  <span>{answer.type}</span>
                  <br />
                </React.Fragment>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default GetData;
