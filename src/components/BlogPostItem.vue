<template>
    <div class="post-wrapper" @click="toDetails">
        <div class="image">
            <img :src="blog.img" alt="Blog Image" />
        </div>
        <div class="info">
            <div class="date">{{ formattedDate }}</div>
            <div class="author">{{ blog.author.name }}</div>
        </div>
        <h2 class="title">{{ blog.title }}</h2>
        <p class="summary">{{ blog.summary }}</p>
        <div v-if="configurable" class="btn-wrapper">
            <button @click.stop="editBlog" class="btn edit">Edit</button>
            <button @click.stop="deleteBlog" class="btn delete">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        blog: {
            type: Object,
            required: true,
        },
        configurable: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        formattedDate() {
            const date = new Date(this.blog.publicationDate);
            return date.toLocaleDateString();
        },
    },
    methods: {
        toDetails() {
            this.$router.push(`/blogPosts/${this.blog.id}`);
        },
        deleteBlog() {
            console.log(this.blog.id)
            fetch(`http://localhost:3000/blogs/${this.blog.id}`,{
                method: 'DELETE',
            }).then((res) => {
                if(res.ok) {
                    this.$store.dispatch('blogs/fetchBlogsData')
                }
            })
        },
        editBlog() {
            this.$router.push({ name: 'editBlog', params: { id: this.blog.id } });
        },
    },
};
</script>

<style scoped>
/* New Styling for BlogPostItem */

.post-wrapper {
    display: flex;
    flex-direction: column;
    width: 19rem;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 1rem;
    transition: box-shadow 0.2s ease-in-out;
}

.post-wrapper:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

img {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-radius: 8px;
}

.info {
    margin-bottom: 0.5rem;
    color: #777;
    font-size: 14px;
}

.title {
    margin-bottom: 1rem;
    font-size: 18px;
    font-weight: bold;
}

.summary {
    font-size: 14px;
}

.btn-wrapper {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.btn {
    flex: 1;
    height: 2.5rem;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.edit {
    background-color: #ff9800;
    color: #fff;
}

.delete {
    background-color: #e53935;
    color: #fff;
}

</style>
