//ViewSchedule.js
import React from "react";
import { useQuery } from '@apollo/client';
import EventCalendar from 'react-native-events-calendar'
import { Button, Text, ActivityIndicator, View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import * as Constants from "../common/Constants";
import * as Queries from "../common/GraphQLQueries";
import {HeaderBackButton} from "@react-navigation/stack";
import PresentationEvent from "../Screens/PresentationEvent";
// import { useAuth0 } from "@auth0/";
import GetAllConf from "../common/ListOfConferences"
import { useEffect } from "react";
import Video from 'react-native-video';

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default function VideoStream({route, navigation}) {
    const videoURI = route.params.videoURI

    return <WebView
    style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
    javaScriptEnabled={true}
    domStorageEnabled={true}
    source={{uri: videoURI}}
/>
        // return <Video source={{uri: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"}}
        // ref={(ref) => {
        //     this.player = ref
        //   }}  
        // style={styles.backgroundVideo}
        //   />
}