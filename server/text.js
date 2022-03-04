// const text = "salom nghiii"
// textOneLetter = text.slice(0, 1)
// newTextOneLetter = textOneLetter.toUpperCase()
// textNew = text.replace(textOneLetter, newTextOneLetter)
// console.log(textNew)

// function foo (...arr) {
// let  text = ""
// a = arr[0].toUpperCase()
// arr.splice(0, 1, a)
// arr.forEach((n)=> {
//    text += n 
// })

// console.log(`${text} - so'zi ${arr.length} dan iborat`)
// }

// foo('h', 'j', 'j', 'j', 'l')

// capitalise = () => {
//   a = 5+8
//     return a
// }

// newfo =  capitalise()
// console.log(newfo)

"use strict";
const app = {
    name: "car",
    color: "red",
    spid:  () => {
        "use strict";
        return this.name
    }
}

console.log(app.spid())


let chopper = {
    owner: 'John',
    getOwner: () => this.owner.slice(0, 1)
    // getOwner()  {return this.owner.slice(0, 1)}
};




let choppernew = Object.assign(this, chopper)



// let chopper = new chopperFn();
console.log(choppernew.getOwner());
// chopper.setOwner('Spiderman');
// console.log(chopper.getOwner());