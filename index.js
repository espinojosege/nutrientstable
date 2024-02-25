let tablePrimary = document.createElement("table");
let tableSecondary = document.createElement("table");
let tables = [tablePrimary, tableSecondary];

for (let i = 0; i < tables.length; i++) {
  let propPrimary = [
    "name",
    "size",
    "calories",
    "carbohydra",
    "fiber",
    "protein",
  ];
  let propSecondary = ["name", "size", "fat", "cholesterol", "sodium", "sugar"];
  let table = tables[i];
  if (i == 0) {
    let colgroup = document.createElement("colgroup");
    let rgb = [60, 255, 60];
    for (let index = 0; index < 10; index++) {
      let temp = rgb;
      let rate = 18;
      let col = document.createElement("col");
      col.setAttribute(
        "style",
        `
        background-color: rgb(${temp[0]}, ${temp[1]}, ${temp[2]});;
        `
      );
      if ([1, 3, 4, 6, 8].includes(index)) {
        col.style.borderLeft = `1px solid black`;
        col.setAttribute("span", "1");
      }
      colgroup.appendChild(col);
      temp.forEach((number, index) => {
        rgb[index] = number + rate;
      });
      rgb = temp;
    }
    table.appendChild(colgroup);
  }
  let thead = document.createElement("thead");

  table.appendChild(thead);
  let row = thead.insertRow();
  let rowinfo = thead.insertRow();
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  if (i == 0) {
    tbody.setAttribute("id", "primary");
    prop = propPrimary;

    prop.forEach((property, index) => {
      let th = document.createElement("th");
      if (index == 0) {
        th.innerHTML = "Food";
        rowinfo.appendChild(th);
      }
      if (index == 1) {
        let empty = document.createElement("th");
        row.appendChild(empty);
        th.innerHTML = property;
        th.setAttribute("colspan", "2");
        row.appendChild(th);
        let thAmount = document.createElement("th");
        let thUnit = document.createElement("th");
        thAmount.innerHTML = "qt";
        thUnit.innerHTML = "u";
        rowinfo.appendChild(thAmount);
        rowinfo.appendChild(thUnit);
      }
      if (index == 2) {
        th.innerHTML = property;
        rowinfo.appendChild(th);
        let empty = document.createElement("th");
        row.appendChild(empty);
      }
      if ([3, 4, 5].includes(index)) {
        th.innerHTML = property;
        th.setAttribute("colspan", "2");
        row.appendChild(th);
        let thAmount = document.createElement("th");
        let thUnit = document.createElement("th");
        thAmount.innerHTML = "qt";
        thUnit.innerHTML = "u";
        rowinfo.appendChild(thAmount);
        rowinfo.appendChild(thUnit);
      }
    });
  } else {
    tbody.setAttribute("id", "secondary");
    prop = propSecondary;

    prop.forEach((property, index) => {
      let th = document.createElement("th");
      th.innerHTML = property;
      th.setAttribute("colspan", "2");
      row.appendChild(th);

      if (index == 0) {
        th.setAttribute("colspan", "1");
        th.innerHTML = "";
        let empty = document.createElement("th");
        empty.innerHTML = "food";
        rowinfo.appendChild(empty);
      }
      if ([1, 2, 3, 4, 5].includes(index)) {
        let thAmount = document.createElement("th");
        let thUnit = document.createElement("th");
        thAmount.innerHTML = "qt";
        thUnit.innerHTML = "u";
        rowinfo.appendChild(thAmount);
        rowinfo.appendChild(thUnit);
      }
    });
  }

  let div = document.getElementById("content");
  div.append(table);
}

class Ingredient {
  constructor(
    name,
    [size, unit],
    calories,
    fat,
    cholesterol,
    sodium,
    carbohydrates,
    fiber,
    sugar,
    protein
  ) {
    let prop = [
      "name",
      "size",
      "calories",
      "fat",
      "cholesterol",
      "sodium",
      "carbohydrates",
      "fiber",
      "sugar",
      "protein",
    ];
    let facts = [
      name,
      [size, unit],
      calories,
      fat,
      cholesterol,
      sodium,
      carbohydrates,
      fiber,
      sugar,
      protein,
    ];
    let base = calories;
    let multiple = 100;

    facts.forEach((fact, index) => {
      if (index === 0) {
        this[prop[index]] = fact;
        //console.log(this[prop[index]], fact);
      }
      if (index === 1) {
        this[prop[index]] = {
          amount: Ingredient.returnWholeNumber(fact[0], base, multiple),
          unit: fact[1],
        };
      }
      if (typeof fact === "number") {
        //console.log(fact);
        this[prop[index]] = Ingredient.returnWholeNumber(fact, base, multiple);
        //console.log(fact, this[prop[index]], prop[index]);
      }
    });

    Ingredient.instance.push(this);

    //Object.entries(this).forEach((entry, index) => {
    //  console.log(entry[0]);
    //});

    //let primaryTable = document.getElementById("primary");
    //let secondaryTable = document.getElementById("secondary");
    //let tables = [primaryTable, secondaryTable];
    //let rowPrimary = tables[0].insertRow();
    //let rowSecondary = tables[1].insertRow();
    //let rows = [rowPrimary, rowSecondary];
    //for (const [key, value] of Object.entries(this)) {
    //  if (key === "name") {
    //    rows.forEach((row) => {
    //      let nameCell = row.insertCell();
    //      nameCell.innerHTML = value;
    //    });
    //  }
    //  if (key === "size") {
    //    rows.forEach((row) => {
    //      let sizeCell = row.insertCell();
    //      let span = document.createElement("span");
    //      let spanAmount = document.createElement("span");
    //      let spanUnit = document.createElement("span");
    //      spanAmount.innerHTML = value.amount;
    //      spanUnit.innerHTML = value.unit[0];
    //      span.appendChild(spanAmount);
    //      span.appendChild(spanUnit);
    //      sizeCell.appendChild(span);
    //    });
    //  }
    //  if (key === "calories") {
    //    let calorieCell = rowPrimary.insertCell();
    //    calorieCell.innerHTML = value;
    //  }
    //  if (["carbohydrates", "fiber", "protein"].includes(key)) {
    //    let valueCell = rowPrimary.insertCell();
    //    let span = document.createElement("span");
    //    let spanAmount = document.createElement("span");
    //    let spanUnit = document.createElement("span");
    //    spanAmount.innerHTML = value;
    //    spanUnit.innerHTML = "g";
    //    span.appendChild(spanAmount);
    //    span.appendChild(spanUnit);
    //    valueCell.appendChild(span);
    //  }
    //  if (["fat", "sugar"].includes(key)) {
    //    let valueCell = rowSecondary.insertCell();
    //    let span = document.createElement("span");
    //    let spanAmount = document.createElement("span");
    //    let spanUnit = document.createElement("span");
    //    spanAmount.innerHTML = value;
    //    spanUnit.innerHTML = "g";
    //    span.appendChild(spanAmount);
    //    span.appendChild(spanUnit);
    //    valueCell.appendChild(span);
    //  }
    //  if (["cholesterol", "sodium"].includes(key)) {
    //    let valueCell = rowSecondary.insertCell();
    //    let span = document.createElement("span");
    //    let spanAmount = document.createElement("span");
    //    let spanUnit = document.createElement("span");
    //    spanAmount.innerHTML = value;
    //    spanUnit.innerHTML = "mg";
    //    span.appendChild(spanAmount);
    //    span.appendChild(spanUnit);
    //    valueCell.appendChild(span);
    //  }
    //}
  }

  static instance = [];

  static returnWholeNumber(number, base, multiple) {
    let result;
    if (number == 0 || base == 0) {
      result = 0;
    } else {
      let calculation = (number / base) * multiple;
      if (calculation % 1 >= 0.65) {
        result = Math.ceil(calculation);
      } else if (calculation % 1 < 0.644 && calculation % 1 > 0.444) {
        result = Math.floor(calculation) + 0.5;
      } else {
        result = Math.floor(calculation);
      }
    }

    return result;
  }
}

let strawberries = new Ingredient(
  "🍓",
  [140, "gram"],
  50,
  0,
  0,
  0,
  10,
  3,
  6,
  0
);

let milk = new Ingredient("🍼", [240, "gram"], 150, 8, 25, 110, 12, 0, 12, 8);

let eggs = new Ingredient("🥚", [50, "gram"], 70, 5, 185, 70, 0, 0, 0, 6);

let peanutbutterPowder = new Ingredient(
  "🥜",
  [12, "gram"],
  50,
  1.5,
  0,
  95,
  3,
  1,
  1,
  6
);

let chocoMilk = new Ingredient("🍫", [13, "gram"], 50, 0, 0, 20, 12, 0, 10, 0);

let oatmeal = new Ingredient("🌾", [40, "gram"], 150, 2.5, 0, 0, 23, 4, 0, 5);

let chickenThighs = new Ingredient(
  "🍗",
  [112, "gram"],
  250,
  19,
  110,
  90,
  0,
  0,
  0,
  19
);

let sweetPotatoes = new Ingredient(
  "🍠",
  [130, "gram"],
  130,
  0,
  0,
  45,
  29,
  4,
  7,
  2
);

let babyCarrots = new Ingredient("🥕", [85, "grams"], 35, 0, 0, 65, 6, 2, 5, 1);

let russetPotatoes = new Ingredient(
  "🥔",
  [148, "gram"],
  110,
  0,
  0,
  0,
  24,
  2,
  1,
  2
);

let browRice = new Ingredient("🍚", [42, "gram"], 150, 1.5, 0, 0, 30, 2, 0, 3);

let pintoBeans = new Ingredient("🫘", [35, "gram"], 100, 0, 0, 0, 17, 5, 0, 8);

let cheeseSlice = new Ingredient(
  "🧀",
  [19, "gram"],
  50,
  3.5,
  15,
  210,
  2,
  0,
  1,
  3
);

let wheatBread = new Ingredient("🍞", [26, "gram"], 60, 1, 0, 120, 10, 2, 1, 3);

let turkeySlice = new Ingredient(
  "🦃",
  [56, "gram"],
  60,
  1.5,
  25,
  490,
  1,
  1,
  0,
  10
);

let mayo = new Ingredient("Mayo", [14, "gram"], 100, 11, 10, 85, 0, 0, 0, 0);

let tomatoe = new Ingredient("🍅", [148, "gram"], 35, 1, 0, 5, 6, 1, 6, 1);

let avocado = new Ingredient("🥑", [50, "gram"], 240, 22, 0, 10, 2.8, 10, 1, 3);

let groundTurkey = new Ingredient(
  "G🦃",
  [112, "gram"],
  150,
  8,
  80,
  90,
  0,
  0,
  0,
  20
);

let newarr = Ingredient.instance.sort((a, b) => b.protein - a.protein);

newarr.forEach((ingredient, index) => {
  let primaryTable = document.getElementById("primary");
  let secondaryTable = document.getElementById("secondary");
  let tables = [primaryTable, secondaryTable];
  let rowPrimary = tables[0].insertRow(index);
  let rowSecondary = tables[1].insertRow(index);
  let rows = [rowPrimary, rowSecondary];
  for (const [key, value] of Object.entries(ingredient)) {
    if (key === "name") {
      rows.forEach((row) => {
        let nameCell = document.createElement("th");
        nameCell.innerHTML = value;
        row.appendChild(nameCell);
      });
    }
    if (key === "size") {
      rows.forEach((row) => {
        let sizeCell = row.insertCell();
        let unitCell = row.insertCell();
        sizeCell.innerHTML = value.amount;
        unitCell.innerHTML = value.unit[0];
      });
    }
    if (key === "calories") {
      let calorieCell = rowPrimary.insertCell();
      calorieCell.innerHTML = value;
    }
    if (["carbohydrates", "fiber", "protein"].includes(key)) {
      let sizeCell = rowPrimary.insertCell();
      let unitCell = rowPrimary.insertCell();
      sizeCell.innerHTML = value;
      unitCell.innerHTML = "g";
    }
    if (["fat", "sugar"].includes(key)) {
      let valueCell = rowSecondary.insertCell();
      let unitCell = rowSecondary.insertCell();
      valueCell.innerHTML = value;
      unitCell.innerHTML = "g";
    }
    if (["cholesterol", "sodium"].includes(key)) {
      let valueCell = rowSecondary.insertCell();
      let unitCell = rowSecondary.insertCell();

      valueCell.innerHTML = value;
      unitCell.innerHTML = "mg";
    }
  }
});

newarr.forEach((ingredient) => {
  console.log(ingredient);
});

class Recipe {
  constructor(...arg) {
    let arr1 = arg;
    console.log(arr1);
    let ingredients = [];
    for (let i = 1; i < arr1.length; i += 2) {
      const ingrd = arr1[i];
      let base = arr1[i + 1];
      let obj = new Object();
      for (const [key, value] of Object.entries(ingrd)) {
        //console.log(key, value);
        if (typeof value === "number") {
          obj[key] = this.returnWholeNumber(base, value);
        } else if (key === "size") {
          //console.log(value.amount, value.unit);
          obj[key] = {
            amount: this.returnWholeNumber(base, value.amount),
            unit: value.unit,
          };
        } else {
          obj[key] = value;
        }
      }
      console.log(obj, i, base);
      ingredients.push(obj);
    }

    //this.name =
    //this.calories = ingredients.reduce((totalCalories, currentCalories) => {
    //  return (totalCalories += currentCalories.calories);
    //}, 0);
    this.name = arr1[0];
    this.calories = this.sumFact(ingredients, "calories");
    this.fat = this.sumFact(ingredients, "fat");
    this.cholesterol = this.sumFact(ingredients, "cholesterol");
    this.sodium = this.sumFact(ingredients, "sodium");
    this.carbohydrates = this.sumFact(ingredients, "carbohydrates");
    this.fiber = this.sumFact(ingredients, "fiber");
    this.sugar = this.sumFact(ingredients, "sugar");
    this.protein = this.sumFact(ingredients, "protein");
    console.log(this);
    //console.log(Object.values(ingredients[0])[2]);
    createTableRow(this, ingredients);

    //Recipe.instance.push(this);
  }

  sumFact(array, key) {
    let result = array.reduce((total, current) => {
      return total + current[key];
    }, 0);

    return result;
  }

  returnWholeNumber(multiple, number) {
    let result;
    if (number == 0 || multiple == 0) {
      result = 0;
    } else {
      let calculation = multiple * number;
      if (calculation % 1 >= 0.655) {
        result = Math.ceil(calculation);
      } else if (calculation % 1 < 0.644 && calculation % 1 > 0.444) {
        result = Math.floor(calculation) + 0.5;
      } else {
        console.log(calculation);
        result = Math.floor(calculation);
      }
    }

    return result;
  }

  static instance = [];
}

let smoothie = new Recipe(
  "smoothie",
  strawberries,
  0.5,
  peanutbutterPowder,
  1,
  chocoMilk,
  0.5,
  oatmeal,
  1,
  eggs,
  2,
  milk,
  1
);
let sandwhich = new Recipe(
  "sandwhich",
  wheatBread,
  3.6,
  turkeySlice,
  1,
  tomatoe,
  0.16,
  cheeseSlice,
  1
);

let Gsandwhich = new Recipe(
  "gSandwhich",
  wheatBread,
  3.6,
  groundTurkey,
  1,
  tomatoe,
  0.16,
  cheeseSlice,
  1
);
let chickenMeal = new Recipe(
  "Chicken",
  chickenThighs,
  4.2,
  browRice,
  1,
  pintoBeans,
  0.5,
  babyCarrots,
  0.21,
  sweetPotatoes,
  1
);

function createTableRow(object, array) {
  let body = document.body;
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let hrow = thead.insertRow();
  let hrowc = thead.insertRow();
  let tbody = document.createElement("tbody");
  let tfoot = document.createElement("tfoot");
  let trow = tfoot.insertRow();

  for (const key of Object.keys(array[0])) {
    let nameTh = document.createElement("th");
    if (key == "name") {
      nameTh.innerHTML = key;
      hrowc.appendChild(nameTh);
      let empty = document.createElement("th");
      hrow.appendChild(empty);
    } else if (
      [
        "size",
        "fat",
        "cholesterol",
        "sodium",
        "carbohydrates",
        "fiber",
        "sugar",
        "protein",
      ].includes(key)
    ) {
      nameTh.innerHTML = key;
      nameTh.setAttribute("colspan", "2");
      hrow.appendChild(nameTh);
      let amountTh = document.createElement("th");
      let unitTh = document.createElement("th");
      amountTh.innerHTML = "QTY";
      unitTh.innerHTML = "UNT";
      hrowc.appendChild(amountTh);
      hrowc.appendChild(unitTh);
    } else if (key == "calories") {
      nameTh.innerHTML = key;
      hrowc.appendChild(nameTh);
      let empty = document.createElement("th");
      hrow.appendChild(empty);
    }
  }

  array.forEach((obj, index) => {
    let row = tbody.insertRow(index);

    for (const [key, value] of Object.entries(obj)) {
      let valueCell = row.insertCell();
      let units;
      if (["cholesterol", "sodium"].includes(key)) {
        units = "mg";
      } else {
        units = "g";
      }
      if (["name", "calories"].includes(key)) {
        valueCell.innerHTML = value;
      } else if (key === "size") {
        valueCell.innerHTML = value.amount;
        let unitsCell = row.insertCell();
        unitsCell.innerHTML = value.unit[0];
      } else {
        let unitsCell = row.insertCell();
        valueCell.innerHTML = value;
        unitsCell.innerHTML = units;
      }
    }
  });

  for (const [key, value] of Object.entries(object)) {
    //console.log(key, value);
    let units;
    if (["cholesterol", "sodium"].includes(key)) {
      units = "mg";
    } else {
      units = "g";
    }
    if (key === "name") {
      let th = document.createElement("th");
      th.setAttribute("colspan", "3");
      th.innerHTML = value;
      trow.appendChild(th);
    } else if (["calories"].includes(key)) {
      let valueCell = trow.insertCell();
      valueCell.innerHTML = value;
    } else {
      let valueCell = trow.insertCell();
      let unitsCell = trow.insertCell();
      unitsCell.innerHTML = units;
      valueCell.innerHTML = value;
    }
  }

  table.appendChild(tfoot);
  table.appendChild(tbody);
  table.appendChild(thead);
  body.appendChild(table);
}

//class Recipe {
//  constructor(array) {
//    this.recipe = [];
//    let values = [0, 0, 0, 0, 0, 0, 0, 0];

//    for (let i = 2; i < array.length; i += 2) {
//      const ingrd = array[i];
//      const qt = array[i + 1];
//      ingrd.size.amount = qt * ingrd.size.amount;
//      ingrd.calories = qt * ingrd.calories;
//      ingrd.fat = qt * ingrd.fat;
//      ingrd.cholesterol = qt * ingrd.cholesterol;
//      ingrd.sodium = qt * ingrd.sodium;
//      ingrd.carbohydrates = qt * ingrd.carbohydrates;
//      ingrd.fiber = qt * ingrd.fiber;
//      ingrd.sugar = qt * ingrd.sugar;
//      ingrd.protein = qt * ingrd.protein;
//      this.recipe.push(ingrd);

//      values[0] += ingrd.cal;
//      values[1] += ingrd.fat;
//      values[2] += ingrd.chol;
//      values[3] += ingrd.sod;
//      values[4] += ingrd.carb;
//      values[5] += ingrd.fiber;
//      values[6] += ingrd.sug;
//      values[7] += ingrd.pro;
//    }
//    this.name = array[0];
//    this.size = { amount: array[1][0], units: array[1][1] };

//    this.cal = values[0];
//    this.fat = values[1];
//    this.chol = values[2];
//    this.sod = values[3];
//    this.carb = values[4];
//    this.fiber = values[5];
//    this.sug = values[6];
//    this.pro = values[7];
//  }
//  static instance = [];
//}

//let smoothie = new Recipe([
//  "Smoothie",
//  [1, "each"],
//  strawberries,
//  0.5,
//  milk,
//  1,
//  eggs,
//  2,
//  peanutbutterPowder,
//  1,
//  chocoMilk,
//  0.5,
//  oatmeal,
//  1,
//]);
//let chickenDinner = new Recipe([
//  "Chicken Recipe",
//  [1, "each"],
//  chickenThighs,
//  4.24,
//  babyCarrots,
//  0.23,
//  russetPotatoes,
//  1,
//  browRice,
//  1,
//  pintoBeans,
//  0.5,
//]);
//let sandwhich = new Recipe([
//  "🥪",
//  [1, "each"],
//  cheeseSlice,
//  1,
//  wheatBread,
//  3.75,
//  turkeySlice,
//  1,
//  tomatoe,
//  0.31,
//]);
