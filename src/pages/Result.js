import React, { useState } from 'react';
import Video from '../components/ResultPage/Video';
// import Comment from '../components/ResultPage/Comment';
import Comments from '../components/ResultPage/Comments';
import Header from './Header';
import styled from 'styled-components';

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

  return (
    <div>
      <h2>기숙사 배정 결과</h2>
      <Header />
      <h1>모든 질문이 완료됐습니다!</h1>

      <h2>당신은 {yourClass}에 배정되었습니다!!</h2>
      <img src={images[index]} alt="기숙사" />

      {/* 기숙사별 소속율 */}
      <h2>&lt;세부정보&gt;</h2>
      {result.map((picked, i) => (
        <p key={i}>
          {places[i]}: {Math.round((picked / quizLength) * 100) + '%'}
        </p>
      ))}
      <h2>&lt;About {yourClass}&gt;</h2>
      <AccordionWrapper>
        {setAccordion().map((section, index) => (
          <Section key={index} onClick={() => toggleSection(index)}>
            {'정보 ' + (index + 1)}
            <Content isOpen={openSection === index}>{section}</Content>
          </Section>
        ))}
      </AccordionWrapper>

      {/* 해리포터 기숙사 관련 Youtube 영상 */}
      <Video />
      {/* 댓글창 */}
      <h2>댓글창</h2>
      {/* <Comment /> */}
      <Comments />
    </div>
  );
};

export default Result;

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
