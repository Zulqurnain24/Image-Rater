import {
	CHOICE_UPDATE, 
	CHOICE_CREATE,
	CHOICE_SAVE_SUCCESS
} from './actions/types';

const INITIAL_STATE = {
	name: '',
	favoriteColor: '',
	favoriteFood: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHOICE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case CHOICE_CREATE:
			return INITIAL_STATE;
		case CHOICE_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};
