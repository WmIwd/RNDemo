/**
 * Created by yty on 2017/4/23.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MoreMenu from '../../js/component/MoreMenu';
import ProjectRow from '../component/listViewRow/PopularProjectRow';
import TrendingProjectRow from '../component/listViewRow/TrendingProjectRow';
import ProjectDetails from './ProjectDetails';

export default class FavoritePage extends Component {

    getNavLeftBtn = () => {
        return <View></View>;
    }


    getNavRightBtn = () => {
        return <View ref="moreMenuButton">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={()=>this.refs.moreMenu.showPopover(this.refs.moreMenuButton)}>
                <Image style={{width:24,height:24,margin:8}}
                       source={require('../../res/images/ic_more_vert_white_48pt.png')}></Image>
            </TouchableOpacity>
        </View>

    }

    render() {
        return <View style={styles.container}>
            <NavigationBar leftBtn={this.getNavLeftBtn()} title="收藏" rightBtn={this.getNavRightBtn()}/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}
            >
                {
                    <FavoritePopularTab {...this.props} key='tab_popular' tabLabel='最热'/>
                }
                {
                    <FavoriteTrendingTab {...this.props} key='tab_trending' tabLabel='趋势'/>
                }
            </ScrollableTabView>
            <MoreMenu ref="moreMenu"/>
        </View>;
    }
}


class FavoritePopularTab extends Component {

    handleProjectSelect = (obj) => {
        this.props.navigator.push({
            component: ProjectDetails,
            params: {title: obj.full_name, url: obj.html_url}
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false
        };
    }

    renderRow = (item) => {
        return <ProjectRow item={item} onSelect={()=>this.handleProjectSelect(item)} from='favorite'/>;
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.loadData}
                        tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['#63B8FF']}
                    />
                }
            />
        </View>;
    }


    componentDidMount() {
        this.loadData();
        //接受来自热门页面的事件
        this.subscription = DeviceEventEmitter.addListener('popular_refresh', (data) => {
            console.log(data);
            this.loadData();
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }


    loadData = () => {
        this.setState({isLoading: true});
        AsyncStorage.getItem('popular')
            .then(value => {
                if (value !== null) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(JSON.parse(value)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }

            })
    }
}

class FavoriteTrendingTab extends Component {

    handleProjectSelect = (obj) => {
        this.props.navigator.push({
            component: ProjectDetails,
            params: {title: obj.fullName, url: `https://github.com${obj.url}`}
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false
        };
    }

    renderRow = (item) => {
        return <TrendingProjectRow item={item} onSelect={()=>this.handleProjectSelect(item)} from='favorite'/>;
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.loadData}
                        tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['#63B8FF']}
                    />
                }
            />
        </View>;
    }

    componentDidMount() {
        this.loadData();
        //接受来自趋势页面的收藏事件
        this.subscription = DeviceEventEmitter.addListener('trending_refresh', (data) => {
            console.log(data);
            this.loadData();
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    loadData = () => {
        this.setState({isLoading: true});
        AsyncStorage.getItem('trending')
            .then(value => {
                if (value !== null) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(JSON.parse(value)),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }

            })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5

    }
});