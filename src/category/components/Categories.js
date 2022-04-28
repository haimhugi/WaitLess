import React from 'react';
import { useContext } from 'react';

import { List, Button } from 'antd';


import './Categories.css'
import CategoryContext from '../../store/category-context';

const data = [
    'הכל',
    'ארוחות בוקר',
    'ארוחות ילדים',
    'ראשונות',
    'כריכים',
    'שקשוקות',
    'טוסטים',
    'מהתנור',
    'סלטים',
    'פסטות',
    'עיקריות',
    'משקאות',
    'קינוחים',
];







const Categories = props => {

    const categoryCtx = useContext(CategoryContext);
    console.log('context is ' + categoryCtx.pickedCategory);



    return (
        <div>
            <h2 orientation="right">קטגוריות</h2>
            <List
                className='list'
                size="large"
                dataSource={data}
                renderItem={item => <List.Item>
                    <Button onClick={() => categoryCtx.changeCategory(item)}>{item}</Button>
                </List.Item>}
            />
        </div>
    );
};



export default Categories;