import React, { useState } from 'react';

const Survey = () => {
  // 기숙사
  const [Gryffindor, setGryffindor] = useState(0);
  const [Ravenclaw, setRavenclaw] = useState(0);
  const [Slytherin, setSlytherin] = useState(0);
  const [Hufflepuff, setHufflepuff] = useState(0);

  // 질문
  const questions = [
    '기숙사의 문이 잠겼다. 어떻게 할 것인가?',
    '내가 가장 듣고 싶지 않은 말은?',
    '사람은 열명이나 의자는 일곱개 뿐인 상황, 어떻게 할까?'
  ];

  // 선택지
  const answers = [
    {
      Gryffindor: '일단 문을 부순다.',
      Ravenclaw: '열쇠를 찾는다.',
      Slytherin: '도구를 이용해 자물쇠를 딴다.',
      Hufflepuff: '안에 누가 있는 지 노크한다.'
    },
    {
      Gryffindor: '겁이 많다.',
      Ravenclaw: '무식하다.',
      Slytherin: '이기적이다.',
      Hufflepuff: '정이 없다.'
    },
    {
      Gryffindor: '상위 일곱명만 앉게 한다. ',
      Ravenclaw: '의자를 세 개 더 구해온다. ',
      Slytherin: '사람 셋을 없앤다.',
      Hufflepuff: '모두 공평하게 서 있게 한다.'
    }
  ];

  const handleAnswerClick = (house) => {
    setGryffindor(house === 'Gryffindor');
    setRavenclaw(house === 'Ravenclaw');
    setSlytherin(house === 'Slytherin');
    setHufflepuff(house === 'Hufflepuff');
  };

  console.log(Gryffindor);

  // 다음 페이지로 넘어가기

  return (
    <>
      <div>
        <div style={{ width: '300px', padding: '10px', border: '1px solid black' }}>{questions[0]}</div>
      </div>
      <div>
        <>
          <div
            style={{ width: '300px', padding: '10px', border: '1px solid black' }}
            onClick={() => handleAnswerClick('Gryffindor')}
          >
            {answers[0].Gryffindor}
          </div>
          <div
            style={{ width: '300px', padding: '10px', border: '1px solid black' }}
            onClick={() => handleAnswerClick('Ravenclaw')}
          >
            {answers[0].Ravenclaw}
          </div>
          <div
            style={{ width: '300px', padding: '10px', border: '1px solid black' }}
            onClick={() => handleAnswerClick('Hufflepuff')}
          >
            {answers[0].Hufflepuff}
          </div>
          <div
            style={{ width: '300px', padding: '10px', border: '1px solid black' }}
            onClick={() => handleAnswerClick('Slytherin')}
          >
            {answers[0].Slytherin}
          </div>
        </>
      </div>
    </>
  );
};

export default Survey;

// 1. 질문은 배열로, 선택지(각 기숙사 별로 1개씩 총 4개)는 객체의 배열로 만든다. (스프레드시트에 질문과 선택지 데이터를 저장?)
// 2. 기숙사 마다 useState를 만들고 초기값은 0으로 셋팅한다. (변화하는 값이니까?) -> 리덕스로 관리해야 하는걸까...
// 3. 첫번째 질문에는 첫번째 선택지들이 나오고, 다음 페이지로 넘어가면 두번째 질문과 두번째 선택지들이 나오도록 한다.
// 4. 선택지를 누르면 바로 다음 페이지로 넘어가고 싶다.
// ---> 어떻게? 인덱스로..? 인덱스를 useState로 만들고 선택지를 클릭하면
// ---> 인덱스state를 + 1씩 해서 그 인덱스에 해당하는 질문과 선택지를 보여준다?
// 5. 어떤 선택지를 누르면 해당 선택지에 맞는 기숙사에 숫자를 1씩 더해준다.
// 6. 만약 이전으로 돌아가서 다시 선택할 때는..? (모르겠다)
// 7. 마지막 선택지를 누르고 역시 해당 선택지에 알맞는 기숙사에 숫자를 1 더해주고,
// 8. 결과 페이지로 이동! 기숙사 별로 숫자를 비교해서 가장 높은 숫자를 가진 기숙사를 결과로 보여준다.
// 9. 근데 만약 수치가 똑같으면 우짜지~~~?
