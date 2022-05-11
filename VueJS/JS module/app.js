// export.js를 통해서 모듈을 공급받아서 사용

import { PLAYERS, MAX_SIZE, add, obj } from "./export.js";

PLAYERS.forEach(el => {console.log(el)});
console.log(MAX_SIZE);
console.log(add(1, 4));
obj.log();

// import all must use alias
// import * as exItem from "./export.js";

// exItem.PLAYERS.forEach(el => {console.log(el)});
// console.log(exItem.MAX_SIZE);
// console.log(exItem.add(1, 4));
// exItem.obj.log();

// import { obj } from "./export.js";

// obj.log();

// obj의 template만 사용하고 싶다
let { template } = obj;
console.log(template);
