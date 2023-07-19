import React, { useEffect, useState } from 'react';
import getGoogleSheet from '../../libs/getGoogleSheet';

const Comment = () => {
  const [googleSheetRows, setGoogleSheetRows] = useState([]);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      const sheetId = '1T9ot-JOMlsEu5vFaeH3r4U7_xM3UE_Zdz0y1N-SyW_U';
      const rows = await getGoogleSheet(sheetId);
      console.log(rows);
      setGoogleSheetRows(rows);
    };

    fetchGoogleSheetData();
  }, []);

  return (
    <div>
      <div>안녕</div>
      {googleSheetRows.map((row, index) => (
        <div key={index}>
          {/* 여기서 행 데이터를 렌더링합니다 */}
          <p>{row['column1']}</p>
          <p>{row['column2']}</p>
          {/* 필요한 열(column)에 따라 출력을 조정합니다 */}
        </div>
      ))}
    </div>
  );
};

export default Comment;
