export const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};
export function arrayMatch(arrString, arrObjects) {
    const arr = [];
    for (let i = 0; i < arrString.length; ++i) {
        for (let j = 0; j < arrObjects.length; ++j) {
            if (arrString[i] === arrObjects[j]._id) {
                arr.push(arrObjects[j]);
            }
        }
    }

    return arr; // Return the arr elements
}
