import { Text, SafeAreaView, View } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import {SlideInDown,FadeInUp, FadeInDown, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, TapGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { BlurView } from "expo-blur";

const Home = () =>{

    //Status bar check
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[{height :STATUSBAR_HEIGHT }, { backgroundColor },{zIndex:0}]}>
          <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
          </SafeAreaView>
        </View>
      );
    

      //change text and function state
      const [pressText, setPressText] = useState("Next");

    //Double Tap Function on an Html element
    let lastpress = 0; // last time tap
    const DoubleTap = () =>{                    //DoubleTap function that detects double press in the middle of the screen
        const time = new Date().getTime(); //Get Time Press
        const delta = time - lastpress;
        const delay = 400; //Press Delay
        if (delta < delay) {
            console.log("doubleTap");
            stateTrigger();
        }
        lastpress = time;
    }
    //


    //Dark and Light Theme Handler
    let colorsheme = useColorScheme();
    let ContainerTheme = colorsheme ==='light'? styles.Lightmode : styles.Darkmode; //theme of the viewpage
    let WelcomTextTheme = colorsheme ==='light'? styles.WelcomeLight : styles.WelcomeDark; //Theme of Welcome Text
    let IndicationTextTheme = colorsheme ==='light'? styles.ClickonLight : styles.ClickonDark; // Indication Text Theme


    //Switch to Instructions Handler
    const [isActive, setIsActive] = useState(false);
    const [noticeIsActive,setNoticeIsActive] = useState(false);
    const animatedStyles = useAnimatedStyle(()=>{
        return {
            width: numInstruction==404? withTiming(400):withTiming(350),
            transform :[
                {
                    translateY : numInstruction==404? withTiming(-560,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(175),
                }
            ]
        }
    });

    //Notice State change
    const NoticeAnimation = useAnimatedStyle(() =>{
        return {
        transform : [
             {
            translateY : noticeIsActive? withTiming(0,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(800)
            }
        ]}
    })


    //Animation of each Instruction
    const [numInstruction,setNumInstruction] = useState(0);
    const InstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:1,
            transform:[
                {
                translateY : isActive? withTiming(-560,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0)
                }
            ]
        }
    })

    const fadingupAnimation = useAnimatedStyle(()=>{
        return{
            opacity: isActive? withTiming(0,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(1,{duration:400, easing:Easing.inOut(Easing.quad)}),
            transform:[
                {
                    translateY : isActive? withTiming(-500):withTiming(0)
                }
            ]
        }
    })

    const buttonAnimation = useAnimatedStyle(() =>{
        return{
            backgroundColor: isActive? withTiming('rgba(52, 52, 52, 0.8)',{duration:400, easing:Easing.inOut(Easing.quad)}): withTiming("#7AA8AE"),
            transform: [
                {
                    translateY: isActive? withTiming(-160,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0)
                }
            ]
        }
    })

    //PageStates
    function stateTrigger() {
        if (!isActive) {
            setPressText("Start");
            setIsActive(!isActive);
        }
        else{
            //setNoticeIsActive(true);
            if (!noticeIsActive) {
                setNoticeIsActive(true);
            }
            else{
                router.push("/Scanpage");
            }
            
        }
    }

  


    // this represents the code of the first page(Home page) of the app
    return(
            <GestureHandlerRootView onStartShouldSetResponder={DoubleTap} style = {ContainerTheme}>

            <MyStatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>
            <Animated.Text style = {[WelcomTextTheme,fadingupAnimation]}>Welcome !</Animated.Text>
            <Animated.Image source = {require("../src/image/homepage_image.png")} style= {[styles.firstImageStyle, fadingupAnimation]}></Animated.Image>  
            <Animated.Text style = {[IndicationTextTheme,fadingupAnimation]}>Here is a quick guide:</Animated.Text>                                                    
            <Animated.View style ={[styles.InstructionSet,animatedStyles]}>
                <Animated.View style={[styles.InstructionBlock,InstructAnimation]}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Start</Text>
                    <Text style = {styles.InstructionDescription}>Start by clicking on the start button or use text command</Text>
                    </View>
                </Animated.View>
                <Animated.View style={styles.InstructionBlock}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Scan</Text>
                    <Text style = {styles.InstructionDescription}>Take a picture of the covid test by placing it in the middle of the camera</Text>
                    </View>
                </Animated.View>
                <Animated.View style={styles.InstructionBlock}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Analyse</Text>
                    <Text style = {styles.InstructionDescription}>The system will analyse and indicate the result of the test</Text>
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View style = {[styles.Pressable,buttonAnimation]} >  
            <Pressable  onPress={()=>stateTrigger()}  asChild>
                    <Text style={styles.Button}>{pressText}</Text>
            </Pressable>
            </Animated.View>
            <Animated.View style={[styles.CameraPermissionView,NoticeAnimation]}>
                <Text style={[WelcomTextTheme, {color : "#7AA8AE"}]}>Notice !</Text>
                <Animated.View style = {[styles.NoticeText]}>
                    <Text style ={[styles.InstructionDescription,{margin : 40},{textAlign: "center"}]}>This appliction needs Camera permission</Text>
                    <Pressable style = {[styles.NoticeButton,{position : "relative"}]}>
                        <Text style = {[styles.Button,{fontSize:20}]}>Permit</Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>
            
            </GestureHandlerRootView>
            
        
    )
}

export default Home;