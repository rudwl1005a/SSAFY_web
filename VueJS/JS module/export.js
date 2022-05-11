let PLAYERS = ['손흥민', '이승우', '이강인'];

const MAX_SIZE = 1000;

function add(n1, n2){
    return n1 + n2;
}

var obj = {
    template: `<div>My Template</div>`,
    data() {
        return {
            num : 20,
        }
    },
    log() {
        console.log("log() is called");
    }
}

export { PLAYERS, MAX_SIZE, add, obj };