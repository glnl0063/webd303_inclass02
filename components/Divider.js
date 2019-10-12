// import React from react
import React, {Component} from 'react';

// import components from react native
import {Animated, Easing, StyleSheet, Text, View, Image} from 'react-native';

// create a blueprint of each animated divider section
export default class Divider extends Component {

    // define the initial state of the component
    constructor(props) {
        super(props); 
        this.animatedValue = new Animated.Value(0);
        this.translateValue = new Animated.Value(0);        
    }

    // after component has been rendered, execute card flipping function
    componentDidMount() {
        Animated.parallel([
            Animated.loop(
                Animated.timing(this.translateValue, {
                    toValue: 1, 
                    duration: 3000, 
                    easing: Easing.linear, 
                    useNativeDriver: true
                })
            ),                   
            Animated.loop(
                Animated.timing(this.animatedValue, {
                    toValue: 1, 
                    duration: 1000, 
                    easing: Easing.linear, 
                    useNativeDriver: true
                })
            )
        ]).start()
    }

    // render the following 
    render() {

        // created interpolation values for rotation
        const rotationInterpolation = this.animatedValue.interpolate({
            inputRange: [0, 1], 
            outputRange: ["0deg", "180deg"]
        }) 
        
        // created interpolation values for translating on the x axis
        const translateXInterpolation = this.translateValue.interpolate({
            inputRange: [0, 1], 
            outputRange: [0, 350]
        })             

        // created variable for pokeball that uses interpolation values
        const rotationStyling = {
            transform: [{ rotate : rotationInterpolation}]
        }     
        
        // created variable for view containing the pokeball that uses interpolation values        
        const translateXStyling = {
            transform: [{ translateX : translateXInterpolation}]
        }       

        // return the following  
        return (
        
            // create components - rotating pokeball inside a view that's moving L2R
            <View style={style.titleContainer}>
                <Animated.View style={[style.pokeballs, translateXStyling]}>
                    <Animated.Image source={require("../assets/color-pokeball.png")} style={[style.pokeballs, rotationStyling]}/>                    
                </Animated.View>
            </View>

        ); 

    }

}

const style = StyleSheet.create({

    // container for title
    titleContainer: {
        height: 30,
        marginTop: 20,
        width: "100%",     
    },   

    // pokeball
    pokeballs: {
        height: 25,
        width: 25, 
    }

});
