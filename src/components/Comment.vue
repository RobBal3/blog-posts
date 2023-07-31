<template>
    <div class="comment">
        <div class="comment-info">
            <span class="comment-author">{{ comment.username }}</span>
            <span class="comment-email">{{ comment.email }}</span>
        </div>
        <p class="comment-text">{{ comment.text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.comment {
    width: 80%;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f5f5f5;
    max-width: 90%;
}

.comment-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
}

.comment-author {
    margin-right: 0.5rem;
    font-weight: bold;
}

.comment-text {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
}

.comment-email {
    font-style: italic;
}
</style>
