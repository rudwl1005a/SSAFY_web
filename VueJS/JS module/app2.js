// export.js를 통해서 모듈을 공급받아서 사용

import obj from "./export2.js";

obj.log();

let { template } = obj;
console.log(template);
