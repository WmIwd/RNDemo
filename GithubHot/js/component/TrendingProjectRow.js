/**
 * Created by yty on 2017/4/20.
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

export default class TrendingProjectRow extends Component {
    static defaultProps = {
        item: {}
    }

    renderContributors = (array) => {
        let views = [];
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            views.push(<Image key={`image_${i}`} style={styles.image} source={{uri:item}}/>);
            if (i == 2) break;
        }

        return views;
    }


    render() {
        let item = this.props.item;
        return <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.props.onSelect}>
            <View style={styles.container}>
                <Text style={styles.title}>{item.fullName}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.bottom}>
                    <View style={styles.bottomTextWapper}>
                        <Text>作者：</Text>
                        {this.renderContributors(item.contributors)}
                    </View>

                    <Text>{`星：${item.meta}`}</Text>

                    <Image style={styles.image} source={require('../../res/images/ic_unstar_transparent.png')}/>
                </View>
            </View>
        </TouchableOpacity>;

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 5,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowRadius: 1, //阴影半径
        shadowOpacity: 0.4,
        elevation: 2 //Android 投影
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomTextWapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 22,
        height: 22
    }
});