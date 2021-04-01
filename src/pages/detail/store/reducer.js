import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    title:'这是title',
    content:'<p>这是content</p>'
});

// eslint-disable-next-line
export default (state = defaultState, action)=>{
    switch(action.type){
        case constants.CHANGE_DETAIL:
			return state.merge({
				title: action.title,
				content: action.content
			})
        default:
            return state;
    }
}