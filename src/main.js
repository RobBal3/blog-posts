import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";
import BlogPosts from "@/components/BlogPostsList.vue";
import SignIn from "@/components/SignIn.vue";
import BlogPostDetails from "@/components/BlogPostDetails.vue";
import Profile from "@/components/Profile.vue";
import Edit from "@/components/Edit.vue";
import NewBlog from "@/components/NewBlog.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'home', path: '/', redirect: '/blogPosts' },
        { name: 'blogs', path: '/blogPosts', component: BlogPosts },
        { name: 'blogDetail', path: '/blogPosts/:id', component: BlogPostDetails },
        { name: 'signIn', path: '/signIn', component: SignIn },
        { name: 'profile', path: '/profile', component: Profile },
        { name: 'editBlog', path: '/edit/:id', component: Edit },
        { name: 'newBlog', path: '/add', component: NewBlog },

    ]
})

const app = createApp(App)

app.use(router);
app.use(store);

app.mount('#app')
