<template>
    <div class="blogs-container">
        <blog-post-item
            class="blog-post"
            v-for="(blog, index) in blogsData"
            :key="blog.id"
            :blog="blog"
        ></blog-post-item>
    </div>
</template>

<script>
import BlogPostItem from './BlogPostItem.vue';

export default {
    components: {
        BlogPostItem,
    },
    name: 'BlogListComponent',
    data() {
        return {
            blogs: [],
        };
    },
    created() {
        this.$store.dispatch('blogs/fetchBlogsData').then((data) => {
            this.blogs = data;
        });
    },
    computed: {
        blogsData() {
            return this.$store.getters['blogs/blogs'];
        },
    },
};
</script>

<style scoped>
.blogs-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: 2rem;
    justify-items: center;
}

.blog-post {
    cursor: pointer;
    margin-bottom: 2rem;
    max-width: 100%;
}

/* Optional: Apply responsive layout adjustments */
@media screen and (max-width: 768px) {
    .blogs-container {
        gap: 1rem;
    }
}
</style>
