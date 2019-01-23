import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {Ionicons} from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/Ionicons';

import BottomUpPanel from "./Popup";


ROWS = 5
COLUMNS = 3

const {height} = Dimensions.get('window');
var ShopItemTypes = {
  PLANT: 1,
  ROW: 2,
};

const shopItems = [{label: "Plant 1", icon: require('../assets/images/plant.png'), type: ShopItemTypes.PLANT, amount: 5, increment: 1},
				   {label: "Plant 2", icon: require('../assets/images/plant.png'), type: ShopItemTypes.PLANT, amount: 10, increment: 5},
				   {label: "Plant 3", icon: require('../assets/images/plant.png'), type: ShopItemTypes.PLANT, amount: 15, increment: 10},
				   {label: "Row", icon: require('../assets/images/plant.png'), type: ShopItemTypes.ROW, amount: 100},
				   ];
				   

placeHolder = require('../assets/images/placeholder.png')
				   
export default class HomeScreen extends React.Component {

  constructor(props){
	  super(props);
	  
	  this.state = {
			oxygen: 0,
			increase: 1,
			plants: new Array(ROWS),
			mode: "plant"
	  };
	  
	  for(i = 0; i < ROWS; i++){
		  this.state.plants[i] = new Array(COLUMNS);
	  }
	  
	  this.scaleValue = new Animated.Value(0)
	  this.imageScale = this.scaleValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [1, 1.1, 1.2]
	  });
	  
	  // https://github.com/erikras/redux-form/issues/3298#issuecomment-451571974 huh? treeImage === treeImageObject?
	  this.transformStyle = {width: 130,
		  height: 100,
		  resizeMode: 'contain',
		  alignContent: 'center',
		  zIndex: 100,
		  transform: [{scaleX: this.imageScale, scaleY: this.imageScale}] }
	  console.log(this.transformStyle)
	  
	  console.log(styles.treeImage)
  }

  // TODO: fix formatting
  // TODO: ensure state is read safety (seems that state can be read directly however need to keep in mind
  // setState is asyc)

	tick() {
		// console.log(this.state.plants)
		console.log("Tick")
		this.setState(prevState => ({
			oxygen: prevState.oxygen + prevState.increase
		}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
  
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
		<ImageBackground source={{uri: '../assets/images/plant.png'}} imageStyle={{resizeMode: 'stretch'}} style={{width: '100%', height: '100%'}}>
			<Image source={require('../assets/images/background.png')} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}/>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			
			{/** note for react to not barf in the render method the comments must follow this form as seen below**/}
			
				{/**<View style={styles.welcomeContainer}>
				<Image
				  source={
					__DEV__
					  ? require('../assets/images/robot-dev.png')
					  : require('../assets/images/robot-prod.png')
				  }
				  style={styles.welcomeImage}
				/>
			  </View>

			  <View style={styles.getStartedContainer}>
				{this._maybeRenderDevelopmentModeWarning()}

				<Text style={styles.getStartedText}>Get started by opening</Text>

				<View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
				  <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
				</View>

				<Text style={styles.getStartedText}>
				  Change that text and your app will automatically reload.
				</Text>
			  </View>

			  <View style={styles.helpContainer}>
				<TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
				  <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
				</TouchableOpacity>
	  </View>**/}
			  
			
			{/** TODO: split up various UI peices into several components to prevent unnecessary virtual dom creation
			on every setState call **/}
			  <View style={styles.helpContainer}>
				{this.renderScore()}
			  </View>
			  
			  <View>
			  {this.renderPlants()}
			  </View>
			</ScrollView>

			{/**<View style={styles.tabBarInfoContainer}>
			  <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

			  <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
				<MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
			  </View>
			</View>**/}
			
			<BottomUpPanel
						  content={this.renderBottomUpPanelContent}
						  icon={this.renderBottomUpPanelIcon}
						  topEnd={height - 300}
						  startHeight={80}
						  headerText={"Shop"}
						  headerTextStyle={{color:"white", 
										   fontSize: 15}}
						  bottomUpSlideBtn={{display: 'flex',
										   alignSelf: 'flex-start',
										   backgroundColor: 'black',
										   alignItems: 'center',
										   borderTopColor: 'grey',
										   borderTopWidth: 5}}>
			</BottomUpPanel>
			
			{/** https://oblador.github.io/react-native-vector-icons/ **/}
			<View style={styles.searchIconContainer}>
				<TouchableOpacity onPress={() => {
						if(this.state.mode === "delete"){
							console.log("Setting mode to plant")
							this.setState(prevState => ({
								mode: "plant"
							}));
						} else {
							console.log("Setting mode to delete")
							this.setState(prevState => ({
								mode: "delete"
							}));
						}
						
						
						this.scaleValue.setValue(0);
						console.log("going bigger")
						Animated.timing(this.scaleValue, {
						  toValue: 1,
						  duration: 3000,
						  easing: Easing.linear,
						  useNativeDriver: true
						}).start(() => {
							console.log("Going smaller")
							Animated.timing(this.scaleValue, {
							  toValue: 0,
							  duration: 3000,
							  easing: Easing.linear,
							  useNativeDriver: true
							}).start()
						});

						
					}}>
						{ this.state.mode === "delete" ? (
							<Icon
								raised
								reverse
								size={64}
								containerStyle={styles.searchIcon}
								iconStyle={styles.searchIcon}
								style={styles.searchIcon}
								name='ios-close'
								
							/>
						) : (
							<Icon
								raised
								reverse
								size={64}
								containerStyle={styles.searchIcon}
								iconStyle={styles.searchIcon}
								style={styles.searchIcon}
								name='ios-trash'
								
							/>

						)
						}
				</TouchableOpacity>
			</View>
		</ImageBackground>
      </View>
    );
  }
  
  _renderDelete = () => 
		<Image source={require('../assets/images/background.png')} style={styles.treeImage}/>
  
  // https://stackoverflow.com/questions/42137383/react-native-touchablehighlight-onpress-pass-parameter-if-i-pass-the-ite
  // TODO: is this the correct way of binding?
  renderBottomUpPanelContent = () =>
          <View style={{ width: '100%'}}>
               <FlatList style={{ backgroundColor: 'black', opacity: 0.9, flex:1}}
					contentContainerStyle={styles.listView}
                    data={shopItems}
                    renderItem={({item}) =>
									<View style={{ width: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', flex: 1 }} >
										<TouchableOpacity delayPressIn={50} onPress={this._handleBuyPlant.bind(this, item)} style={styles.helpLink}>
											<Text style={{color:'white', padding:20, textAlign:'center'}}>
												{item.label}
											</Text>
											<Image source={item.icon} style={styles.treeShopImage}/>
										</TouchableOpacity>
									</View>
                               }
					keyExtractor={(item, index) => index.toString()}
                />
          </View>
          
  renderBottomUpPanelIcon = () =>
        <Ionicons name={"ios-arrow-up"} style={{color:"white"}} size={30}/>
  
  renderPlants = () => {
	  //console.log(this.state.plants.length)
	  //console.log(0 < this.state.plants.length)
	  //plants = []
	  //for(let i = 0; i < this.state.plants.length; i++){
		  //console.log("Created component")
		  // delayPressIn={50}
		  // https://stackoverflow.com/questions/37610705/make-touchableopacity-not-highlight-element-when-starting-to-scroll-react-nativ#new-answer
//			plants.push( <View style={styles.welcomeContainer} key={i}>
			//<TouchableOpacity onPress={this._handleTreeClick}>
//				<Image source={require('../assets/images/plant.png')} style={styles.treeImage}/>
			//</TouchableOpacity>
		  //</View> )
		  //}
	  //return plants
	  const data = [...Array(this.state.plants.length).keys()];
	  const data1 = [0, 1, 2]
	  //console.log("This is data " + data)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {
                data.map((datum) => { // This will render a row for each data element.
                    return this.renderRow(datum, data1);
                })
            }
            </View>
        );
  }
  
  
  	// very hacky key
	// and hard coded everything...
    renderRow = (row, columns) => {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }} key={row}>
				{
						columns.map((datum) => {
							return (<View style={{ flex: 1, alignSelf: 'stretch' }} key={row + "_" + datum}> 
								{this.state.plants[row][datum] !== undefined ? 
									this.state.mode === "delete" ? 
										( 
											<TouchableWithoutFeedback onPress={this._handleDeletePlant.bind(this, row, datum)}>
												<Animated.Image source={this.state.plants[row][datum].icon} style={this.transformStyle} />
											</TouchableWithoutFeedback>
										) :
										(
											<Image source={this.state.plants[row][datum].icon} style={styles.treeImage}/>
										)
									: 
									(
										<Image source={placeHolder} style={styles.treeImage}/>
									)
								}
							</View>)
						})
				}
            </View>
        );
    }
  
  	renderScore = () => (
		<Text
			style={{
				textAlign: "right",
				fontSize: 64,
				position: "relative",
				left: 0,
				right: 0,
				color: "red",
				top: 0,
				backgroundColor: "transparent"
			}}>
		{this.state.oxygen}
		</Text>
	);

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  
  // Returns a random integer between min (inclusive) and max (inclusive).
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  _handleDeletePlant = (row, column) => {
	  var newPlants = this.state.plants.slice();
	  const toDecrease = newPlants[row][column].increment
	  newPlants[row][column] = undefined
	  // TODO: maybe increase oxygen by some percentage of the plant cost?
	  this.setState(prevState => ({
			plants: newPlants,
			increase: prevState.increase - toDecrease
	  }));
  }
  
  _handleBuyPlant = (item) => {
	if (item.type === ShopItemTypes.PLANT){
		// TODO: I think this is mutating not deep copying which is bad...
		var newPlants = this.state.plants.slice();
		//newPlants.push({icon: ":)", increment: item.increment});
		var openSpots = []
		for(var r = 0; r < newPlants.length; r++){
			for(var c = 0; c < newPlants[r].length; c++){
				if(newPlants[r][c] === undefined){
					openSpots.push({ row: r, column: c})
				}
			}
		}
		
		if(openSpots.length === 0){
			// TODO: display a prompt or maybe just disable purchase button when at max plants
			console.log("At max plants")
			return
		}
		
		openSpot = openSpots[this.getRandomInt(0, openSpots.length - 1)]
		newPlants[openSpot.row][openSpot.column] = {icon: require('../assets/images/plant.png'), increment: item.increment};
		
		console.log("Buying plant for: " + item.amount);
		this.setState(prevState => ({
			oxygen: this.state.oxygen - item.amount, 
			plants: newPlants,
			increase: prevState.increase + item.increment
		}));
	} else if(item.type === ShopItemTypes.ROW) {
		var newPlants = this.state.plants.slice();
		newPlants.push(new Array(3))
		this.setState(prevState => ({
			oxygen: this.state.oxygen - item.amount, 
			plants: newPlants,
			increase: prevState.increase
		}));
	}
  };
  
  _handleTreeClick = () => {
	this.setState({ oxygen: this.state.oxygen + 1});  
  };

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
	searchIconContainer: {
        position: 'absolute',
        top: 16,
        left: 33,
		height: 128,
		width: 128,
		borderRadius: 64,
        ...Platform.select({
            android: {
              top: 40,
            },
          })
    },
    searchIcon: {
        color:'#444',
    },
   listView: {
     flex: 1,
     justifyContent: 'center',
   },
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  emptyBlock: {
	  width: 130,
	  height: 100,
  },
  treeImage: {
	  width: 130,
	  height: 100,
	  resizeMode: 'contain',
	  alignContent: 'center',
  },
  treeShopImage: {
	  width: '100%',
	  height: 100,
	  resizeMode: 'contain',
	  alignContent: 'center',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
