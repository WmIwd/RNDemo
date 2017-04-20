/**
 * Created by yty on 2017/4/7.
 */

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

export default class NavigationBar extends Component {
    static propTypes = {
        leftBtn: PropTypes.element,
        rightBtn: PropTypes.element,
        titleView: PropTypes.element
    }

    static defaultProps = {
        title: ''
    }

    renderTitle = () => {
        return this.props.title.length > 0 ?
            <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text> : this.props.titleView;
    }


    render() {
        return <View style={styles.container}>
            <View style={styles.statusBar}>
                <StatusBar hidden={false} barStyle='light-content' backgroundColor='#63B8FF'/>
            </View>
            <View style={styles.navBar}>
                {this.props.leftBtn}
                {this.renderTitle()}
                {this.props.rightBtn}
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#63B8FF',
        padding: 5
    },
    statusBar: {
        // height:20
        height: Platform.OS === 'ios' ? 20 : 0
    },
    navBar: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        width: ScreenWidth - 140,
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        position: 'absolute',
        left: 70
    }
});