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
export var linsen = 'http://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataweek?restaurantid=33'


export function getWeekday() {
    var d = new Date();
    return d.getDay() - 1 + 2;
}

export function checkOpen() {
    let weekday = getWeekday()
    if (weekday < 0 || weekday > 4)
        return false
    else
        return true
}

export async function fetchMenu(rest) {
    let menu = []
    await fetch(rest)
        .then((response) => response.json())
        .then((responseJson) => {
            
            let categories = responseJson.menus[getWeekday()].recipeCategories
            // console.log(categories);
            categories.forEach(dish => {
                if(dish.recipes.length > 0){
                    menu.push({
                        id: dish.id,
                        dishType: dish.name,
                        dish: dish.recipes[0].displayNames[0].displayName
                    })
                }
            })
        }).catch(error => {
            console.log(error);
        })
    return menu;
}

export async function fetchWeekMenu(rest) {
    let weekMenu = []
    
    await fetch(rest)
        .then((response) => response.json())
        .then((responseJson) => {
            let menus = responseJson.menus
            menus.forEach(day => {
                let dayMenu = []
                day.recipeCategories.forEach(dish => {
                    dayMenu.push({
                        id: dish.id,
                        dishType: dish.name,
                        dish: dish.recipes[0].displayNames[0].displayName
                    })
                })
                weekMenu.push(dayMenu)
            })
        }).catch(error => {
            console.log(error);
        })
    return weekMenu;
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