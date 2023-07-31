import { createStore } from "vuex";
import BlogModule from "./modules/blogs.js"
import UserModel from "./modules/users.js"

const store = createStore({
    modules: {
        blogs: BlogModule,
        users: UserModel,
    }
})
export default store;