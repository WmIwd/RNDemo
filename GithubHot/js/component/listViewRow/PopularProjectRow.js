/**
 * Created by yty on 2017/4/9.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import FavoriteUtils from '../utils/FavoriteUtils';

export default class ProjectRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: false
        }
    }

    static defaultProps = {
        from: 'popular',
        item: {}
    }

    handleFavorite = () => {
        if (this.state.isFavorite) {
            //取消收藏
            FavoriteUtils.removeFavorite('popular', this.props.item, () => {
                if (this.props.from === 'favorite') {
                    DeviceEventEmitter.emit('popular_refresh_from_favorite', 'popular_refresh_from_favorite');
                } else {
                    DeviceEventEmitter.emit('popular_refresh', 'popular_refresh');
                }
            });

        } else {
            //收藏
            FavoriteUtils.saveFavorite('popular', this.props.item, () => {
                if (this.props.from === 'favorite') {
                    DeviceEventEmitter.emit('popular_refresh_from_favorite', 'popular_refresh_from_favorite');
                } else {
                    DeviceEventEmitter.emit('popular_refresh', 'popular_refresh');
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
        FavoriteUtils.isFavorite('popular', this.props.item, result => this.setState({isFavorite: result}));
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('popular_refresh_from_favorite', (data) => {
            FavoriteUtils.isFavorite('popular', this.props.item, result => this.setState({isFavorite: result}));
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
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.bottom}>
                    <View style={styles.bottomTextWapper}>
                        <Text>作者：</Text>
                        <Image style={styles.image} source={{uri:item.owner.avatar_url}}/>
                    </View>

                    <Text>{`星：${item.stargazers_count}`}</Text>

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