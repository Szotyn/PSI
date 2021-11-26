//display of colors
var hooks = document.getElementsByClassName("cp");
function Colorize() {
  //display color of range inputs
  var h = document.getElementById("out");
  h.style.backgroundColor = "rgb("
    .concat(hooks[0].value, ", ")
    .concat(hooks[1].value, ", ")
    .concat(hooks[2].value, ")");
  //h.innerHTML = `rgb(${hooks[0].value}, ${hooks[1].value}, ${hooks[2].value})`;
}
function share(from, to) {
  hooks[to].value = hooks[from].value;
}
//color class
var rgb = /** @class */ (function () {
  function rgb(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  return rgb;
})();
//evaluate distance between 2 colors
function distColor(color1, color2) {
  var deltaRed = color1.red - color2.red;
  var deltaGreen = color1.green - color2.green;
  var deltaBlue = color1.blue - color2.blue;
  return Math.sqrt(
    Math.pow(deltaRed, 2) + Math.pow(deltaGreen, 2) + Math.pow(deltaBlue, 2)
  );
}
//find in array color nearest to the pattern
function findNearestColor(pattern, list) {
  var minDis = Infinity;
  list.forEach(function (e) {
    var d = distColor(pattern, e);
    if (d < minDis) {
      minDis = d;
    }
  });
  var output = [];
  list.forEach(function (c) {
    if (distColor(c, pattern) == minDis) {
      output.push(c);
    }
  });
  return output;
}
var seedCount;
(function (seedCount) {
  seedCount[(seedCount["none"] = 0)] = "none";
  seedCount[(seedCount["one"] = 1)] = "one";
  seedCount[(seedCount["some"] = 2)] = "some";
  seedCount[(seedCount["a_lot"] = 3)] = "a_lot";
})(seedCount || (seedCount = {}));
//fruit class
var fruit = /** @class */ (function () {
  function fruit(name, hue, isJucy, isSweet, howManySeeds) {
    this.score = 0;
    this.name = name;
    this.hue = hue;
    this.juciness = isJucy;
    this.sweetness = isSweet;
    this.howManySeeds = howManySeeds;
  }
  return fruit;
})();
var fruits = [
  new fruit("banana", new rgb(255, 255, 0), false, true, seedCount.some),
  new fruit("cherry", new rgb(255, 0, 0), true, true, seedCount.one),
  new fruit("cranberry", new rgb(255, 0, 0), true, false, seedCount.some),
  new fruit("orange", new rgb(255, 127, 0), true, true, seedCount.some),
  new fruit("lemon", new rgb(255, 255, 0), true, false, seedCount.some),
  new fruit("lime", new rgb(0, 255, 0), true, false, seedCount.some),
  new fruit("cucumber", new rgb(0, 255, 0), true, false, seedCount.a_lot),
  new fruit("avocado", new rgb(0, 255, 0), false, false, seedCount.one),
  new fruit("watermelon", new rgb(0, 255, 0), true, true, seedCount.a_lot),
  new fruit("watermelon", new rgb(255, 0, 0), true, true, seedCount.a_lot),
  new fruit("pumpkin", new rgb(255, 127, 0), true, false, seedCount.a_lot),
  new fruit("coconut", new rgb(127, 67, 0), false, true, seedCount.none),
  new fruit("coconut", new rgb(255, 255, 255), false, true, seedCount.none),
  new fruit("eggplant", new rgb(110, 0, 107), true, false, seedCount.a_lot),
  new fruit("blue berry", new rgb(110, 0, 107), true, true, seedCount.a_lot),
  new fruit("litchi", new rgb(255, 0, 94), true, true, seedCount.none),
  new fruit("litchi", new rgb(255, 255, 255), true, true, seedCount.none),
  new fruit("apple", new rgb(255, 0, 0), true, true, seedCount.some),
  new fruit("apple", new rgb(255, 255, 0), true, true, seedCount.some),
  new fruit("apple", new rgb(0, 255, 0), true, true, seedCount.some),
  new fruit("mango", new rgb(255, 127, 0), true, true, seedCount.one),
  new fruit("mango", new rgb(255, 255, 0), true, true, seedCount.one),
  new fruit("mango", new rgb(255, 0, 0), true, true, seedCount.one),
];
function scoreFruitsByColor() {
  var selected = new rgb(
    parseInt(hooks[0].value),
    parseInt(hooks[1].value),
    parseInt(hooks[2].value)
  );
  //fruits to colors
  var colors = [];
  fruits.forEach(function (f) {
    if (!colors.includes(f.hue)) {
      colors.push(f.hue);
    }
  });
  var nearest = findNearestColor(selected, colors);
  fruits.forEach(function (e) {
    if (nearest.includes(e.hue)) {
      e.score += 1;
    }
  });
}
function scoreFruitsByJuciness() {
  var sel = document.getElementById("isJucy");
  if (sel.value == "1") {
    fruits.forEach(function (f) {
      if (f.juciness == true) {
        f.score += 1;
      }
    });
  } else if (sel.value == "-1") {
    fruits.forEach(function (f) {
      if (f.juciness == false) {
        f.score += 1;
      }
    });
  }
}
function scoreFruitsBySweetness() {
  var sel = document.getElementById("isSweet");
  if (sel.value == "1") {
    fruits.forEach(function (f) {
      if (f.sweetness == true) {
        f.score += 1;
      }
    });
  } else if (sel.value == "-1") {
    fruits.forEach(function (f) {
      if (f.sweetness == false) {
        f.score += 1;
      }
    });
  }
}
function scoreFruitsBySeedCount() {
  var sel = document.getElementById("seedCount");
  var s = parseInt(sel.value);
  if (s >= 0) {
    fruits.forEach(function (f) {
      if (f.howManySeeds == s) {
        f.score += 1;
      }
    });
  }
}
function resetScore() {
  fruits.forEach(function (f) {
    f.score = 0;
  });
}
function getBest() {
  var best = [];
  var max = -1;
  fruits.forEach(function (e) {
    if (e.score > max) {
      max = e.score;
    }
  });
  fruits.forEach(function (e) {
    if (e.score == max) {
      best.push(e);
    }
  });
  return best;
}
function scoreAll() {
  scoreFruitsByColor();
  scoreFruitsByJuciness();
  scoreFruitsBySweetness();
  scoreFruitsBySeedCount();
}
function fruitsToNames(list) {
  var names = [];
  list.forEach(function (e) {
    if (!names.includes(e.name)) {
      names.push(e.name);
    }
  });
  return names;
}
function getResult() {
  scoreAll();
  var res = document.getElementById("result");
  res.innerHTML = "";
  fruitsToNames(getBest()).forEach(function (i) {
    res.innerHTML += '<img src="img/'.concat(i, '.jpg" Style="width:70px;">');
  });
  resetScore();
}
getResult();
