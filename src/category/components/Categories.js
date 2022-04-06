import React from 'react';
import { List, Divider } from 'antd';

const data = [
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
    return (
        <div>
            <Divider orientation="right">קטגוריות</Divider>
            <List
                style={{ textAlign: 'right' }}
                size="large"
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};



export default Categories;