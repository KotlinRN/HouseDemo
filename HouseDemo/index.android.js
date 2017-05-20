/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator
} from 'react-native';

var SearchPage = require('./js/SearchPage');

class HouseDemo extends Component {
    render() {
        return (
            <Navigator style={styles.container}
        initialRoute={{component:SearchPage}}
        renderScene={(route,navigator)=>{
            let Component = route.component;
            return <Component {...route.passProps} navigator={navigator} />
        }}
        configureScene={()=>{
            return Navigator.SceneConfigs.FloatFromRight;
        }}
    />
    );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('HouseDemo', () => HouseDemo);
