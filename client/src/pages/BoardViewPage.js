import React from 'react';
import BoardView from 'components/BoardView'
const boardViewPage = ({history}) => {
    return (
        <div>
            <BoardView  history={history}/>
        </div>
    );
};

export default boardViewPage;