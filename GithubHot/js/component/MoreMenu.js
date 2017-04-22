/**
 * Created by yty on 2017/4/22.
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

import Popover from './Popover';

export const MORE_MENU = {
    Custom_key: '自定义分类',
    Sort_Key: '语言排序'
};

export default class MoreMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            buttonRect: []
        }
    }

    showPopover = (view) => {
        view.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    selectPopover = (key, value) => {
        // console.log(item.name);
        // this.setState({currentTime: {key, value}});
        this.closePopover();
    }

    closePopover = () => {
        this.setState({isVisible: false});
    }

    renderPopover = () => {
        let views = [];
        for (let opt in MORE_MENU) {
            views.push(<TouchableOpacity
                key={`popover_${opt}`}
                activeOpacity={0.5}
                onPress={()=>{this.selectPopover(opt,MORE_MENU[opt])}}>
                <Text style={styles.text}>{MORE_MENU[opt]}</Text>
            </TouchableOpacity>);
        }
        return <View style={{alignItems:'center',paddingHorizontal:10}}>
            {views}
        </View>;
    }

    render() {
        return <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            onClose={this.closePopover}
            placement="bottom"
            contentStyle={{backgroundColor:'#343434',opacity:0.8}}
        >
            {this.renderPopover()}
        </Popover>
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5

    }
});