// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import getGoogleSheet from './getGoogleSheet';

// const GetInfromBySpread = () => {
//   const [googleSheetRows, setGoogleSheetRows] = useState([]);
//   const [places, setPlaces] = useState([]); // places[0]-[3] : 그-후-레-슬

//   useEffect(() => {
//     const fetchGoogleSheetData = async () => {
//       try {
//         // process.env.REACT_APP_SPREADSHEET_ID
//         const sheetId = '1NgDKPf2KJZhhKkPp1qbtzxyrNZ6b5hSqKGMtrNT9rPg';

//         // 구글 스프레드 시트에서 정보를 가져옵니다.
//         const rows = await getGoogleSheet(sheetId);
//         console.log(rows);
//         setGoogleSheetRows(rows);

//         // setPlaces(rows[0].class);
//         console.log(googleSheetRows);
//         console.log(googleSheetRows[0].class);

//         initInformAsync();
//         initQuestionAsync();
//       } catch (error) {
//         //에러 처리
//       }
//     };
    

//     // async/await를 사용한 비동기 함수 호출
//     const initInformAsync = async () => {
//       try {
     
//         await axios.post('http://localhost:3002/inform/', {
//             // 자료가 없을 때 한번만 추가되고 id가 중복된다고 500오류뜸.
//             id:1,
//             class: googleSheetRows[0].class,
//             그리핀도르: stringToArray(googleSheetRows[0].about),
//             후플푸프: stringToArray(googleSheetRows[1].about),
//             레번클로: stringToArray(googleSheetRows[2].about),
//             슬리데린: stringToArray(googleSheetRows[3].about)
//           });
//         console.log('데이터를 보내는중...');
        
//       } catch (error) {
//         console.error('데이터를 가져오는 중 에러 발생:', error);
//       }
//     };

//     fetchGoogleSheetData();
//   }, [googleSheetRows]);
  

//   function stringToArray(str) {
//     return str.split(/\s*,\s*/);
//   }

//   return <div>GetInfromBySpread</div>;
// };

// export default GetInfromBySpread;
