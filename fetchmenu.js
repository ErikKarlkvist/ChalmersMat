export var karen =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/21f31565-5c2b-4b47-d2a1-08d558129279/dishoccurrences";
export var express =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences";
export var ls =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/c74da2cf-aa1a-4d3a-9ba6-08d5569587a1/dishoccurrences";
export var linsenToday =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/b672efaf-032a-4bb8-d2a5-08d558129279/dishoccurrences";
export var kokboken =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/4dce0df9-c6e7-46cf-d2a7-08d558129279/dishoccurrences";
export var linsen =
  "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/b672efaf-032a-4bb8-d2a5-08d558129279/dishoccurrences";

export function getWeekday() {
  var d = new Date();
  return d.getDay() - 1;
}

export function checkOpen() {
  let weekday = getWeekday();
  if (weekday < 0 || weekday > 4) return false;
  else return true;
}

export async function fetchMenu(rest) {
  let menu = [];
  await fetch(rest)
    .then(response => response.json())
    .then(responseJson => {
      responseJson.forEach(dish => {
        menu.push({
          id: dish.dishID,
          dishType: dish.dishType.dishTypeName,
          dish: dish.dish.dishName
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  return menu;
}

var moment = require("moment"); // oklart varför men måste importa här
export async function fetchWeekMenu(rest) {
  const monday = 1;
  const friday = 5; // for Friday
  const format = "YYYY-MM-DD";
  let startDay = moment()
    .isoWeekday(monday)
    .format(format);
  let endDay = moment()
    .isoWeekday(friday)
    .format(format);

  rest = `${rest}?startDate=${startDay}&endDate=${endDay}`;
  let weekMenu = [];
  await fetch(rest)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      let oldDate = "";
      let dayMenu = [];
      responseJson.forEach(dish => {
        let day = dish.startDate;
        console.log("running");
        if (oldDate === day || oldDate === "") {
          oldDate = day;
          dayMenu.push({
            id: dish.dishID,
            dishType: dish.dishType.dishTypeName,
            dish: dish.dish.dishName
          });
        } else {
          weekMenu.push(dayMenu);
          console.log(weekMenu);
          dayMenu = [];
          dayMenu.push({
            id: dish.dishID,
            dishType: dish.dishType.dishTypeName,
            dish: dish.dish.dishName
          });
          oldDate = day;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
  return weekMenu;
}

export async function fetchLinsen() {
  let menu = [];
  await fetch(linsenToday)
    .then(response => response.json())
    .then(responseJson => {
      let categories = responseJson.recipeCategories[0];
      categories.recipes.forEach(dish => {
        menu.push({
          id: categories.id,
          dishType: categories.name,
          dish: dish.displayNames[0].displayName
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  return menu;
}
