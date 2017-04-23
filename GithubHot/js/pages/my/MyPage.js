/**
 * Created by yty on 2017/4/11.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
}from'react-native';

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
            <MyItemView text="自定义标签" onPress={this.gotoCustomKey}
                        image={<Image style={styles.image} source={require('../../../res/images/ic_custom_language.png')}/>}/>
            <View style={{backgroundColor:'#cecece',height:1}}/>
            <MyItemView text="标签排序" onPress={this.gotoSortKey}
                        image={<Image style={styles.image} source={require('../../../res/images/ic_swap_vert.png')}/>}/>
        </View>;
    }
}

class MyItemView extends Component {
    render() {
        return <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.props.onPress}>
            <View style={styles.itemWrapper}>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    {this.props.image}
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
                <Image style={styles.image} source={require('../../../res/images/ic_tiaozhuan.png')}/>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 15,
        marginLeft: 10
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    }
});
