import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppRegistry
} from 'react-native';

export var karen = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataweek?restaurantid=5'
export var express = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataweek?restaurantid=7'
export var ls = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataweek?restaurantid=8'
export var linsenToday = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataday?restaurantid=33'
export var kokboken = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataweek?restaurantid=35'

export function getWeekday() {
    var d = new Date();
    return d.getDay() - 1;
}

export function checkOpen() {
    let weekday = getWeekday()
    if (weekday < 0 || weekday > 4)
        return true
    else
        return false
}

export async function fetchMenu(rest) {
    let menu = []
    await fetch(rest)
        .then((response) => response.json())
        .then((responseJson) => {
            let categories = responseJson.menus[getWeekday()].recipeCategories
            categories.forEach(dish => {
                menu.push({
                    id: dish.id,
                    dishType: dish.name,
                    dish: dish.recipes[0].displayNames[0].displayName
                })
            })
        }).catch(error => {
            console.log(error);
        })
    return menu;
}

export async function fetchLinsen() {
    let menu = []
    await fetch(linsenToday)
        .then((response) => response.json())
        .then((responseJson) => {
            let categories = responseJson.recipeCategories[0]
            categories.recipes.forEach(dish => {
                menu.push({
                    id: categories.id,
                    dishType: categories.name,
                    dish: dish.displayNames[0].displayName
                })
            })
        }).catch(error => {
            console.log(error);
        })
    return menu;
}