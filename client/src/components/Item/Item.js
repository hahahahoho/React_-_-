import React, {Component} from 'react';
import axios from 'axios';

const ListItem = ({item, readList})=>{
    let result = Object.values(item).map((value, index)=>(<li key={index} onClick={readList}>{value}</li>));
    return(
        <ul>
            {result}
        </ul>
    )
};
export default ListItem;
