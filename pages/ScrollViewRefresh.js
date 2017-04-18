/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*

//下拉刷新
* PullView & PullList 下拉效果属性

 style: 设置组件样式，比如可以设置width/height/backgroudColor等
 onPulling: 处于pulling状态时执行的方法
 onPullOk: 处于pullok状态时执行的方法
 onPullRelease: 处于pullrelease状态时执行的方法
 topIndicatorRender: 顶部刷新指示组件的渲染方法, 接受三个参数: ispulling, ispullok, ispullrelease
 topIndicatorHeight: 顶部刷新指示组件的高度, 若定义了topIndicatorRender则同时需要此属性
 isPullEnd: 是否已经下拉结束，若为true则隐藏顶部刷新指示组件，非必须

 仅PullView支持普通refreshcontrol的相关属性

 onRefresh: 开始刷新时调用的方法
 refreshing: 指示是否正在刷新
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

const {width, height} = Dimensions.get('window')

import {PullView} from 'react-native-pull';


export default class ScrollViewRefresh extends Component {

    constructor(props){
        super(props);

        this.state={
            loadText:'下拉刷新',
            isRefreshing:false,
            isLoadEnd:false,
            dataSource:Array.from(new Array(5)).map(
                (item, index) => ('row'+{index})),
        };



        this.onPulling = this.onPulling.bind(this);
        this.onPullOk = this.onPullOk.bind(this);
        this.onPullRelease = this.onPullRelease.bind(this);

    }

    onPullOk(){
        //只要拉倒那个临界点，就会调用该方法
        console.log('onPullOk');
        this.setState({
            loadText:'释放刷新'
        });

    }
    onPulling(){
        //下拉时调用
        console.log('onPulling');

        this.setState({
           loadText:'下拉刷新',
        });
    }
    onPullRelease(resolve) {
        //松开手指刷新调用
        console.log('onPullRelease');
        this.setState({
            loadText:'正在刷新',
            isRefreshing:false,
            isLoadEnd:false,

        });


        setTimeout(() => {
            // 准备下拉刷新的5条数据
            var data=this.state.dataSource;

            let arr= Array.from(new Array(5)).map((item,index)=>{
                return ('row:'+{index})

            }).concat(data);


            this.setState({
                isRefreshing: true,
                dataSource: arr,
                loadText:'下拉刷新',
                isLoadEnd:true,
            });


            //回到原始状态
            resolve();


        }, 2000);
    }




    render() {

        let rows=this.state.dataSource.map((item,index)=>{
            return (
                <Text key={index} style={{fontSize:20,marginTop:10}}>{item}</Text>

            )
        });

        return (
            <View style={styles.container}>
                <PullView style={styles.pullViewStyle}
                          onPullRelease={this.onPullRelease}
                          onPulling={this.onPulling}
                          onPullOk={this.onPullOk}
                          topIndicatorRender={(pulling, pullok, pullrelease) => {

                               //下拉时会监听三个状态，可根据状态来判断当前显示什么headerView
                               console.log(pulling,pullok,pullrelease);

                                return(

                                    <View style={{justifyContent:'center',alignItems:'center',height:60,width:width}}>

                                    <Text>{this.state.loadText}</Text>

                                    </View>


                                )
                          }}
                          topIndicatorHeight={60}
                          isPullEnd={this.state.isLoadEnd}//刷新完隐藏headerView
                          refreshing={this.state.isRefreshing}


                >



                    {rows}

                </PullView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop:20,
    },
    pullViewStyle:{
        backgroundColor:'yellow',
        width:width,
        height:height-20,
    },
    pullViewHeader: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


AppRegistry.registerComponent('pullRefresh', () => ScrollViewRefresh);
