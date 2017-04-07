/**
 * Created by yty on 2017/4/7.
 */

import React, {Component} from 'react';
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

export default class NavigationBar extends Component {
    render() {
        return <View style={styles.container}>
            <View style={styles.statusBar}>
                <StatusBar hidden={false} barStyle='light-content' backgroundColor='#63B8FF'/>
            </View>
            <View style={styles.navBar}>
                <View style={{width: 56}}></View>
                <Text style={styles.title}>热门</Text>

                <View style={styles.rightBtn}>
                    <TouchableOpacity
                        activeOpacity={0.7}>
                        <Image style={styles.image}
                               source={require('../../res/images/ic_search_white_48pt.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}>
                        <Image style={styles.image}
                               source={require('../../res/images/ic_more_vert_white_48pt.png')}></Image>
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        color: '#FFF'
    },
    rightBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8
    },
    image: {
        width: 24,
        height: 24
    }
});