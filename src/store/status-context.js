import { createContext } from 'react';

const StatusContext = createContext({
    pickedOrderStatus: 'in preparation'
});

export default StatusContext;