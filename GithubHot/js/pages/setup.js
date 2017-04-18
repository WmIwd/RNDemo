/**
 * Created by yty on 2017/4/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import HomePage from './HomePage';

export default function setup() {
    class Root extends Component {
        renderScene = (route, navigator) => {
            let Target = route.component;
            return <Target {...route.params} navigator={navigator}/>;
        }

        render() {
            return <Navigator
                initialRoute={{component:HomePage}}
                renderScene={(route,navigator) => this.renderScene(route,navigator)}
            />;
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1
        }
    });

    return <Root/>;
}

