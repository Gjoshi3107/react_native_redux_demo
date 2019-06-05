import { LEFT_EMPLOYEE, NEW_EMPLOYEE } from './component(action type)';
// import console from 'console';

const initState1 = {
    empID: [],
    empDATA: {}
};

export function my_employee(state = initState1, action) {

    
    // console.log(action.payload);
    switch (action.type) {
        case NEW_EMPLOYEE: {
            let [ ide, Nam, Employe, Executiv, TeL ] = action.payload.data;
            // alert("action payload data: "+ide+Nam+Employe+Executiv+TeL);
            
            return {
                ...state,
                empID: state.empID.concat({
                    id: ide,
                  }),
                empDATA: {
                    ...state.empDATA,
                    [ide]: {
                        Name: Nam,
                        Employee: Employe,
                        Executive: Executiv,
                        TeamLead: TeL,
                    }
                }    
            };
        }
        case LEFT_EMPLOYEE: {
            // const idd = Object.create(action.payload.id);
            // idd = Object.create(action.payload);
            // idd.id = action.payload.id;
            // Object idd = action.payload.id;
            const idd = action.payload.id;
            return {
                ...state,
                empDATA: { 
                    ...state.empDATA,
                    [idd]: {
                        ...state.empDATA[idd],
                        Employee: "LEFT",
                    }
                }    
            };
        }
        default:
            return state;
    }
}