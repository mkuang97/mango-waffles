import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {Ionicons} from '@expo/vector-icons'; 

import BottomUpPanel from "./Popup";

const {height} = Dimensions.get('window');
const DATA= [{label: "Plant 1", icon: ":)", amount: 10},
		     {label: "Plant 2", icon: ":)", amount: 10},
			 {label: "Plant 3", icon: ":)", amount: 10}];


export default class HomeScreen extends React.Component {
  state = {
	oxygen: 0,
	plants: [],
  };

	getSum = ({total, plant}) => {
		console.log("plant" + plant)
		return total + plant.increment;
	}
  
	tick() {
		console.log(this.state.plants)
		this.setState(prevState => ({
			oxygen: prevState.oxygen + prevState.plants.reduce((prev, plant) => prev + plant.increment, 0) + 1
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
                      headerText={"List of plants"}
                      headerTextStyle={{color:"white", 
                                       fontSize: 15}}
                      bottomUpSlideBtn={{display: 'flex',
                                       alignSelf: 'flex-start',
                                       backgroundColor: 'black',
                                       alignItems: 'center',
                                       borderTopColor: 'grey',
                                       borderTopWidth: 5}}>
		</BottomUpPanel>  
		
      </View>
    );
  }
  
  
  renderBottomUpPanelContent = () =>
          <View>
               <FlatList style={{ backgroundColor: 'black', opacity: 0.7, flex:1}}
                    data={DATA}
                    renderItem={({item}) =>
                                <Text style={{color:'white', padding:20}}
									  onPress={this._handleBuyPlant}>{item.label}</Text>
                               }
					keyExtractor={(item, index) => index.toString()}
                />
          </View>
          
  renderBottomUpPanelIcon = () =>
        <Ionicons name={"ios-arrow-up"} style={{color:"white"}} size={30}/>
  
  renderPlants = () => {
	  console.log(this.state.plants.length)
	  console.log(0 < this.state.plants.length)
	  plants = []
	  for(let i = 0; i < this.state.plants.length; i++){
		  console.log("Created component")
			plants.push( <View style={styles.welcomeContainer} key={i}>
			<TouchableOpacity onPress={this._handleTreeClick}>
				<Image source={require('../assets/images/plant.png')} style={styles.treeImage}/>
			</TouchableOpacity>
		  </View> )
		  }
	return plants
  }
  
  	renderScore = () => (
		<Text
			style={{
				textAlign: "center",
				fontSize: 64,
				position: "relative",
				left: 0,
				right: 0,
				color: "red",
				top: 0,
				backgroundColor: "transparent"
			}}>
		Oxygen: {this.state.oxygen}
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
  
  _handleBuyPlant = () => {
	var newPlants = this.state.plants.slice();
    newPlants.push({icon: ":)", increment: 1}); 
	this.setState({ oxygen: this.state.oxygen - 10, plants: newPlants});  
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  treeImage: {
	  width: 400,
	  height: 200,
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
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
