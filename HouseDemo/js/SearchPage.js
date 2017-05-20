/**
 * Created by shang on 16/7/20.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';

var SearchResults = require('./SearchResults');
import Video from './MyVideo';

function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;
     var queryString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
     return 'http://api.nestoria.co.uk/api?' + queryString;
};

class SearchPage extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: '',
        };
      }
    //搜索框文字变化调用
    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }
    //正在查询
    _executeQuery(query) {
        console.log('正字查询:  ' + query);
        this.setState({isLoading: 'true'});
        fetch(query).then(response => response.json()).then(json => this._handleResponse(json.response))
                    .catch (error => this.setState({
            isLoading: false,
            message: '发生了一些问题: ' + error,
        }));
    }

    //查询成功后调用
    _handleResponse(response) {
        this.setState({
            isLoading: false,
            message: '',
        });
        if(response.application_response_code.substr(0, 1) === '1') {
            console.log('找到信息: ' + response.listings.length);
            this.props.navigator.push({
                title: '搜索结果',
                component: SearchResults,
                passProps: {listings:response.listings},
            });
        }
        else {
            this.setState({
                message: '输入地区未找到,请重试!',
            });
        }
    }
    //搜索按钮点击后调用
    onSearchPressed() {
	    this.setState({
		    message: '',
	    });
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }

    //附近按钮点击后调用(定位)
    onLocationPressed() {
        //
        this.props.navigator.push({
            component:Video,
        })
    }

    render() {
        console.log('SearchPage.render');
        var spinner = this.state.isLoading ? (<ActivityIndicator
                                                    hidden='true'
                                                    size='large' />) :
                                                (<View/>);
        return(
            <View style={styles.container} keyboardShouldPersistTaps={false}>
                <Text style={styles.description}>
                    搜索想买的房子吧!
                </Text>
                <Text style={styles.description}>
                    通过地名,邮编或基于位置搜!
                </Text>
                <View style={styles.flowRight}>
                     <TextInput
                         style={styles.searchInput}
                         value={this.state.searchString}
                         ref="textInput"
                         onFocus={() => {this.refs.textInput.focus()}}
                         onChange={this.onSearchTextChanged.bind(this)}
                         placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                                         underlayColor='#99d9f4'
                                        onPress={this.onSearchPressed.bind(this)}>
                            <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button}
                                underlayColor='#99d9f4'
                                onPress={this.onLocationPressed.bind(this)}>
                    <Text style={styles.buttonText}>我的附近</Text>
                </TouchableHighlight>
                <Image source={require('../image/house.png')} style={styles.imgs} />
                {spinner}
                <Text style={styles.description}>{this  .state.message}</Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },

    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    imgs: {
        width: 217,
        height: 138,
    },
});

module.exports = SearchPage;