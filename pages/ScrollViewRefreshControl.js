/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    ScrollView,
    StyleSheet,
    Text,
    View,
    RefreshControl,
} from 'react-native';

class ScrollViewRefreshControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            rowData: ['row','row','row','row','row'],
        };
    }

    render() {
        var rows = this.state.rowData.map((item, indexKey) => {
            return <Text style={{height:40}}>{item}:{indexKey}</Text>;
        });
        return (
            <ScrollView
                style={styles.scrollviewsss}
                refreshControl={
                     <RefreshControl
                         refreshing={this.state.isRefreshing}
                         onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                         tintColor='red'
                         title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}/>}>

                {rows}

            </ScrollView>
        );
    }
    onRefresh() {
        //第一步，改变状态
        this.setState({isRefreshing: true});

        setTimeout(() => {
            // 准备下拉刷新的5条数据
             var data=this.state.rowData;

             let arr= Array.from(new Array(5)).map((item,index)=>{
                 return ('row:'+{index})

             }).concat(data);


            this.setState({
                isRefreshing: false,
                rowData: arr,
            });
        }, 2000);
    }

}

const styles = StyleSheet.create({

    scrollviewsss:{
        marginTop:20,

    }
});
AppRegistry.registerComponent('pullRefresh', () => ScrollViewRefreshControl);
