/**
 * Created by shang on 16/7/21.
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ListView,
	Image
} from 'react-native';

var PropertyView = require('./PropertyView');

class SearchResults extends Component {
	// 构造
	  constructor(props) {
	    super(props);
		  var ds = new ListView.DataSource({
			  rowHasChanged: (r1, r2) => r1 !== r2,
		  });
	    // 初始状态
	    this.state = {
		    dataSource: ds.cloneWithRows(this.props.listings),
	    };
	  }

	//类似ios中的cellForRow方法
	renderRow(rowData, sectionID, rowID) {
		var price = rowData.price_formatted.split(' ')[0];
		return (
			<TouchableHighlight
				onPress={() => this.rowPressed(rowID)}
				underlayColor='#dddddd'>
					<View>
						<View style={styles.rowContainer}>
							<Image style={styles.thumb}
									source = {{uri: rowData.thumb_url}}
							/>
							<View style={styles.textContainer}>
								<Text style={styles.price}>{price}</Text>
								<Text style={styles.title}
										numberOfLines={1}>
											{rowData.title}
								</Text>
							</View>
						</View>
						<View style={styles.separator} />
					</View>
			</TouchableHighlight>
		);
	}
	//点击某一行调用(参数:行号)
	rowPressed(uid) {
		//
		var property = this.props.listings[uid];
		console.log('点击行的详情: ' + property.price);
		this.props.navigator.push({
			title: '房产详情',
			component: PropertyView,
			passProps: {property: property},
		});
	}
	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
			/>
		);
	}
}

var styles = StyleSheet.create({
	thumb: {
		width: 80,
		height: 80,
		marginRight: 10
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	title: {
		fontSize: 15,
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	}
});

module.exports = SearchResults;