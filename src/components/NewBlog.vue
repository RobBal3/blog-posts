<template>
    <form @submit.prevent="createNewBlog">
        <div class="center-container">
            <div class="container">
                <div class="input-wrapper">
                    <label for="title">Title:</label>
                    <input v-model="title" type="text" id="title" class="input-field" />
                </div>

                <div class="input-wrapper">
                    <label for="summary">Summary:</label>
                    <input v-model="summary" type="text" id="summary" class="input-field" />
                </div>

                <div class="input-wrapper">
                    <label for="img">Image Source:</label>
                    <input v-model="img" type="text" id="img" class="input-field" />
                </div>

                <div class="input-wrapper">
                    <label for="content">Content:</label>
                    <textarea v-model="content" id="content" class="input-field"></textarea>
                </div>

                <div class="button-wrapper">
                    <button type="submit" class="submit-btn">Create</button>
                    <button @click="navigateToProfile" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            summary: "",
            img: "",
            content: ""
        }
    },
    methods: {
        navigateToProfile() {
            this.$router.push({name: 'profile'})
        },
        createNewBlog() {
            const newBlog = {
                id: Date.now(),
                title: this.title,
                content: this.content,
                summary: this.summary,
                img: this.img,
                author: this.getUserData,
                "publicationDate": Date.now(),
                "comments": null
            }

            console.log(newBlog);

            fetch("http://localhost:3000/blogs",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBlog)
            }).then(() => {
                this.$router.push({name:"profile"})
            })
        }
    },
    computed: {
        getUserData() {
            return {
                userId: this.$store.getters['users/getActiveUser'].id,
                name: this.$store.getters['users/getActiveUser'].name,
                email: this.$store.getters['users/getActiveUser'].email,
            }
        }
    }
};
</script>

<style scoped>
.center-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    width: 100%; /* Set the center-container to occupy the full width of the parent */
}

.container {
    max-width: 600px; /* Adjust the max-width of the container as needed */
    width: 100%; /* Set the width of the container to occupy the full width available */
    padding: 1.5rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-weight: bold;
}

.input-field {
    width: 100%; /* Set the width to 100% for the input fields */
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

textarea.input-field {
    resize: vertical;
}

.button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.submit-btn {
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-btn {
    background-color: #dc3545;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
