/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//下拉加载
/*
 * onEndReached function

 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。
 原生的滚动事件会被作为参数传递。
 译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。

 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    ListView,

} from 'react-native';


import {PullList} from 'react-native-pull';

export default class ListViewRefresh extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [{
            id: 0,
            title: `this is the first.`,
        }];
        this.state = {
            list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        // this.loadMore();
    }

    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>当前PullList状态: pulling...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>当前PullList状态: pullok......</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>当前PullList状态: pullrelease......</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <PullList
                    style={{}}
                    onPulling={()=>{console.log('刚开始下拉')}}
                    onPullOk={()=>{console.log('下拉到达临界点')}}
                    onPullRelease={this.onPullRelease} //松手调用方法。请求接口加载数据
                    topIndicatorRender={this.topIndicatorRender} //顶部刷新试图，可自定义，有三种状态可以判断，进而显示不同的界面
                    topIndicatorHeight={60}//顶部刷新控件的高度
                    renderHeader={this.renderHeader}
                    dataSource={this.state.list}
                    pageSize={5}//每次渲染的条数，加载数据的时候最后也是5条，与此相同即可
                    initialListSize={5}//默认条数
                    renderRow={this.renderRow}
                    //React Native中文网注释如下：
                    // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。
                    // 原生的滚动事件会被作为参数传递。
                    // 译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={60}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>This is header</Text>
            </View>
        );
    }

    renderRow(item, sectionID, rowID, highlightRow) {
        return (
            <View style={{height: 50, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center'}}>
                <Text>{item.title}</Text>
            </View>
        );
    }

    renderFooter() {
        if(this.state.nomore) {
            return null;
        }
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }

    loadMore() {
        this.dataSource.push({
            id: 0,
            title: `begin to create data ...`,
        });
        for(var i = 0; i < 5; i++) {
            this.dataSource.push({
                id: i + 1,
                title: `this is ${i}`,
            })
        }
        this.dataSource.push({
            id: 6,
            title: `finish create data ...`,
        });
        setTimeout(() => {
            this.setState({
                list: this.state.list.cloneWithRows(this.dataSource)
            });
        }, 1000);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('pullRefresh', () => ListViewRefresh);
