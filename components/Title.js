// import React from react
import React, {Component} from 'react';

// import components from react native
import {Animated, Easing, StyleSheet, Text, View, Image} from 'react-native';

// create a blueprint for title
export default class Title extends Component {

    // define the initial state of the component
    constructor(props) {
        super(props); 
        this.animatedValue = new Animated.Value(0);
    }

    // after component has been rendered, execute rotation for 5 seconds
    componentDidMount() {
        Animated.loop(
            Animated.timing(this.animatedValue, {
                toValue: 1, 
                duration: 5000, 
                easing: Easing.linear, 
                useNativeDriver: true
            })
        ).start()
    }

    // render the following 
    render() {

        // created interpolation values for rotation
        const rotationInterpolation = this.animatedValue.interpolate({
            inputRange: [0, 1], 
            outputRange: ["0deg", "180deg"]
        })          

        // created variable for rotation style 
        const rotationStyling = {
            transform: [{ rotate : rotationInterpolation}]
        }       

        // return the following  
        return (
        
            // create components - title with rotating pokeball
            <View style={style.titleContainer}>
                <Animated.Image source={require("../assets/pokeball.png")} style={[style.pokeballs, rotationStyling]}/>
                <Text style={style.title}>Eevolutions</Text>
            </View>

        ); 

    }

}

// stylesheet for Pokemon Cards
const style = StyleSheet.create({

    // container for title
    titleContainer: {
        alignItems: "center", 
        backgroundColor: "#616161",
        justifyContent: "center",
        marginBottom: 20, 
        padding: 20,  
        width: "100%",     
    }, 
  
    // title text
    title: {
        color: "#FFF",
        fontSize: 30, 
        fontWeight: "600",            
    },     

    pokeballs: {
        height: 25,
        width: 25, 
    }

});
