import {NEW_EMPLOYEE, LEFT_EMPLOYEE} from './component(action type)';

let empID = 0;
export const ADD_NEW_EMPLOYEE = (data) => ({
    type: NEW_EMPLOYEE,
    payload: {
        data
    }
});

export const ADD_LEFT_EMPLOYEE = (id) => ({
    type: LEFT_EMPLOYEE,
    payload: { id }
});
