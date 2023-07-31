<template>
    <div class="blog-detail-container">
        <div v-if="blog" class="blog-container">
            <h2>{{ blog.title }}</h2>
            <img :src="blog.img" alt="Blog Image" class="blog-image" />
            <div class="meta-info">
                <div class="publication-date">Published: {{ blog.publicationDate }}</div>
                <div v-if="blog.author" class="author-name">By {{ blog.author.name }}</div>
            </div>
            <p class="blog-content">{{ blog.content }}</p>
        </div>

        <div v-else class="loading-message">Loading...</div>

        <div class="comments-section">
            <h3>Comments</h3>
            <div v-if="comments.length">
                <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
            </div>
            <div v-else>
                <p>No comments yet.</p>
            </div>
                <div  v-if="user" class="new-comment-form">
                    <div >
                        <textarea  v-model="commentText" placeholder="Add your comment here..." rows="4"></textarea>
                        <button @click="submitComment">Submit</button>
                    </div>
                    <p v-if="commentError" class="error-message">{{ errorMessage }}</p>
                </div>
        </div>
    </div>
</template>


<script>
import Comment from "./Comment.vue";

export default {
    data() {
        return {
            comments: [],
            commentText:'',
            commentError: false,
            errorMessage: "",
            user: null,
        };
    },
    components: {
        Comment,
    },
    created() {
        this.user = this.$store.getters["users/getActiveUser"];
    },
    computed: {
        blog() {
            const blogId = this.$route.params.id;
            const blogs = this.$store.getters["blogs/blogs"];
            const blog = blogs.find((blog) => blog.id.toString() === blogId.toString());
            return blog || null;
        },
    },
    mounted() {
        fetch(`http://localhost:3000/comments?blogId=${this.$route.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                this.comments = data;
            })
            .catch((error) => console.error("Error:", error));
    },
    methods: {
        submitComment() {
            const newComment = {
                blogId: this.$route.params.id,
                username: this.user.name + " " + this.user.lastname,
                email: this.user.email,
                id: Date.now(),
                text: this.commentText,
            };

            if (!this.commentText || this.commentText.trim().length === 0) {
                this.commentError = true;
                this.errorMessage = "Please enter a valid comment.";
                return;
            }

            fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then(() => {
                    this.comments.push(newComment);
                    this.commentText = "";
                    this.commentError = false;
                    this.errorMessage = "";
                })
                .catch((error) => console.error("Error:", error));
        },
    }
};
</script>

<style scoped>
.blog-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.blog-container {
    max-width: 800px;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 2rem;
}

h2 {
    margin: 1rem 0;
    font-size: 2rem;
    color: #333;
}

.blog-image {
    max-width: 100%;
    border-radius: 8px;
}

.meta-info {
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 0.8rem;
    justify-content: center;
}

.publication-date {
    color: #888;
}

.author-name {
    color: #555;
}

.blog-content {
    font-size: 1.2rem;
    margin: 1rem 0;
    line-height: 1.6;
    color: #444;
    text-align: justify;
}

.loading-message {
    height: 300px;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.comments-section {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
}

.comments-section h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
}

.new-comment-form {
    width: 80%;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f5f5f5;
    max-width: 90%;
}

.new-comment-form textarea {
    width: 100%;
    min-height: 100px;
    resize: vertical;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.new-comment-form button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
}

.error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
</style>