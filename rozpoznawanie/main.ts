
//display of colors
let hooks = document.getElementsByClassName("cp") as unknown as HTMLInputElement[]

function Colorize() {
    //display color of range inputs
    let h = document.getElementById("out") as unknown as HTMLDivElement
    h.style.backgroundColor = `rgb(${hooks[0].value}, ${hooks[1].value}, ${hooks[2].value})`;
    //h.innerHTML = `rgb(${hooks[0].value}, ${hooks[1].value}, ${hooks[2].value})`;
}

function share(from: number, to: number) {

    hooks[to].value = hooks[from].value;


}



//color class
class rgb {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
    }
}

//evaluate distance between 2 colors
function distColor(color1: rgb, color2: rgb) {

    let deltaRed = color1.red - color2.red
    let deltaGreen = color1.green - color2.green
    let deltaBlue = color1.blue - color2.blue

    return Math.sqrt(deltaRed ** 2 + deltaGreen ** 2 + deltaBlue ** 2)
}
//find in array color nearest to the pattern
function findNearestColor(pattern: rgb, list: rgb[]) {

    let minDis = Infinity
    list.forEach(e => {
        let d = distColor(pattern, e)
        if (d < minDis) {
            minDis = d

        }
    });


    let output: rgb[] = []
    list.forEach(c => {
        if (distColor(c, pattern) == minDis) {
            output.push(c)
        }

    });

    return output

}


enum seedCount {
    none = 0,
    one = 1,
    some = 2,
    a_lot = 3
}

//fruit class
class fruit {
    name: string;
    hue: rgb;
    score: number = 0;
    juciness: boolean;
    sweetness: boolean;
    howManySeeds: seedCount;
    constructor(name: string, hue: rgb, isJucy: boolean, isSweet: boolean, howManySeeds: seedCount) {
        this.name = name
        this.hue = hue
        this.juciness = isJucy
        this.sweetness = isSweet
        this.howManySeeds = howManySeeds
    }
}


let fruits: fruit[] = [
    new fruit('banana', new rgb(255, 255, 0), false, true, seedCount.some),
    new fruit('cherry', new rgb(255, 0, 0), true, true, seedCount.one),
    new fruit('cranberry', new rgb(255, 0, 0), true, false, seedCount.some),
    new fruit('orange', new rgb(255, 127, 0), true, true, seedCount.some),
    new fruit('lemon', new rgb(255, 255, 0), true, false, seedCount.some),
    new fruit('lime', new rgb(0, 255, 0), true, false, seedCount.some),
    new fruit('cucumber', new rgb(0, 255, 0), true, false, seedCount.a_lot),
    new fruit('avocado', new rgb(0, 255, 0), false, false, seedCount.one),
    new fruit('watermelon', new rgb(0, 255, 0), true, true, seedCount.a_lot),
    new fruit('watermelon', new rgb(255, 0, 0), true, true, seedCount.a_lot),
    new fruit('pumpkin', new rgb(255, 127, 0), true, false, seedCount.a_lot),
    new fruit('coconut', new rgb(127, 67, 0), false, true, seedCount.none),
    new fruit('coconut', new rgb(255, 255, 255), false, true, seedCount.none),
    new fruit('eggplant', new rgb(110, 0, 107), true, false, seedCount.a_lot),
    new fruit('blue berry', new rgb(110, 0, 107), true, true, seedCount.a_lot),
    new fruit('litchi', new rgb(255, 0, 94), true, true, seedCount.none),
    new fruit('litchi', new rgb(255, 255, 255), true, true, seedCount.none),
    new fruit('apple', new rgb(255, 0, 0), true, true, seedCount.some),
    new fruit('apple', new rgb(255, 255, 0), true, true, seedCount.some),
    new fruit('apple', new rgb(0, 255, 0), true, true, seedCount.some),
    new fruit('mango', new rgb(255, 127, 0), true, true, seedCount.one),
    new fruit('mango', new rgb(255, 255, 0), true, true, seedCount.one),
    new fruit('mango', new rgb(255, 0, 0), true, true, seedCount.one),

]

function scoreFruitsByColor() {
    let selected = new rgb(parseInt(hooks[0].value), parseInt(hooks[1].value), parseInt(hooks[2].value))
    //fruits to colors
    let colors: rgb[] = []

    fruits.forEach(f => {
        if (!colors.includes(f.hue)) {
            colors.push(f.hue)

        }

    });

    let nearest = findNearestColor(selected, colors)
    fruits.forEach(e => {
        if (nearest.includes(e.hue)) {
            e.score += 1

        }
    })


}

function scoreFruitsByJuciness() {
    let sel = document.getElementById("isJucy") as unknown as HTMLSelectElement

    if (sel.value == '1') {
        fruits.forEach(f => {
            if (f.juciness == true) {
                f.score += 1

            }
        })
    } else if (sel.value == '-1') {
        fruits.forEach(f => {
            if (f.juciness == false) {
                f.score += 1

            }
        })
    }


}

function scoreFruitsBySweetness() {
    let sel = document.getElementById("isSweet") as unknown as HTMLSelectElement

    if (sel.value == '1') {
        fruits.forEach(f => {
            if (f.sweetness == true) {
                f.score += 1

            }
        })
    } else if (sel.value == '-1') {
        fruits.forEach(f => {
            if (f.sweetness == false) {
                f.score += 1

            }
        })
    }


}

function scoreFruitsBySeedCount() {
    let sel = document.getElementById("seedCount") as unknown as HTMLSelectElement
    let s = parseInt(sel.value)
    if (s >= 0) {
        fruits.forEach(f => {
            if (f.howManySeeds == s) {
                f.score += 1
            }
        });
    }
}

function resetScore() {
    fruits.forEach(f => {
        f.score = 0

    })
}


function getBest() {
    let best: fruit[] = []
    let max = -1;
    fruits.forEach(e => {
        if (e.score > max) {
            max = e.score
        }
    })

    fruits.forEach(e => {
        if (e.score == max) {
            best.push(e)
        }
    });
    return best
}

function scoreAll() {
    scoreFruitsByColor()
    scoreFruitsByJuciness()
    scoreFruitsBySweetness()
    scoreFruitsBySeedCount()

}

function fruitsToNames(list: fruit[]) {
    let names: string[] = []

    list.forEach(e => {
        if (!names.includes(e.name)) {
            names.push(e.name)
        }
    });
    return names
}

function getResult() {
    scoreAll()

    let res = document.getElementById("result") as unknown as HTMLDivElement
    res.innerHTML = ""

    fruitsToNames(getBest()).forEach(i => {
        res.innerHTML += `<img src="img/${i}.jpg" Style="width:70px; "         draggable="false">`
    });




    resetScore()
}

getResult()



