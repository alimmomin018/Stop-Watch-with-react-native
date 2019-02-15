import formatTime from 'minutes-seconds-milliseconds';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      timeElpased: null,
      running: false,
      startTime: null,
      laps:[]
    }
  }

  render() {
    return <View style={styles.container}>
      <View style={[styles.header]}> 
        <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElpased)}
          </Text>
        </View>

        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer]}>
        
          {this.laps()}
        
      </View>

    </View>
  }

  laps(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  }

  startStopButton(){
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight underlayColor="gray"
                                onPress={this.onStartStopButtonPressed}
                                style={[styles.button, style]}>
      <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
    </TouchableHighlight>
  }

  lapButton(){
    return <TouchableHighlight style={styles.button}
                                underlayColor="gray"
                                onPress={this.onLapButtonPressed}>
      <Text>Lap</Text>
    </TouchableHighlight>
  }

  onLapButtonPressed = () => {
    var lap = this.state.timeElpased //value of the timer

    this.setState({
      startTime:new Date(),
      laps: this.state.laps.concat([lap])
    });
  }

  borderColor(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

  onStartStopButtonPressed = () => {
    if(this.state.running){ //handling stop
      clearInterval(this.interval);//clearing the state
      this.setState({running: false}); //setting running to false by using setState method
      return //return aka break the execution and return nothing
    }

    this.setState({startTime: new Date()}); //new date() method gets the current time in mili second
    //new Date() will always start from 0

    this.interval = setInterval(() => { //saving the state into interval
      this.setState({
        timeElpased: new Date() - this.state.startTime,
        running: true
      })
    }, 30) // setInterval(function, time). This method sets the update interval to every 30 ms. where, function ()=>{} and time is 30 means 30 ms and 1000ms means 1 sec
    //setState updates the state
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch'
  },
  header:{
    flex:1
  },
  footer:{
    flex:1
  },
  timerWrapper:{
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper:{
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer:{
    fontSize: 60
  },
  button:{
    borderWidth:2,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton:{
    borderColor: '#00CC00'
  },
  stopButton:{
    borderColor: '#CC0000'
  },
  lap:{
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText:{
    fontSize: 30
  }
});