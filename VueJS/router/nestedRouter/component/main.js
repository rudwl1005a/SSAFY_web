export default {
    template:
    `
    <div>
        <h4> Main </h4>
        <p>중첩 라우터</p>
        <router-view></router-view>
        <router-link to="/main/child1">첫번째</router-link>
        <router-link to="/main/child2">두번째</router-link>
    </div>
    `
}