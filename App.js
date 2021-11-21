import React, {useEffect} from 'react';
import { YellowBox } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/firebase';

YellowBox.ignoreWarnings(["Setting a timmer"])
export default function App() {

  return <Navigation />;
}