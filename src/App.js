/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';
import Home from './screens/Home/Home';
import Game from './screens/game/Game';

class App extends Component{
  
  constructor(props){
    super(props)
    this.state=this.initState();
  }

  initState(){
    return {
      isGameInProgress:false,
      isStartGameModalVisible:false,
      red:{
        name:''
      },
      yellow:{
        name:''
      },
      green:{
        name:''
      },
      blue:{
        name:''
      }
    }
  }
 
  render(){
    if(this.state.isGameInProgress){
      return <Game
        redName = {this.state.red.name}
        yellowName = {this.state.yellow.name}
        blueName = {this.state.blue.name}
        greenName = {this.state.green.name}
        />
    }else{
      return <Home
          isStartGameModalVisible={this.state.isStartGameModalVisible}
          onNewGameButtonPress ={()=>{this.setState({isStartGameModalVisible:true})}}
          onCancel={()=>{this.setState({isStartGameModalVisible:false})}}
          onStart={()=>{this.setState({isGameInProgress:true,isStartGameModalVisible:false})}}
          red={this.state.red}
          blue={this.state.blue}
          yellow={this.state.yellow}
          green={this.state.green}
          onRedInput={(name)=>{
            this.state.red.name=name;
            this.setState({})
          }}
          onYellowInput={(name)=>{
            this.state.yellow.name=name;
            this.setState({})
          }}
          onGreenInput={(name)=>{
            this.state.green.name=name;
            this.setState({})
          }}
          onBlueInput={(name)=>{
            this.state.blue.name=name;
            this.setState({})
          }}
      />
    }
  }
};

const styles = StyleSheet.create({
 
});

export default App;
