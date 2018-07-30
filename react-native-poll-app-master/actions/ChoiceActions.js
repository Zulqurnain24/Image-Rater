import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	CHOICE_UPDATE,
	CHOICE_CREATE,
	CHOICES_FETCH_SUCCESS,
	CHOICE_SAVE_SUCCESS
} from './types';

export const choiceUpdate = ({ prop, value }) => {
	return {
		type: CHOICE_UPDATE,
		payload: { prop, value }
	};
};


export const choiceCreate = ({  categoryID, createdAt, end_date, description, start_date, title, type_id, updated_at, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/reactnativepoll/${currentUser.uid}/objects`)
			.push({ categoryID, createdAt, end_date, description, start_date, title, type_id, updated_at, uid })
			.then(() => {
				dispatch({ type: CHOICE_CREATE });
				Actions.choiceList({ type: 'reset' });
			});
	};
};

export const choicesFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/reactnativepoll/${currentUser.uid}/objects`)
			.on('value', snapshot => {
				dispatch({ type: CHOICES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const choiceSave = ({ categoryID, createdAt, end_date, description, start_date, title, type_id, updated_at, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/reactnativepoll/${currentUser.uid}/objects/${uid}`)
			.set({ categoryID, createdAt, end_date, description, start_date, title, type_id, updated_at, uid })
			.then(() => {
				dispatch({ type: CHOICE_SAVE_SUCCESS });
				Actions.choiceList({ type: 'reset' });
			});
	};
};

export const choiceDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/reactnativepoll/${currentUser.uid}/objects/${uid}`)
			.remove()
			.then(() => {
				Actions.choiceList({ type: 'reset' });
		});
	};
};
