import {StyleSheet} from 'react-native'

export default StyleSheet.create({
	cardstyle: {
		flex: 1,
	},
	pollTitle: {
		color: 'blue'
	},
	pollBody: {
		flexDirection:'row'
	},
	pollImage: {
		width:200, 
		height:200
	},
	cntrlRating: {
		flex: 1,
		paddingLeft: 20,
		width: 300, 
		height:25, 
	},
	btnRadio: {
		width: 25, 
		height:25, 
	},
	listbtns: {
		flex: 1, 
		justifyContent: 'center' ,
		alignItems:'center', 
		//paddingLeft: 10
	},
	share_wp: {
		backgroundColor: '#34A34F'
	},
	back_button: {
		paddingLeft: -10,
		paddingTop: -10,
		backgroundColor: '#3B5998', marginRight: 10
	},
	share_fb: {
		backgroundColor: '#3B5998', marginRight: 10
	},
	share_tw: {
		backgroundColor: '#00aced', marginRight: 10
	},
	content: {
		backgroundColor: '#FFF',
		borderWidth: 0,		
	},
   pollimg: {
	   width:200, height:300
   },
});