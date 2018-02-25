import React from 'react'
import { StackNavigator } from 'react-navigation'
import DayMenu from './daymenu'
import WeekMenu from './weekmenu'

const App = StackNavigator({
  DayMenu: { screen: DayMenu },
  WeekMenu: { screen: WeekMenu }
}, {
  initialRouteName: 'DayMenu',
  headerMode: 'none'
})

export default class Start extends React.Component {
  render () {
    return (
      <App />
    )
  }
}