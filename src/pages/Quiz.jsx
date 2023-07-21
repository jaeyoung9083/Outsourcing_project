import React, { useEffect, useState } from 'react';
import getGoogleSheet from '../getGoogleSheet';
import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';
import Result from '../components/ResultPage/Result';

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 인덱스 상태 추가
  const [googleSheetRows, setGoogleSheetRows] = useState([]);
  const [result, setResult] = useState([0, 0, 0, 0]);
  const [places, setPlaces] = useState([]); // places[0]-[3] : 그-후-레-슬
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // 기숙사별 이미지
  const [number, setNumber] = useState(5);
  const [pickedSheetRows, setPickedSheetRows] = useState([]);
  const totalQuizs = googleSheetRows.length;

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        // process.env.REACT_APP_SPREADSHEET_ID
        const sheetId = '1NgDKPf2KJZhhKkPp1qbtzxyrNZ6b5hSqKGMtrNT9rPg';
        setLoading(true);

        const rows = await getGoogleSheet(sheetId);
        console.log(rows);
        setGoogleSheetRows(rows);

        setPlaces(stringToArray(rows[0].class));
        setImages([rows[0].image, rows[1].image, rows[2].image, rows[3].image]);

        // 비동기 작업 완료 후 로딩 상태 업데이트
        setLoading(false);
      } catch (error) {
        //에러 처리
      }
    };

    fetchGoogleSheetData();
  }, []);

  /**
   * 하나의 문자열로 되어있는 걸 정규식 표현으로 문자열 배열 만들기
   */
  function stringToArray(str) {
    return str.split(/\s*,\s*/);
  }

  const getQuestionsByNumber = (number) => {
    // googleSheetRows 배열의 길이보다 number가 크거나 같다면, 모든 값을 선택하도록 합니다.
    if (number >= googleSheetRows.length) {
      setPickedSheetRows(googleSheetRows);
    } else {
      // googleSheetRows 배열의 복사본을 만듭니다.
      const copy = [...googleSheetRows];
      // 중복이 없는 랜덤한 순서로 값을 추출하여 pickedSheetRows 배열에 저장합니다.
      const pickedRows = [];
      for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        const pickedRow = copy.splice(randomIndex, 1)[0];
        pickedRows.push(pickedRow);
      }
      setPickedSheetRows(pickedRows);
    }
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 함수를 호출하도록 합니다.
  useEffect(() => {
    getQuestionsByNumber(5); // 예시로 5개의 값을 선택하도록 호출합니다.
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출하도록 합니다.

  const handleNextQuestion = (answerType) => {
    // 다음 질문 인덱스로 업데이트
    setQuestionIndex((prevIndex) => prevIndex + 1);
    // 선택한 답변을 answers 배열에 추가

    // 결과 통계를 위해 클릭이 발생하면 해당 자리에 숫자+1
    setResult((prevResult) => {
      const updatedResult = [...prevResult];
      updatedResult[answerType - 1] += 1;
      return updatedResult;
    });
  };

  // 질문을 모두 푼 경우
  if (pickedSheetRows.length !== 0 && questionIndex >= pickedSheetRows.length && !loading) {
    return (
      <div>
        {/* 결과 컴포넌트 */}
        <Result
          result={result}
          googleSheetRows={googleSheetRows}
          places={places}
          images={images}
          pickedSheetRows={pickedSheetRows}
        />
      </div>
    );
  }
  // 사용자가 숫자를 입력하면 number 상태를 업데이트하고 퀴즈를 새로 생성합니다.
  const handleNumberChange = (event) => {
    const newNumber = parseInt(event.target.value, 10);
    setNumber(newNumber);
  };
  const handleApplyButtonClick = () => {
    getQuestionsByNumber(number);
  };
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
      {/* 숫자를 입력하는 입력란 */}
      {!loading && (
        <>
          <Container>
            <Card>
              <CardTitle>최소 5이상 {totalQuizs}만큼 조정해주세요</CardTitle>
              <InputWrapper>
                <StyledInput
                  min="5"
                  max={totalQuizs}
                  type="number"
                  value={number}
                  onChange={handleNumberChange}
                  placeholder="퀴즈 개수를 입력하세요."
                />
                <InputButton onClick={handleApplyButtonClick}>적용</InputButton>
              </InputWrapper>
            </Card>
          </Container>
        </>
      )}

      {loading && (
        <BodyContainer>
          <Box sx={progressStyle}>
            <h2 style={{ color: 'white' }}>로딩중...</h2>
            <CircularProgress />
          </Box>
        </BodyContainer>
      )}
      {/* 문제를 생성합니다 */}
      {pickedSheetRows.map((v, index) => {
        if (index === questionIndex) {
          return (
            <CardWrapper key={index}>
              <Card>
                <h1>{index + 1 + '/' + pickedSheetRows.length}</h1>
                <h2>{v.q}</h2>

                {getResult(v.a, v.type).map((answer, answerIndex) => (
                  <React.Fragment key={answerIndex}>
                    <QuizButton onClick={() => handleNextQuestion(answer.type)}>{answer.answer}</QuizButton>

                    <br />
                  </React.Fragment>
                ))}
              </Card>
            </CardWrapper>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Quiz;

const progressStyle = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const BodyContainer = styled.div`
  margin: 0;
  padding: 0;
  background-image: url('data:image/jpeg;base64,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');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  height: 50vh; /* Adjust this as needed to fit your content */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled Components로 스타일링된 버튼 컴포넌트
const QuizButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 20px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 높이를 조정하여 카드를 원하는 위치에 맞게 정렬할 수 있습니다. */
  padding: 50px;
`;

const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  padding: 5px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
`;

const InputButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
