import { combineReducers } from 'redux';
import { ACTIONS } from './actions';

const accountState = {
    isAuth: false,
    tariff: 1,
    usedCompanyCount: undefined, 
    companyLimit: undefined
};

function account (state = accountState, action) {
    switch(action.type) {
        case ACTIONS.SET_AUTH: {
            if (action.payload === false) {
                localStorage.removeItem("token");
                localStorage.removeItem("expire");
            }
            return {
                ...state, 
                isAuth: action.payload,
                usedCompanyCount: action.payload ? state.usedCompanyCount : undefined,
                companyLimit: action.payload ? state.companyLimit : undefined
            };
        }
        case ACTIONS.SET_TARIFF: return {
            ...state, 
            tariff: action.number
        };
        case ACTIONS.SET_ACCOUNT_INFO: return {
            ...state,
            usedCompanyCount: action.usedCompany,
            companyLimit: action.companyLimit
        }

        default: return state;
    }
}

export const publicationsState = {
    histogram: JSON.parse(localStorage.getItem("histogram")),
    histogramLoadedDate: JSON.parse(localStorage.getItem("histogramLoadDate")),
    publicationsList: JSON.parse(localStorage.getItem("publicationsList"))
};


function publications(state = publicationsState, action) {
    switch(action.type) {
        case ACTIONS.SET_HISTOGRAM: 
            const obj = action.response.data;
            const histogram = obj.data;

            let finiteArray = histogram[0].data.map(x => 
                x = {
                    date: x.date,
                    total: x.value
                }
            );
            histogram[1].data.forEach((value, index) => {
                finiteArray[index].riskFactors = value.value;
            });
            
            localStorage.setItem("histogram", JSON.stringify(finiteArray));
            localStorage.setItem("histogramLoadDate", JSON.stringify(new Date()));
            return {
                ...state,
                histogram: finiteArray,
                histogramLoadedDate: new Date()
            }
        case ACTIONS.SET_HISTOGRAM_DATE:
            return {
                ...state,
                histogramLoadedDate: action.date
            }
        case ACTIONS.SET_PUBLICATIONS_LIST:
            if (action.list === undefined)
                localStorage.removeItem("publicationsList");
            else
                localStorage.setItem("publicationsList", JSON.stringify(action.list));

            return {
                ...state,
                publicationsList: action.list
            }

        default: return state;
    }
}

const reducers = combineReducers({
        account: account,
        publications: publications
    });
    export default reducers;