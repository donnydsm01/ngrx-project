import {  
    createReducer, 
    MetaReducer, 
    ActionReducer, 
    on 
} from '@ngrx/store';

import { changeUsername, initAction } from './01-actions';

const initialState = {
    appName :'NgRx',
    user : {
        username :'',
        isAdmin :false
    }
};

// permet de logger l'état actuel du store et aussi les actions effectuées

function log(reducer : ActionReducer<any>) : ActionReducer<any> {
    return (state,action) =>{
        
        const currentState = reducer(state,action);

        console.groupCollapsed(action.type);
        console.log('Action : ', action);
        console.log('Etat précédent :', state);
        console.log('Etat suivant : ', currentState);
        console.groupEnd();

        return currentState; 
    }
}

export const metaReducers : MetaReducer[] = [log];

export const rootReducer = createReducer(initialState,

    // on permet d'écouter l'événement.
    on(initAction,(state) =>{
        return {
            ...state,
            user : {
                ...state.user,
                isAdmin :true
            }
        }
    }),
    on(changeUsername,(state, props)=>{
        return{
            ...state,
            user :{
                ...state.user,
                username : props.username 
            }
        }
    })
);