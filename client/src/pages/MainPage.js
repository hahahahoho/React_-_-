import React from 'react';
import BoardList from  'components/BoardList';
import List from 'components/Chain_list_view'
const MainPage = () => {
    let fastival_data_field = ['id','type','subtype', 'keyword', 'title'];
    let notice_field = ['NO', 'CONTENTS', 'WRITER', 'CREATE_DATE', 'TITLE']
    let params = {
        
    }
    return (
        <div>
            {/* <BoardList tName="fastival_data" target={fastival_data_field}></BoardList>
            <BoardList tName="notices" target={notice_field}></BoardList> */}
            <List></List>
        </div>
    );
};

export default MainPage;