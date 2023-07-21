import React, { useState } from 'react';
import Video from '../components/ResultPage/Video';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Result = ({ result, googleSheetRows, places, images }) => {
  const resultArr = result; // 주어진 배열

  const max = Math.max(...resultArr); // 배열에서 가장 큰 값 찾기

  // 배열 중 가장 큰 투표 받은 반의 인덱스 추출
  const index = resultArr.indexOf(max);
  /**
   * 정규식으로 str-> array로 바꾸기
   */
  const strToArray = (str) => {
    return str.split(/\s*,\s*/);
  };

  console.log('max->' + max);
  const duplicates = resultArr.filter((num) => num === max); // 가장 큰 값과 일치하는 원소들 찾기

  // duplicates.length === 1 ? console.log('겹치는게 없다') : console.log('겹치는게 많다');
  console.log(duplicates); // 겹치는 원소들 출력
  const quizLength = googleSheetRows.length;
  const yourClass = places[resultArr.indexOf(max)];

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  /**
   * 해당 인덱스에 정보가 담은 배열이 null이 아니면 정돈된 배열을 return 합니다.
   * @returns {sections} 배정된 기숙사에 해당된 정보 배열
   */
  const setAccordion = () => {
    const aboutArray = googleSheetRows[index]?.about ? strToArray(googleSheetRows[index].about) : [];
    console.log(aboutArray);

    let sections = [];

    for (let i = 0; i < aboutArray.length; i++) {
      sections.push(aboutArray[i]);
    }
    return sections;
  };

  // 댓글 페이지로 이동
  const navigate = useNavigate();
  const nanigation = () => {
    navigate('/comments');
  };

  return (
    <>
      <ResultContainer>
        {/* 기숙사 결과 */}
        <MainTitle>당신은 {yourClass}에 배정되었습니다.</MainTitle>
        <ResultBox>
          <Logo src={images[index]} alt="기숙사" />
          {/* 기숙사별 소속율 */}
          <Graph>
            {result.map((picked, i) => (
              <p key={i}>
                {places[i]}: {Math.round((picked / quizLength) * 100) + '%'}
              </p>
            ))}
          </Graph>
        </ResultBox>
        <ResultBox>
          <StButton>공유하기</StButton>
          <StButton onClick={nanigation}>이야기 나누기</StButton>
        </ResultBox>
        {/* 기숙사 알아보기 */}
        <div>
          <ContentTitle>{yourClass}에 대해 알아보기 </ContentTitle>
          <AccordionWrapper>
            {setAccordion().map((section, index) => (
              <Section key={index} onClick={() => toggleSection(index)}>
                {'정보 ' + (index + 1)}
                <Content isOpen={openSection === index}>{section}</Content>
              </Section>
            ))}
          </AccordionWrapper>
        </div>
        {/* 해리포터 기숙사 관련 Youtube 영상 */}
        <ContentTitle>해리포터 기숙사 배정 알아보기</ContentTitle>
        <Video />
      </ResultContainer>
    </>
  );
};

export default Result;

const ResultContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const MainTitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
  font-size: 30px;
  font-weight: bolder;
`;

const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 50px;
`;

const Logo = styled.img`
  width: 180px;
  height: 180px;
`;

const Graph = styled.div`
  margin-left: 50px;
  font-size: 18px;
  font-weight: bold;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
  margin: 20px 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;

const AccordionWrapper = styled.div`
  width: 100%;
`;

const Section = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 10px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const StButton = styled.button`
  width: 150px;
  height: 40px;
  font-size: 15px;
  font-weight: bolder;
  color: white;
  background-color: #202763;
  border: none;
  border-radius: 20px;
  margin: 0 10px 0 10px;
  cursor: pointer;
`;
