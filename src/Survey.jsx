import React, { useEffect, useState } from 'react';
import getGoogleSheet from './getGoogleSheet';

const Survey = () => {
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 인덱스 상태 추가
  const [answers, setAnswers] = useState([]); // 사용자가 선택한 답변들을 담을 상태 추가

  const [googleSheetRows, setGoogleSheetRows] = useState([]);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      // process.env.REACT_APP_SPREADSHEET_ID
      const sheetId = '1NgDKPf2KJZhhKkPp1qbtzxyrNZ6b5hSqKGMtrNT9rPg';
      const rows = await getGoogleSheet(sheetId);
      console.log(rows);
      setGoogleSheetRows(rows);
    };

    fetchGoogleSheetData();
  }, []);

  const handleNextQuestion = (answerType) => {
    // 다음 질문 인덱스로 업데이트
    setQuestionIndex((prevIndex) => prevIndex + 1);
    // 선택한 답변을 answers 배열에 추가
    setAnswers((prevAnswers) => [...prevAnswers, answerType]);
  };

  // 질문을 모두 푼 경우
  if (questionIndex === googleSheetRows.length) {
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

  const getResult = (v1, v2) => {
    // 정규 표현식
    const result1 = v1.split(/\s*,\s*/);
    const result2 = v2.split(/\s*,\s*/);

    const result = result1.map((item, index) => {
      //[{answer: "", type: 1}, {answer: "", type: 1}...]

      return {
        answer: item,
        type: result2[index]
      };
    });

    return result;
  };

  return (
    <div>
      {googleSheetRows.map((v, index) => {
        if (index === questionIndex) {
          return (
            <div key={index}>
              <h1>{index + 1 + '/' + googleSheetRows.length}</h1>
              <h2>{v.q}</h2>

              {getResult(v.a, v.type).map((answer, answerIndex) => (
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

  //   return (
  //     <div>
  //       {googleSheetRows.map((row, index) => (
  //         <div key={index}>
  //           {/* 여기서 행 데이터를 렌더링합니다 */}
  //           <p>{row['q']}</p>
  //           <p>{row['a']}</p>
  //           {/* 필요한 열(column)에 따라 출력을 조정합니다 */}
  //         </div>
  //       ))}
  //     </div>
  //   );
};

export default Survey;
