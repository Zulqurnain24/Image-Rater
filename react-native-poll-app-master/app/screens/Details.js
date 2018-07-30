import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Content, Card, List, View, Thumbnail, CardItem, Body, Left, Right, Radio, Text, Button, Icon, Header,  Title, Spinner, ListItem } from 'native-base';
import styles from './../styles/Details';
import  Rating from 'react-native-easy-rating';
const POLL_DETAILS_API = 'https://pollap.herokuapp.com/api/sondages/';
import * as firebase from 'firebase';

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		const date = new Date();
		return {
			pollid: this.props.navigation.state.params.id,
			poll_title: this.props.navigation.state.params.title,
			rating: 0,
			loaded : false,
			today: date.getDate() + "_" + parseInt(date.getMonth()+1) + "_" + date.getFullYear()						
		};
	}

	componentWillMount() {
		// let pollid = this.state.pollid;
		// AsyncStorage.getItem('poll_' + pollid + '_' + this.state.today, (err, result) => {
		// 	if( result!==null ){
		// 		this.setState({
		// 			poll: JSON.parse(result),					
		// 			loaded: true
		// 		});
		// 	}else{
		// 		this.fetchData(pollid);
		// 	}
		// });
		firebase.database().ref('users').on('value', (data) => {
			this.jsonData = data.toJSON();
			console.log('this.jsonData =' , this.jsonData);
			console.log('this.jsonData[this.state.pollid] =' , this.state.pollid);
			console.log('this.jsonData[this.state.pollid][detail] =' , this.jsonData['001']['detail']);
			console.log('this.jsonData[this.state.pollid][detail][rating] =' , this.jsonData['001']['detail']['rating']);
			if( this.jsonData['001']['detail']!==null ){
				this.setState({
					poll: this.jsonData['001']['detail'],					
					loaded: true
				});
			}
			//this.onRatingDone(this.jsonData['001']['detail']['rating']);
		});
	}

	fetchData (pollid) {
		let url = POLL_DETAILS_API + pollid;
		fetch(url).then((response) => response.json()).then((responseData) => {
			this.setState({
				poll: responseData,
				loaded     : true
			});
			AsyncStorage.setItem('poll_' + pollid + '_' + this.state.today, JSON.stringify(responseData));			
		})
		.catch(function(error) {
			this.setState({
				loaded: false
			});
    	});
	}
	renderDate(poll_date) {
		let parsed_date = new Date(poll_date),
			mount = ("0" + parsed_date.getMonth()).slice(-2),
			day = ("0" + parsed_date.getDay()).slice(-2),
			year = parsed_date.getFullYear();
		return mount+'/'+day+'/'+year;
	}
	onCheckBoxPress(ev) {
		if (this.state.value == ev) {
			this.setState({ value: {} });
			return;
		}
		this.setState({ value: ev });
	}
	backNavigate() { 
		this.props.navigation.goBack(this.props.navigation.state.key);
	}
	onRatingDone(ev) {
		console.log('in onRatingDone');
		this.setState({ rating: ev });
		firebase.database().ref('users/001/detail').update({
			rating: ev
		});
	}
	render() {
		const item = this.state.poll;
		return (
			<Container style={{backgroundColor: '#FFF'}}>
				<Header>
					<Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
						<Title style={styles.title}>Picture Rating</Title>
					</Body>
				</Header>
				<Content>
					{!this.state.loaded ? <Spinner /> :
						<Card style={ styles.carstyle }>
							<CardItem>
						     	<Button small style={ styles.backButton } onPress={() => this.backNavigate()}>
									<Text>Back</Text>
								</Button>	
								<Left>
									<Text style={{}}>{item.category.title}</Text>
								</Left>
							</CardItem>
							<CardItem>
								<Left>
									<Body>
										<Text style={ styles.pollTitle }>{item.title}</Text>
										<Text>{ item.user.username }</Text>
										<Text note>{ this.renderDate(item.start_date) }</Text>
									</Body>
								</Left>
							</CardItem>
							<View>
								<Rating
								    style={styles.cntrlRating}
									rating={item.rating.rating}
									max={5}
									iconWidth={24}
									iconHeight={24}
									iconSelected={require('../../img/star_selected.png')}
									iconUnselected={require('../../img/star_unselected.png')}
									onRate={(rating) => this.onRatingDone({rating: rating})}/>												
							</View>
							<CardItem>
								<Left style={ styles.pollBody }>
									<Image style={ styles.pollImage } source={{uri: item.picture.path}}/>
									{/* <List >
										{item.sondage_responses.map((value, index) => {
											return (
												<ListItem key={index} >
													<Radio style={ styles.btnRadio }
														onPress={this.onCheckBoxPress.bind(this, value)}
														selected={this.state.value == value}
													/>
													<Text>{value.title}</Text>
												</ListItem>
											)
										})}
									</List> */}
								</Left>					
							</CardItem>
							<CardItem>
								<Button small style={ styles.share_fb }>
									<Icon name="logo-facebook" />
								</Button>
								<Button small style={ styles.share_tw}>
									<Icon name="logo-twitter" />
								</Button>
								<Button small style={ styles.share_wp }>
									<Icon name="logo-whatsapp" />
								</Button>
							</CardItem>
			   			</Card>
						
					}
				</Content>
			</Container>
		);
	}
}