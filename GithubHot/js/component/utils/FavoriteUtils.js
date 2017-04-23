/**
 * Created by yty on 2017/4/23.
 */

import {
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import ArrayUtils from './ArrayUtils';

export default class FavoriteUtils {
    /**
     * 收藏
     * @param key
     * @param item
     */
    static saveFavorite(key, item, callback) {
        AsyncStorage.getItem(key)
            .then(value => {
                let array = JSON.parse(value);
                if (array == null) {
                    array = [];

                }
                array.push(item);
                AsyncStorage.setItem(key, JSON.stringify(array), callback);
            })
    }

    /**
     * 取消收藏
     * @param key
     * @param item
     */
    static removeFavorite(key, item, callback) {
        AsyncStorage.getItem(key)
            .then(value => {
                let array = JSON.parse(value);
                ArrayUtils.removeItem(array, item);
                AsyncStorage.setItem(key, JSON.stringify(array), callback);
            })
    }

    /**
     *是否是收藏
     * @param key
     * @param item
     */
    static isFavorite(key, item, callback) {
        AsyncStorage.getItem(key)
            .then(value => {
                let result = false;
                if (value !== null) {
                    let array = JSON.parse(value);
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].url === item.url) {
                            result = true;
                            break;
                        }
                    }
                }
                callback(result);
            })
    }


}