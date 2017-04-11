/**
 * Created by yty on 2017/4/11.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigationBar from '../../component/NavigationBar';
import CustomKeyPage from './CustomKeyPage';

export default class MyPage extends Component {
    gotoCustomKey = () => {
        this.props.navigator.push({
            component:CustomKeyPage
        });
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title="我的"/>
            <Text onPress={this.gotoCustomKey} n>my</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
