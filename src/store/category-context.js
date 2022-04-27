import { createContext } from 'react';

const CategoryContext = createContext({
    pickedCategory: 'all'
});

export default CategoryContext;