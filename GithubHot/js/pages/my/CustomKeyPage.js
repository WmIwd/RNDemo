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
    TouchableOpacity,
    AsyncStorage,
    Alert,
    DeviceEventEmitter
} from 'react-native';

import NavigationBar from '../../component/NavigationBar';
import CheckBox from 'react-native-check-box';
import Toast from "react-native-easy-toast";
import ArrayUtils from '../../component/ArrayUtils';

var popular_def_lans = require('../../../res/data/popular_def_lans.json');

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: popular_def_lans
        }
    }

    handleBack = () => {
        this.doBack();
    }
    handleSave = () => {
        if (ArrayUtils.isAbsEqual(this.state.data, this.orignData)) {
            this.doBack();
        } else {
            Alert.alert('提示', '是否需要保存？', [
                {
                    text: '是', onPress: () => {
                    this.doSave()
                }
                },
                {
                    text: '否', onPress: () => {
                    this.doBack()
                }
                }
            ]);
        }
    }

    doBack = () => {
        this.props.navigator.pop();
    }

    doSave = () => {
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(() => {
                this.refs.toast.show('保存成功');
                this.doBack();
                DeviceEventEmitter.emit('home_page_refresh', 'HomePage重新加载');
            });
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
                activeOpacity={0.7}
                onPress={this.handleSave}>
                <Text style={{fontSize:16,color:'#fff'}}>保存</Text>
            </TouchableOpacity>
        </View>;
    }

    handleClick = (item) => {
        item.checked = !item.checked;
    }

    renderCheckBox = (item) => {
        return item == undefined ? <View style={{flex:1,padding:5}}></View> : <CheckBox
                style={{flex:1,padding:5}}
                leftText={item.name}
                isChecked={item.checked}
                onClick={()=>this.handleClick(item)}
                unCheckedImage={<Image source={require('../../../res/images/ic_check_box_outline_blank.png')} style={styles.checkbox}/>}
                checkedImage={<Image source={require('../../../res/images/ic_check_box.png')} style={styles.checkbox}/>}/>;
    }

    renderViews = () => {
        let views = [];
        for (let i = 0; i < this.state.data.length; i += 2) {
            views.push((<View key={`view_${i}`} style={{flexDirection:'row'}}>
                {this.renderCheckBox(this.state.data[i])}
                {this.renderCheckBox(this.state.data[i + 1])}
            </View>));
        }

        return views;
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title="自定义分类" leftBtn={this.getNavLeftBtn()} rightBtn={this.getNavRightBtn()}/>
            <View style={{padding:10}}>
                {this.renderViews()}
            </View>
            <Toast ref="toast"/>
        </View>;
    }

    componentDidMount() {
        AsyncStorage.getItem('custom_key')
            .then(value => {
                if (value !== null) {
                    this.setState({data: JSON.parse(value)});
                }
                this.orignData = ArrayUtils.clone(this.state.data);
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    checkbox: {
        tintColor: '#63B8FF'
    }
});