/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { TextInput } from 'react-native';
import { TouchableOpacity} from "react-native";
import { useState } from "react";
import { Component } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class My_Input extends Component {
    state = {
        user_input: '',
        result: ''
    }

    handleInput = (text) => {
        this.setState({user_input: text})
    }

    makeHTTPCall = (firsthalf, user_input, secondhalf) => {
        fetch(firsthalf + user_input + secondhalf, { method: 'GET', })

        .then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                console.log(responseJson);
                this.setState({
                    result: responseJson
                })
                //alert(JSON.stringify(this.state.result));
            })
    }
    emptyListView = () => {
        return (
            <View>
                <Text>No records found.</Text>
            </View>
        );
    };

render() {
    const half1 = 'https://npiregistry.cms.hhs.gov/api/?first_name='
    const half2 ='&city=&limit=20&version=2.1'
        return (
            <View style={styles.body}>
                <TextInput
                    placeholder="Search"
                    onChangeText={this.handleInput} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                      () => this.makeHTTPCall(half1, this.state.user_input, half2)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                <View style={styles.body}>
                    <ActivityIndicator size="large" />
                </View>
                <View style={styles.body}>
                    {/*<Text>
                        {JSON.stringify(this.state.result.results)}
                    </Text>*/}
                    <FlatList
                        data={this.state.result.results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => <Text>{item.basic.last_name}</Text>
                        } 
                    />
                </View>

               
            </View>
            )

    }

}


const App = () => {
    //const [value, onChangeText] = React.useState('Useless Placeholder');
    //const [count, setCount] = useState(0);
    //const onPress = () => setCount(prevCount => prevCount + 1);
  return (
    <>
          <My_Input/>
    
    </>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
      backgroundColor: Colors.white,
      marginTop: 32,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
       submitButton: {
        backgroundColor: '#0000ff',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});

export default App;
