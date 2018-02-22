import React from 'react';
import { StyleSheet, Text, View, FlatList, Image,Dimensions,Animated, Easing,Alert } from 'react-native';
const deviceWidth = Dimensions.get('window').width
const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 30;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT;
const scrollX = new Animated.Value(0);

const transitionAnimation = index => {
 
  return {
   height:scrollX.interpolate({
     inputRange: [(index - 1) * deviceWidth, index * deviceWidth,(index + 1) * deviceWidth],
     outputRange: [HEADER_MIN_HEIGHT,HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT],
     extrapolate: 'clamp',
     easing:Easing.circle
   })
  }
}

const Screen = props => {
 
  return (
     <Animated.View style={[styles.imageContainerStyle,transitionAnimation(props.index)]}>
     <View style={{paddingLeft:75,width:'100%'}}>
     <Image 
     style={[styles.imageStyle]}  
     source={{ uri: props.item }} 
     resizeMode='cover' 
     />
     </View>
     </Animated.View>
  );
};


export default class App extends React.Component {

  
  state = {
    //scrollX: new Animated.Value(0),
    imageList:[]
	};

     componentWillMount() {
        this.setState({imageList:images})
      }
      
     
  render() {
    
    // let translateY = this.state.animatedValue.interpolate({
		// 	inputRange: [0, 180],
		// 	outputRange: [0, -180],
		// 	extrapolate: 'clamp',
    // });
    
    return (
     <View style={[styles.container]}>
        <AnimatedFlatList 
          horizontal 
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16} 
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}]
             )}
            data={this.state.imageList}
            keyExtractor={(x, i) => i}
            renderItem={({ item,index }) =>
           <Screen item={item} index={index} />
              }>
          </AnimatedFlatList>
         
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    width:'100%',
    alignItems:'center'
  },
  imageContainerStyle:{
    height:'60%',
    width:deviceWidth,
    justifyContent:'center',
   
  },
  imageStyle:{
    height:HEADER_MAX_HEIGHT,
    width:deviceWidth-150,
    borderRadius:15
     
  },barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 340,
    justifyContent:'center',
    flexDirection: 'row',
  },
});
