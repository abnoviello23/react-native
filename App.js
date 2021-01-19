
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { TextInput } from 'react-native';
import { TouchableOpacity} from "react-native";
import { Component } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  Colors,
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
            .catch((error) => {
                alert(JSON.stringify(error));
                console.error(error);
            });
    }
    emptyListView = () => {
        return (
            <View>
                <Text>No records found.</Text>
            </View>
        );
    };

    placeholderforTextInput = () => {
        return (
            <View>
                <FontAwesomeIcon icon={faSearch} size={10} style={{ color: 'grey' }} />
                <Text>Search</Text>
            </View>
            );
    };

render() {
    let half1 = 'https://npiregistry.cms.hhs.gov/api/?first_name='
    let half2 = '&city=&limit=20&version=2.1'
    let loaded
    if (!this.state.result.results && this.state.user_input) {
        loaded = true;
    }
        return (
            <View style={styles.body}>
                <Text style={styles.headertext}>NPI Registry Search</Text>
                <View style={styles.input}>
                    {/*<FontAwesomeIcon icon={faSearch} size={10} style={{ color: 'grey' }} />*/}
                    <TextInput
                        style={styles.fontawesomefamily}
                        placeholder="&#xf002; Search"
                        onChangeText={this.handleInput}
                        />
                </View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                      () => this.makeHTTPCall(half1, this.state.user_input, half2)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                <View>
                    
                    {loaded ? (<View style={styles.activityindicatorbar}><ActivityIndicator size="large" color="red" /></View>) :

                        <View style={styles.body2}>

                            <FlatList
                                data={this.state.result.results}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={
                                    ({ item }) => <View style={styles.renderIteminList}><Text style={styles.renderIteminListLarge}>{item.basic.last_name}, {item.basic.first_name}</Text><Text>{item.addresses[0].address_1}</Text></View>
                                }
                                ListEmptyComponent={this.emptyListView}
                            />
                        </View>
                    }
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
  body: {
      backgroundColor: Colors.white,
      margin: 15,
    },
    inputstyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,

    },
    headertext: {
        fontSize: 50,
        margin: 15,
        textAlign: 'center',
    },
    fontawesomefamily: {
        fontFamily:'fontAwesome',
    },
    body2: {
        marginTop: 10,
    },
       submitButton: {
        backgroundColor: '#0000ff',
        padding: 5,
        margin: 10,
        height: 40,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    renderIteminList: {
        padding: 0,
        height: 50,
        borderWidth: 1,
        borderRadius: 1,
    },
    renderIteminListLarge: {
        padding: 0,
        height: 25,
        fontSize: 20,
        color: 'blue',
    },
    listrendertext: {
        color: 'blue',
    },
    activityindicatorbar: {
        color: 'red',
        height: 25
    }
});

export default App;
