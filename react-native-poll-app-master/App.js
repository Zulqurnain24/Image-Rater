/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
import React, { Component } from 'react';
import { Root } from './app/config/router';
import * as firebase from 'firebase';

export default class App extends Component {
	jsonData;

	constructor(props) {
        super(props);
        this.state = {
            listDataFromChild: null
        };    
	}
	
    myCallback = (dataFromChild) => {
        this.setState({ listDataFromChild: dataFromChild });
	}
	
	componentWillMount() {
		
	    const firebaseConfig = {
			apiKey: "AIzaSyDu9I18SOwWpp0fGcT7uuk9WsVVL42oTqw",
			authDomain: "reactnativepoll.firebaseapp.com",
			databaseURL: "https://reactnativepoll.firebaseio.com",
			projectId: "reactnativepoll",
			storageBucket: "reactnativepoll.appspot.com",
			messagingSenderId: "827346196261"
		};

		firebase.initializeApp(firebaseConfig);
		
		firebase.database().ref('users').on('value', (data) => {
			this.jsonData = data.toJSON();
		})

		// setTimeout(() => {
		// 	firebase.database().ref('users/002').set(
		// 		{
		// 			id: '2',
		// 			title: 'Hybrid car',
		// 			description: 'Do you like this car ?',
		// 			start_date: '2018-04-06T00:00:00.000Z',
		// 			end_date: '2018-05-31T00:00:00.000Z',
		// 			type_id: '1',
		// 			category_id: '2',
		// 			user_id: '1',
		// 			created_at: '2018-04-06T15:40:49.499Z',
		// 			updated_at: '2018-04-06T15:40:49.499Z',
		// 			rating: 3,
		// 			deleted_at: null,
		// 			picture:{
		// 				id: 2,
		// 				path: 'http://imagesvc.timeincapp.com/v3/foundry/image/?q…oxz3f.cloudfront.net%2F1hight_v_johnson_lewis.jpg',
		// 				imageable_type: 'Sondage',
		// 				imageable_id: '6',
		// 				created_at: '2018-04-06T15:40:50.427Z',
		// 				updated_at: '2018-04-06T15:40:50.427Z'
		// 			}
		// 		}
		// 	).then(() => {
		// 		//console.log('INSERTED !');

		// 	}).catch((error) => {
		// 		console.log(error);
		// 	});
		// }, 5000);
		// firebase.database().ref('users/001').update({
		// 	name: 'Pheng Sengvuthy'
		// });
	}

	render() {
		return <Root />;
	}
}
