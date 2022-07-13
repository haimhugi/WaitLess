import React from 'react';
import { useContext, useState } from 'react';

import { List, Button } from 'antd';


import './Categories.css'
import CategoryContext from '../../store/category-context';
import AddCategory from './AddCategory';


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


    const [addCategoryOn, setAddCategoryOn] = useState(false);

    const showAddCategoryOn = () => {
        setAddCategoryOn(true);
    }
    const hideAddCategoryOn = () => {
        setAddCategoryOn(false);
    }

    const categoryCtx = useContext(CategoryContext);
    console.log('context is ' + categoryCtx.pickedCategory);



    return (
        <div>
            <h2 orientation="right">קטגוריות</h2>
            <List
                className='list'
                size="large"
                dataSource={data}
                renderItem={item =>
                    <List.Item>
                        <Button onClick={() => categoryCtx.changeCategory(item)}>{item}</Button>
                    </List.Item>}
            >
                {props.isAdmin && <List.Item >
                    <Button className='addCategory' onClick={showAddCategoryOn}>הוסף קטגוריה</Button>
                </List.Item>}
            </List>
            {addCategoryOn && props.isAdmin && <AddCategory onClose={hideAddCategoryOn} />}
        </div >
    );
};



export default Categories;