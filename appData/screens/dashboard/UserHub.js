import { Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, {useEffect, useRef} from 'react';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

//import statements for styles
import { stylesPortrait } from "../../styles/portrait";

// import { stylesLandscape } from "./styles/landscape.js";
import { Dimensions, TouchableHighlight } from 'react-native';

//import components and classes
import { Input } from '../../components/components.js'
import { FirebaseButler, TDO } from '../../components/classes.js'

//import for scrollview
import { ScrollView } from 'react-native';

// import for calendar
import { Calendar, CalendarUtils } from 'react-native-calendars';
import {StyleSheet} from 'react-native';

//import for database stuff
import { getDatabase, ref, set, get, push, onValue } from 'firebase/database';

// import for Bottom Nav Bar

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation} from 'react-native-paper';
import HostingDashboard from './HostingDashboard';
import ProfileScreenIPersonal from '../profile/ProfileScreenIPersonal';
import RegistrationScreen from '../account/RegistrationScreen';
import { GeneratedIdentifierFlags, isConstructorDeclaration } from 'typescript';
import { Container } from 'react-bootstrap';

// <!-- Latest compiled and minified CSS -->
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
// integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

// <!-- Optional theme -->
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" 
// integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"></link>

import { Grid, Row, Col } from "react-bootstrap";

export default function UserHub({ navigation }) {


    class Container extends React.Component {
        constructor() {
            super();
        }

        render() {
            return (
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <SideMenu />
                        </Col>
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
}
