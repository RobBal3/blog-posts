<template>
    <form @submit.prevent="saveChanges">
        <div class="container">
            <div class="input-wrapper">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="title"/>
            </div>

            <div class="input-wrapper">
                <label for="summery">Summery:</label>
                <input type="text" v-model="summary" id="summery"/>
            </div>

            <div class="input-wrapper">
                <label for="content">Content:</label>
                <textarea type="textarea"  id="content" v-model="content"></textarea>
            </div>

            <div class="btn-wrapper">
                <button class="btn save" type="submit">Save Changes</button>
                <button @click.prevent="cancelEdit" class="btn cancel">Cancel</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                originalBlog: null,
                title: '',
                summary: '',
                content: '',
            }
        },

        created() {
            const blog = this.$store.getters['blogs/blogs'].find(blog => {
                return blog.id === +this.$route.params.id
            })

            this.title = blog.title;
            this.summary = blog.summary;
            this.content = blog.content;
            this.originalBlog = blog;
        },
        methods: {
            cancelEdit() {
                this.$router.push({name: 'profile'})
            },
            saveChanges() {
                const updatedBlog = {
                    title: this.title,
                    summary: this.summary,
                    content: this.content,
                }
                const newBlog = { ...this.originalBlog, ...updatedBlog }
                this.$store.commit('blogs/editBlog', newBlog)

                fetch(`http://localhost:3000/blogs/${this.originalBlog.id}`, {
                    method:'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBlog)
                }).then(res => {
                    if(res.ok) {
                        this.$router.push({name: 'profile'})
                    } else {
                        console.log('Failed to Upload')
                    }
                }).catch(error => {
                    console.error('Error', error)
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    .input-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    label {
        width: 5rem;
    }

    .btn-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    input, textarea {
        border-radius: 7px;
        padding: 1rem;
        border: none;
        min-width: 35rem;
        max-width: 35rem;
        height: 4rem;
    }

    button {
        width: 10%;
        height: 3rem;
        border-radius: 7px;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .save {
        background: green;
    }
    .cancel {
        background: #c53b3e;
    }
</style>