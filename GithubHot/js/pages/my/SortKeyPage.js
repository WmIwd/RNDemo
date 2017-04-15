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
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../../component/NavigationBar';
import SortableListView from "react-native-sortable-listview";
import Toast from "react-native-easy-toast";

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    }

    //保存
    handleSave = () => {
        this.doSave();
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
                    this.forceUpdate();
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
                    let result = [];
                    JSON.parse(value).forEach(item => {
                        if (item.checked) result.push(item);
                    })
                    this.setState({data: result});
                }
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