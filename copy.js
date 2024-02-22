let tbody = document.getElementById("tbody");
class Ingredient {
  constructor(
    name,
    [s, u],
    calories,
    fat,
    cholesterol,
    sodium,
    carbohydrates,
    fiber,
    sugars,
    protein
  ) {
    let base = calories;

    this.name = name;
    this.servingSize = { amount: (s / base) * 100, units: u };
    this.calories = 100;
    this.fat = (fat / base) * 100;
    this.cholesterol = (cholesterol / base) * 100;
    this.sodium = (sodium / base) * 100;
    this.carbohydrates = (carbohydrates / base) * 100;
    this.fiber = (fiber / base) * 100;
    this.sugars = (sugars / base) * 100;
    this.protein = (protein / base) * 100;
    Ingredient.instance.push(this);
    //console.log(this);
    //for (let i = 0; i < Object.values(this).length; i++) {
    //  let element = Object.entries(this)[i];
    //  let key = element[0];
    //  let value = element[1];
    //  let rowCell = row.insertCell(i);
    //  rowCell.innerHTML = value;
    //  if (i == 1) {
    //    rowCell.innerHTML = `<pre>${value.amount.toFixed(2)} ${
    //      value.units
    //    }</pre>`;
    //  } else if (i == 3 || i >= 6) {
    //    rowCell.innerHTML = `<pre>${value.toFixed(2)} g</pre>`;
    //  } else if (i == 4 || i == 5) {
    //    rowCell.innerHTML = `<pre>${value.toFixed(2)} mg</pre>`;
    //  }
    //}
    let row = tbody.insertRow();
    for (let [key, value] of Object.entries(this)) {
      let rowCell = row.insertCell();
      if (key === "servingSize") {
        rowCell.innerHTML = `<pre>${value.amount.toFixed(2)} ${
          value.units
        }</pre>`;
      } else if (key === "cholesterol" || key === "sodium") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} mg</pre>`;
      } else if (key === "calories") {
        rowCell.innerHTML = value;
      } else if (typeof value === "number") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} g</pre>`;
      } else {
        rowCell.innerHTML = value;
      }
    }
  }
  static instance = [];
}

class Recipe {
  constructor(array) {
    this.recipe = [];
    let values = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 2; i < array.length; i += 2) {
      const ingrd = array[i];
      const qt = array[i + 1];
      console.log(ingrd.name, qt);
      ingrd.servingSize.amount = qt * ingrd.servingSize.amount;
      ingrd.calories = qt * ingrd.calories;
      ingrd.fat = qt * ingrd.fat;
      ingrd.cholesterol = qt * ingrd.cholesterol;
      ingrd.sodium = qt * ingrd.sodium;
      ingrd.carbohydrates = qt * ingrd.carbohydrates;
      ingrd.fiber = qt * ingrd.fiber;
      ingrd.sugars = qt * ingrd.sugars;
      ingrd.protein = qt * ingrd.protein;
      this.recipe.push(ingrd);

      values[0] += ingrd.calories;
      values[1] += ingrd.fat;
      values[2] += ingrd.cholesterol;
      values[3] += ingrd.sodium;
      values[4] += ingrd.carbohydrates;
      values[5] += ingrd.fiber;
      values[6] += ingrd.sugars;
      values[7] += ingrd.protein;
      //console.log(values);
      //console.log(this.recipe);
    }
    this.name = array[0];
    this.servingSize = { amount: array[1][0], units: array[1][1] };

    this.calories = values[0];
    this.fat = values[1];
    this.cholesterol = values[2];
    this.sodium = values[3];
    this.carbohydrates = values[4];
    this.fiber = values[5];
    this.sugars = values[6];
    this.protein = values[7];

    Recipe.instance.push(this);
    let row = tbody.insertRow();
    for (let [key, value] of Object.entries(this)) {
      if (key === "recipe") {
      } else {
        let rowCell = row.insertCell();
        if (key === "servingSize") {
          rowCell.innerHTML = `<pre>${value.amount.toFixed(2)} ${
            value.units
          }</pre>`;
        } else if (key === "cholesterol" || key === "sodium") {
          rowCell.innerHTML = `<pre>${value.toFixed(2)} mg</pre>`;
        } else if (key === "calories") {
          rowCell.innerHTML = value;
        } else if (typeof value === "number") {
          rowCell.innerHTML = `<pre>${value.toFixed(2)} g</pre>`;
        } else {
          rowCell.innerHTML = value;
        }
      }
    }
  }
  static instance = [];
}

let strawberries = new Ingredient(
  "Starberries",
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

let milk = new Ingredient("Milk", [240, "gram"], 150, 8, 25, 110, 12, 0, 12, 8);

let eggs = new Ingredient("Eggs", [50, "gram"], 70, 5, 185, 70, 0, 0, 0, 6);

let peanutbutterPowder = new Ingredient(
  "PB Powder",
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

let chocoMilk = new Ingredient(
  "Choco Milk",
  [13, "gram"],
  50,
  0,
  0,
  20,
  12,
  0,
  10,
  0
);

let oatmeal = new Ingredient(
  "Oatmeal",
  [40, "gram"],
  150,
  2.5,
  0,
  0,
  23,
  4,
  0,
  5
);

let smoothie = new Recipe([
  "Smoothie",
  [1, "each"],
  strawberries,
  0.5,
  milk,
  1.5,
  eggs,
  2,
  peanutbutterPowder,
  1,
  chocoMilk,
  0.5,
  oatmeal,
  1.5,
]);

let chickenThighs = new Ingredient(
  "Chicken Thighs",
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
  "Sweet Potatoes",
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

let babyCarrots = new Ingredient(
  "Baby Carrots",
  [85, "grams"],
  35,
  0,
  0,
  65,
  6,
  2,
  5,
  1
);

let russetPotatoes = new Ingredient(
  "Russet Potatoes",
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

//let smoothie = new Recipe([
//  "Smoothie",
//  [1, "each"],
//  strawberries,
//  1,
//  milk,
//  1.5,
//  eggs,
//  2,
//  peanutbutterPowder,
//  1,
//  chocoMilk,
//  0.5,
//  oatmeal,
//  1,
//]);

let chickenDinner = new Recipe([
  "Chicken Recipe",
  [1, "each"],
  chickenThighs,
  4.5,
  babyCarrots,
  1,
  russetPotatoes,
  2,
]);

Recipe.instance.forEach((recipe) => {
  let div = document.createElement("div");
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let trow = thead.insertRow();
  let tbody = document.createElement("tbody");
  let tfoot = document.createElement("tfoot");
  let frow = tfoot.insertRow();
  let index = 0;
  for (let [key, value] of Object.entries(recipe.recipe[0])) {
    let trowth = document.createElement("th");
    trowth.innerHTML = key;
    trow.appendChild(trowth);
  }
  for (let i = 0; i < recipe.recipe.length; i++) {
    const element = recipe.recipe[i];
    console.log(element);
    let brow = tbody.insertRow();
    for (let [key, value] of Object.entries(element)) {
      let rowCell = brow.insertCell();
      if (key === "servingSize") {
        rowCell.innerHTML = `<pre>${value.amount.toFixed(2)} ${
          value.units
        }</pre>`;
      } else if (key === "cholesterol" || key === "sodium") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} mg</pre>`;
      } else if (key === "calories") {
        rowCell.innerHTML = value;
      } else if (typeof value === "number") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} g</pre>`;
      } else {
        rowCell.innerHTML = value;
      }
    }
  }
  for (let [key, value] of Object.entries(recipe)) {
    if (key === "recipe") {
    } else {
      let rowCell = frow.insertCell();
      if (key === "servingSize") {
        rowCell.innerHTML = `<pre>${value.amount.toFixed(2)} ${
          value.units
        }</pre>`;
      } else if (key === "cholesterol" || key === "sodium") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} mg</pre>`;
      } else if (key === "calories") {
        rowCell.innerHTML = value;
      } else if (typeof value === "number") {
        rowCell.innerHTML = `<pre>${value.toFixed(2)} g</pre>`;
      } else {
        rowCell.innerHTML = value;
      }
    }
  }
  console.log(recipe.recipe);

  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  div.appendChild(table);
  document.body.appendChild(div);
});
