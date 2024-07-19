interface Person {
    name: string,
    age: number,
    cute?: boolean
}

let person: Person = {
    name: "누나",
    age: 25,
}


for(let key in person) {
    console.log("key: ", key);
    console.log(person[key]);
}