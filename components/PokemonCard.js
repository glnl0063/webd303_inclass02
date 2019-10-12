// import React from react
import React, {Component} from 'react';

// import components from react native
import {Animated, StyleSheet, Text, View, Image} from 'react-native';

// create a blueprint of each pokemon card
export default class PokemonCard extends Component {

  // define the initial state of the component
  constructor(props) {
    super(props); 
    this.animatedValue = new Animated.Value(0);
  }

  // created custom function for card flipping
  cardFlipping() {
    
    // do the following animation sequence
    Animated.sequence([
      
      // delay by 3 seconds
      Animated.delay(3000),    
      
      // do a spring animation 
      Animated.spring(this.animatedValue, {
        toValue: 180, 
        friction: 8, 
        tension: 20
      }), 

      // delay for 5 seconds
      Animated.delay(5000),

      // do a spring animation       
      Animated.spring(this.animatedValue, {
        toValue: 0, 
        friction: 8, 
        tension: 20    
      })

    // start animation 
    ]).start(() => {

      // loop the function again
      this.cardFlipping()

    });
  }

  // after component has been rendered, execute card flipping function
  componentDidMount() {
    this.cardFlipping(); 
  }

  // render the following 
  render() {

    // created interpolation values for card's front
    const frontInterpolation = this.animatedValue.interpolate({
      inputRange: [0, 180], 
      outputRange: ["0deg", "180deg"]
    })

    // created interpolation values for card's bck
    const backInterpolation = this.animatedValue.interpolate({
      inputRange: [0, 180], 
      outputRange: ["180deg", "360deg"]
    })    

    // created variable for card's front that uses interpolation values
    const frontStyle = {
      transform: [{ rotateY: frontInterpolation}]
    }

    // created variable for card's back that uses interpolation values
    const backStyle = {
      transform: [{ rotateY: backInterpolation}]
    }

    // return the following  
    return (
      
      // create components - front and back of card with animated styles 
      <View style={style.container}>

          <Animated.View style={[style.card, frontStyle]}>
            <Image 
              source={{uri: this.props.pokemonImage}}
              style={style.sprite} 
            />
            <Text style={style.id}>{this.props.pokemonID}</Text>    
            <Text style={style.name}>{this.props.pokemonName}</Text>          
          </Animated.View>          

          <Animated.View style={[style.card, style.cardBack, backStyle]}>
            <Text style={style.type}>{this.props.pokemonType}</Text>
            <Text style={style.description}>{this.props.pokemonDescription}</Text>          
          </Animated.View>  
        
      </View>

    ); 

  }

}


const style = StyleSheet.create({

  // container containing pokemon and its details 
  card: {
    alignItems: "center",
    backgroundColor: "#D2EBE8",
    borderRadius: 5,
    display: "flex",
    elevation: 3,
    justifyContent: "center",  
    margin: 10,
    padding: 10,      
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },     
    shadowOpacity: 0.25,   
    shadowRadius: 3.84,       
    width: 150,
    height: 200, 
    backfaceVisibility: "hidden"
  },

  // back of card
  cardBack: {
    position: "absolute", 
    top: 0
  },

  // Pokemon sprite
  sprite: {
    height: 125,
    resizeMode: "contain",      
    width: "100%"
  },

  // Pokemon name
  name: {
    color: "#202020",
    fontSize: 18, 
    fontWeight: "600"    
  },

  // Pokemon ID
  id: {
    color: "#606060",
    fontSize: 13, 
    fontWeight: "500",
  },    

  // Pokemon type
  type: {
    backgroundColor: "#A9A9A9", 
    borderRadius:  5,
    color: "#FFF",
    fontSize: 15, 
    marginBottom: 10,
    textAlign: "center",    
    width: 75
  },  

  // Pokemon description
  description: {
    color: "#202020"
  }   

});
