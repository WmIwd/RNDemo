/**
 * Created by yty on 2017/4/15.
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
    TouchableHighlight,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../../component/NavigationBar';
import SortableListView from "react-native-sortable-listview";
import Toast from "react-native-easy-toast";
import ArrayUtils from '../../component/ArrayUtils';

var popular_def_lans = require('../../../res/data/popular_def_lans.json');

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originData: popular_def_lans,
            data: []
        }
    }

    //返回
    handleBack = () => {
        this.doBack();
    }

    doBack = () => {
        //把任务栈顶部的任务清除
        this.props.navigator.pop();
    }

    doSave = () => {
        let originArray = this.state.originData;
        let storedArray = this.state.data;
        let savedArray = [];
        for (let i = 0, j = 0; i < originArray.length; i++) {
            let item = originArray[i];
            if (!item.checked) {
                savedArray[i] = item;
            } else {
                savedArray[i] = storedArray[j];
                j++;
            }
        }

        AsyncStorage.setItem('custom_key', JSON.stringify(savedArray))
            .then(() => {
                this.refs.toast.show('保存成功');
                this.doBack();
                DeviceEventEmitter.emit('home_page_refresh', 'HomePage重新加载');
            });
    }

    //保存
    handleSave = () => {
        if (ArrayUtils.isAbsEqual(this.state.data, this.originData)) {
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

    getNavLeftBtn = () => {
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}>
                <Image source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
                       style={{width:24,height:24}}/>
            </TouchableOpacity>
        </View>;
    }

    getNavRightBtn = () => {
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleSave}>
                <View style={{marginRight:10}}>
                    <Text style={{fontSize:16,color:'#FFF'}}>保存</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title="语言分类排序" leftBtn={this.getNavLeftBtn()} rightBtn={this.getNavRightBtn()}/>
            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                onRowMoved={e=>{
                    this.state.data.splice(e.to,0,this.state.data.splice(e.from,1)[0]);
                }}
                renderRow={item=><RowComponent data={item}/>}
            />
            <Toast ref="toast"/>
        </View>;
    }

    componentDidMount() {
        AsyncStorage.getItem('custom_key')
            .then(value => {
                if (value !== null) {
                    let orign = JSON.parse(value);
                    let result = [];
                    orign.forEach(item => {
                        if (item.checked) result.push(item);
                    })
                    this.setState({originData: orign, data: result});
                }
                this.originData = ArrayUtils.clone(this.state.data);
            })
    }
}

class RowComponent extends Component {
    render() {
        return <TouchableHighlight
            underlayColor='#EEE'
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flexDirection:'row',paddingLeft:10}}>
                <Image source={require('../../../res/images/ic_sort.png')} style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#EEE',
        height: 50,
        justifyContent: 'center'
    },
    image: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#63B8FF'
    }
});