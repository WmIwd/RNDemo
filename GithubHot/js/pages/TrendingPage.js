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
    ListView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import GitHubTrending from 'GitHubTrending';
import TrendingProjectRow from '../component/TrendingProjectRow';
import ProjectDetails from './ProjectDetails';
import Popover from "../component/Popover";
import ScrollableTabView from 'react-native-scrollable-tab-view';


var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var popular_def_lans = require('../../res/data/popular_def_lans.json');

const TIME_MAP = new Map([
    ['今 天', 'since=daily'],
    ['本 周', 'since=weekly'],
    ['本 月', 'since=monthly']
]);

export default class TrendingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: popular_def_lans,
            isVisible: false,
            buttonRect: [],
            currentTime: {key: '今 天', value: 'since=daily'}
        }
    }

    showPopover = () => {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover = () => {
        this.setState({isVisible: false});
    }

    getTitleView = () => {
        return <TouchableOpacity
            ref="button"
            activeOpacity={0.5}
            onPress={this.showPopover}>
            <View style={{flexDirection:'row',alignItems:'center',width:ScreenWidth,justifyContent:'center'}}>
                <Text style={{color:'#FFF',fontSize:16}}>趋势 {this.state.currentTime.key}</Text>
                <Image source={require('../../res/images/ic_spinner_triangle.png')}
                       style={{width:12,height:12,marginLeft:5}}/>
            </View>
        </TouchableOpacity>;
    }

    selectPopover = (key, value) => {
        // console.log(item.name);
        this.setState({currentTime: {key, value}});
        this.closePopover();
    }

    renderPopover = () => {
        let views = [];
        for (let [key, value] of TIME_MAP) {
            views.push(<TouchableOpacity
                key={`popover_${value}`}
                activeOpacity={0.5}
                onPress={()=>{this.selectPopover(key,value)}}>
                <Text style={styles.text}>{key}</Text>
            </TouchableOpacity>);
        }
        return <View style={{alignItems:'center',paddingHorizontal:10}}>
            {views}
        </View>;
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar titleView={this.getTitleView()}/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}
            >
                {
                    this.state.languages.map((item, i) => item.checked === true ?
                        <TrendingTab {...this.props} key={`tab${i}`} tabLabel={item.name}
                                                     time={this.state.currentTime.value}/> : null)
                }
            </ScrollableTabView>
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={this.closePopover}
                contentStyle={{backgroundColor:'#343434',opacity:0.8}}
            >
                {this.renderPopover()}
            </Popover>
        </View>;
    }
}

class TrendingTab extends Component {
    static defaultProps = {
        tabLabel: popular_def_lans[0].name,
        time: 'since=daily'
    }

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
        return <TrendingProjectRow item={item} onSelect={()=>this.handleProjectSelect(item)}/>
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
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
        this.loadData(this.state.time);
    }

    loadData = (time) => {
        this.setState({isLoading: true});
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?${time}`)
            .then(value => {
                //更新dataSource
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(value),
                    isLoading: false, //隐藏进度条
                });
            }).catch((error) => {
            console.error(error);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time != this.props.time) {
            this.loadData(nextProps.time);
        }
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