export default {
    template:
    `
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/cafe">Cafe</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/mail">Mail</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/tellme">TellMe</router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <input v-model="searchWord" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button @click="search" class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
    </div>
    `,
    data() {
        return {
            searchWord: ''
        }
    },
    methods: {
        search() {
            alert(this.searchWord);
        }
    }
}