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


var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var popular_def_lans = require('../../res/data/popular_def_lans.json');

export default class TrendingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: popular_def_lans,
            isVisible: false,
            buttonRect: [],
            currentTab: popular_def_lans[0].name
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
                <Text style={{color:'#FFF',fontSize:16}}>趋势</Text>
                <Image source={require('../../res/images/ic_spinner_triangle.png')}
                       style={{width:12,height:12,marginLeft:5}}/>
            </View>
        </TouchableOpacity>;
    }

    selectPopover = (item) => {
        console.log(item.name);
        this.setState({currentTab: item.name});
    }

    renderPopover = () => {
        let views = [];
        for (let i = 0; i < this.state.languages.length; i++) {
            let item = this.state.languages[i];
            if (item.checked) {
                views.push(<TouchableOpacity
                    key={`popover_${i}`}
                    activeOpacity={0.5}
                    onPress={()=>{this.selectPopover(item)}}>
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>);
            }
        }
        return <View style={{alignItems:'center',paddingHorizontal:10}}>
            {views}
        </View>;
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar titleView={this.getTitleView()}/>
            <TrendingTab {...this.props} tabLabel={this.state.currentTab}/>
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={this.closePopover}
            >
                {this.renderPopover()}
            </Popover>
        </View>;
    }
}

class TrendingTab extends Component {
    static defaultProps = {
        tabLabel: popular_def_lans[0].name
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
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?since=daily`)
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