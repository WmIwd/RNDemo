/**
 * Created by yty on 2017/4/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    RefreshControl
} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ProjectRow from '../component/ProjectRow';

export default class PopularPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: ['Android', 'IOS', 'Java', 'React', 'JS']
        };
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#FFF"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}
            >
                {
                    this.state.languages.map((item, i) => <PopularTab key={`tab${i}`} tabLabel={item}/>)
                }
            </ScrollableTabView>
        </View>;
    }
}

class PopularTab extends Component {
    static defaultProps = {
        tabLabel: 'Android'
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false
        };
    }

    renderRow = (item) => {
        return <ProjectRow item={item}/>
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

    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.items),
                    isLoading: false
                })
            })
            .done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});