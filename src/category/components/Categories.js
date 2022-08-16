import React from 'react';
import { useContext, useState, useEffect } from 'react';

import { List, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


import './Categories.css'
import CategoryContext from '../../store/category-context';
import AddCategory from './AddCategory';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';



// const data = [
//     'הכל',
//     'ארוחות בוקר',
//     'ארוחות ילדים',
//     'ראשונות',
//     'כריכים',
//     'שקשוקות',
//     'טוסטים',
//     'מהתנור',
//     'סלטים',
//     'פסטות',
//     'עיקריות',
//     'משקאות',
//     'קינוחים',
// ];

const Categories = props => {

    //load categories data
    const [pageChange, setPageChange] = useState(false);



    const [CATEGORIES, setCATEGORIES] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/meals/categories');
                const responseData = await response.json();
                let arr = [];
                for (let prop in responseData.categories) {
                    arr.push(responseData.categories[prop].name)
                }
                setCATEGORIES(arr);
            } catch (err) {
                console.log(err);
            }
            setIsLoading(false);
        };
        sendRequest();
        setPageChange(false);
    }, [pageChange]);


    const [addCategoryOn, setAddCategoryOn] = useState(false);

    const showAddCategoryOn = () => {
        setAddCategoryOn(true);
    }
    const hideAddCategoryOn = () => {
        setPageChange(true);
        setAddCategoryOn(false);
    }

    const categoryCtx = useContext(CategoryContext);
    console.log('context is ' + categoryCtx.pickedCategory);


    const { sendRequest } = useHttpClient();


    const deleteCategoryReq = async (item) => {
        try {
            await sendRequest(
                `http://localhost:5001/api/meals/deleteCategory/${item}`,
                'DELETE'
            );
        } catch (err) { }
        console.log('remove category with the name: ' + item);
        setPageChange(true);
    }



    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <div>
                <h2 orientation="right">קטגוריות</h2>
                <List
                    className='list'
                    size="large"
                    dataSource={CATEGORIES}
                    renderItem={item =>
                        <List.Item>
                            {props.isAdmin &&
                                <Tooltip className='deleteCategory' title="delete" >
                                    <Button onClick={() => deleteCategoryReq(item)} danger type="primary" shape="circle" icon={<DeleteOutlined />} />
                                </Tooltip>
                            }
                            <Button className='category' onClick={() => categoryCtx.changeCategory(item)}>
                                {item}
                            </Button>
                        </List.Item>}
                >
                    {props.isAdmin && <List.Item >
                        <Button className='addCategory' onClick={showAddCategoryOn}>הוסף קטגוריה</Button>
                    </List.Item>}
                </List>
                {addCategoryOn && props.isAdmin && <AddCategory onClose={hideAddCategoryOn} />}
            </div >
        </React.Fragment >

    );
};



export default Categories;