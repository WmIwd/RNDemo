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
import SortKeyPage from './SortKeyPage';

export default class MyPage extends Component {
    gotoCustomKey = () => {
        this.props.navigator.push({
            component: CustomKeyPage
        });
    }
    gotoSortKey = () => {
        this.props.navigator.push({
            component: SortKeyPage
        });
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title="我的"/>
            <Text onPress={this.gotoCustomKey}>自定义分类</Text>
            <Text onPress={this.gotoSortKey}>语言分类排序</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
