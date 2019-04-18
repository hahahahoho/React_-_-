import React from 'react';
import BoardUpdate from 'components/BoardUpdate'
const boardUpdatePage = ({history}) => {
    return (
        <div>
            <BoardUpdate history={history}/>
        </div>
    );
};

export default boardUpdatePage;