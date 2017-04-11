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
} from 'react-native';

import NavigationBar from '../../component/NavigationBar';

export default class CustomKeyPage extends Component {
    handleBack = () => {
        this.props.navigator.pop();
    }
    getNavLeftBtn = () => {
        return <View style={{flexDirection:'row',alignItems:'center',paddingLeft: 8}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
                       style={{width:24,height:24}}></Image>
            </TouchableOpacity>
        </View>;
    }

    getNavRightBtn = () => {
        return <View style={{flexDirection:'row',alignItems:'center',paddingRight: 8}}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Text style={{fontSize:16,color:'#fff'}}>保存</Text>
            </TouchableOpacity>
        </View>;
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title="自定义分类" leftBtn={this.getNavLeftBtn()} rightBtn={this.getNavRightBtn()}/>
            <Text>CustomKeyPage</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});