// import React from react
import React, {Component} from 'react';

// import the stylesheet, text, view from react native
import {SafeAreaView, StyleSheet, Text, View, Image, ScrollView} from 'react-native';

// import constants to get status bar height
import Constants from "expo-constants";

// import Pokemon data from the custom JSON I made
import PokemonData from "./starter-pokemon.json"; 

// import custom components
import PokemonCard from "./components/PokemonCard";
import Title from './components/Title.js';
import Divider from './components/Divider.js';

// create a default class with the Component subclass
export default class App extends Component {

  // initialize an empty array object 
  state = { pokemons: [] }

  // after component has been rendered, change the state of pokemons variable to JSON
  componentDidMount() {
    this.setState({pokemons: PokemonData})
  }

  // render the following
  render() {

    // return the following
    return (

      <SafeAreaView style={style.container}>      
        <ScrollView>

          <Title/>

          <View style={style.pokemonContainer}>
          {
            this.state.pokemons.map((item, index) =>
              <PokemonCard key={index}
                pokemonImage={item.image}
                pokemonName={item.name}
                pokemonType={item.type}
                pokemonDescription={item.description}
                pokemonID={item.id}
              />
            )
          }          
          </View>


          <Divider/>

          <View style={style.footerContainer}>
            <Text style={style.footer}>© Images & Content By The Pokemon Company. Used for Education Purposes.</Text>
          </View>        

        </ScrollView> 
      </SafeAreaView>
    );    

  }

}


const style = StyleSheet.create({

  // container for view
  container: {
    flex: 1, 
    marginTop: Constants.statusBarHeight
  },

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

  // container for group of pokemon cards
  pokemonContainer: {  
    alignItems: "center",     
    display: "flex",
    flexDirection: "row", 
    flexWrap: "wrap",
    justifyContent: "center", 
    width: "100%",    
  },   

  // container for footer
  footerContainer: {
    alignItems: "center", 
    backgroundColor: "#979797",
    justifyContent: "center",
    padding: 20,  
    width: "100%",     
  }, 
  
  // footer text
  footer: {
    color: "#FFF",
    fontSize: 10, 
    fontWeight: "600",
    textTransform: "uppercase",     
  }

});