import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChoiceFormReducer from './ChoiceFormReducer';
import ChoiceReducer from './ChoiceReducer';

export default combineReducers({
	auth: AuthReducer,
	choiceForm: ChoiceFormReducer,
	choices: ChoiceReducer
});
