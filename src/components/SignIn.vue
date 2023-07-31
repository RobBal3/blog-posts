<template>
    <form @submit.prevent="handleSignInSignUp" class="form">
        <h1 class="form-heading">{{ authMode.headingText }}</h1>

        <!-- Name -->
        <div v-if="!signIn" class="form-field">
            <label for="name">Name:</label>
            <input placeholder="Name" type="text" id="name" v-model.trim="name" />
        </div>

        <!-- Lastname -->
        <div v-if="!signIn" class="form-field">
            <label for="lastname">Lastname:</label>
            <input placeholder="Lastname" type="text" id="lastname" v-model.trim="lastname" />
        </div>

        <!-- Email -->
        <div class="form-field">
            <label for="email">Email:</label>
            <input placeholder="Email" type="email" id="email" v-model.trim="email" />
        </div>

        <!-- Username -->
        <div v-if="!signIn" class="form-field">
            <label for="username">Username:</label>
            <input placeholder="Username" type="text" id="username" v-model.trim="username" />
        </div>

        <!-- Password -->
        <div class="form-field">
            <label for="password">Password:</label>
            <input placeholder="Password" type="password" id="password" v-model.trim="password" />
        </div>

        <p class="error-message" v-if="incorrectInput || signInError">{{ errorMessage }}</p>

        <p class="toggle-auth-mode" @click="toggleAuthMode">{{ authMode.buttonText }}</p>

        <button type="submit">Submit</button>
    </form>
</template>
<script>
    export default {
        data() {
            return {
                signIn: true,
                incorrectInput: false,
                signInError: false,
                errorMessage: '',
                name: '',
                email: '',
                lastname: '',
                username: '',
                password: '',
            }
        },
        methods: {
            toggleAuthMode() {
                this.signIn = !this.signIn;
                this.incorrectInput = false;
                this.signInError = false;
                this.errorMessage = '';
                this.name = '';
                this.lastname = '';
                this.email = '';
                this.username = '';
                this.password = '';
            },
            handleSignInSignUp() {
                const url = "http://localhost:3000/users"
                if (this.signIn) {
                    if (this.checkSignInValidity) {
                        fetch(url).
                            then(res => res.json()).
                            then(users => {
                                const activeUser = users.find(({email, password}) => email === this.email && password === this.password)
                                if (!activeUser) {
                                    this.errorMessage = 'Wrong Credentials'
                                    this.signInError = true
                                } else {
                                    this.$store.commit('users/setActiveUser', activeUser)
                                    this.$router.push({name: 'profile'});
                                }
                        })
                    } else {
                        this.errorMessage = 'Fill in all inputs';
                        this.incorrectInput = true;
                    }
                } else
                {
                    if (this.checkSignUpValidity) {
                        const newUser = {
                            name: this.name,
                            lastname: this.lastname,
                            email: this.email,
                            username: this.username,
                            password: this.password,
                            id: Date.now(),
                        }

                        fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newUser)
                        }).then(res => {
                            if (res.ok) {
                                this.$store.commit('users/setActiveUser', newUser)
                                this.$router.push({ name: 'profile' })
                            }
                        })
                    } else {
                        this.errorMessage = 'Fill in all inputs'
                        this.incorrectInput = true;
                    }
                }
            }
        },
        computed: {
            authMode() {
                if (this.signIn) {
                    return {
                        buttonText: 'Do you have an account ?',
                        headingText: "Sign In"
                    }
                }
                return {
                    buttonText: 'Sign In',
                    headingText: "Sign Up"
                }
            },
            checkSignInValidity() {
                if ( this.email && this.password) {
                    return true;
                }
                return false;
            },
            checkSignUpValidity() {
                if ( this.email && this.password && this.username && this.name && this.lastname ) {
                    return true;
                }
                return false;
            }
        },

    }
</script>

<style scoped>
.form {
    max-width: 400px;
    margin: 1rem auto;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.form-heading {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.form-field {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.form-field label {
    min-width: 100px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
}

.form-field input {
    flex: 1;
    height: 40px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-field input:focus {
    border-color: #6c63ff;
}

.error-message {
    color: red;
    text-align: center;
    margin-bottom: 1.5rem;
}

.toggle-auth-mode {
    color: #6c63ff;
    cursor: pointer;
    text-align: center;
    font-size: 1.1rem;
    transition: color 0.3s;
}

.toggle-auth-mode:hover {
    color: #564ee8;
}

button {
    margin-top: 0.5rem;
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #6c63ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #564ee8;
}

@media screen and (max-width: 600px) {
    .form {
        padding: 1rem;
    }

    .form-heading {
        font-size: 1.6rem;
    }

    .form-field label {
        min-width: 80px;
    }

    .form-field input {
        font-size: 0.9rem;
    }

    button {
        font-size: 1rem;
    }
}

@media screen and (max-width: 400px) {
    .form-field label {
        min-width: 60px;
    }

    .form-field input {
        font-size: 0.8rem;
    }

    button {
        font-size: 0.9rem;
    }
}

@media screen and (max-width: 600px) {
    .form-field {
        display: flex;
        flex-direction: column;
    }

    .form-field label {
        margin-bottom: 5px;
    }
}
</style>
