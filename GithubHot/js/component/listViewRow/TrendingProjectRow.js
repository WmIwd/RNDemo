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
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import FavoriteUtils from '../utils/FavoriteUtils';

export default class TrendingProjectRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: false
        }
    }

    static defaultProps = {
        from: 'trending',
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

    handleFavorite = () => {
        if (this.state.isFavorite) {
            //取消收藏
            FavoriteUtils.removeFavorite('trending', this.props.item, () => {
                //根据ProjectRow来自的不同页面发不同的事件。
                if (this.props.from === 'favorite') {
                    DeviceEventEmitter.emit('trending_refresh_from_favorite', 'trending_refresh_from_favorite');
                } else {
                    DeviceEventEmitter.emit('trending_refresh', 'popular_refresh');
                }
            });
        } else {
            //收藏
            FavoriteUtils.saveFavorite('trending', this.props.item, () => {
                if (this.props.from === 'favorite') {
                    DeviceEventEmitter.emit('trending_refresh_from_favorite', 'trending_refresh_from_favorite');
                } else {
                    DeviceEventEmitter.emit('trendingrefresh', 'trending_refresh');
                }
            });
        }
        this.setState({isFavorite: !this.state.isFavorite});
    }

    renderFavorite = () => {
        let image = this.state.isFavorite ?
            <Image style={styles.image} source={require('../../../res/images/ic_star.png')}/> :
            <Image style={styles.image} source={require('../../../res/images/ic_unstar_transparent.png')}/>;
        return <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleFavorite}
        >
            {image}
        </TouchableOpacity>;
    }

    componentWillMount() {
        FavoriteUtils.isFavorite('trending', this.props.item, result => this.setState({isFavorite: result}));
    }

    componentDidMount() {
        //接受来自收藏页面的事件，改变状态
        this.subscription = DeviceEventEmitter.addListener('trending_refresh_from_favorite', (data) => {
            FavoriteUtils.isFavorite('trending', this.props.item, result => this.setState({isFavorite: result}));
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
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

                    {this.renderFavorite()}
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