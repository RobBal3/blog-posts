<template>
    <div class="heading-wrapper">
        <h2>My Blogs</h2>
        <button @click="goToNewBlog" class="add-blog">Create New</button>
    </div>
    <div v-if="checkBlogs" class="emptyMessage">
        <h4>You do not have written blogs</h4>
    </div>
    <div v-else class="blogs-container">
        <blog-post-item
            v-for="blog in myBlogs"
            :key="blog.id"
            :blog="blog"
            :configurable="true"
        ></blog-post-item>
    </div>
</template>


<script>
import BlogPostItem from "@/components/BlogPostItem.vue";

export default {
    components: { BlogPostItem },
    data() {
        return {
            user: null,
        };
    },
    created() {
        this.$store.dispatch("blogs/fetchBlogsData");
        this.user = this.$store.getters["users/getActiveUser"];
    },
    watch: {
        user: {
            handler(newUser) {
                if (newUser) {
                    this.$store.dispatch("blogs/fetchBlogsData");
                }
            },
            immediate: true,
        },
    },
    methods: {
        goToNewBlog() {
            this.$router.push({ name: "newBlog" });
        },
    },
    computed: {
        checkBlogs() {
            return this.myBlogs.length === 0;
        },
        myBlogs() {
            if (this.user) {
                return this.$store.getters["blogs/blogs"].filter((blog) => {
                    return blog.author.userId === this.user.id;
                });
            } else {
                return [];
            }
        },
    },
};
</script>


<style scoped>
.emptyMessage {
    display: flex;
    justify-content: center;
    align-items: center;
}

.blogs-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(18rem, 1fr));
    gap: 2rem;
    justify-items: start;
}

.blog-post {
    cursor: pointer;
    margin-bottom: 2rem;
    max-width: 100%;
}

@media screen and (max-width: 768px) {
    .blogs-container {
        grid-template-columns: repeat(2, minmax(18rem, 1fr));
        gap: 1rem;
    }
}

.heading-wrapper {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
}

button {
    width: 7rem;
    height: 3rem;
    border-radius: 7px;
    border: none;
    background: green;
    color: #fff;
    cursor: pointer;
}
</style>
