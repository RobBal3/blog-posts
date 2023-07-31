<template>
    <header class="header-container">
        <div class="logo">Logo</div>
        <nav class="nav">
            <router-link class="nav-link" to="/blogPosts">All Blogs</router-link>
            <router-link v-if="!activeUser" class="nav-link" to="/signIn">Login</router-link>
            <button v-if="activeUser" class="logout-btn" @click.prevent="logout">Logout</button>
            <router-link v-if="activeUser" class="nav-link" to="/profile">Profile</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        activeUser() {
            return this.$store.getters['users/getActiveUser'];
        },
    },
    methods: {
        logout() {
            this.$store.commit('users/logout');
            this.$router.push({ name: 'blogs' });
        },
    },
};
</script>

<style scoped>
.header-container {
    height: 80px;
    background-color: #2c3e50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4%;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
}

.nav {
    display: flex;
    gap: 1rem;
}

.nav-link {
    display: block;
    text-decoration: none;
    color: #fff;
    height: 3rem;
    width: 5rem;
    line-height: 3rem;
    border-radius: 0.7rem;
    background-color: #6b7784;
    text-align: center;
}

.logout-btn {
    border: none;
    background-color: #e74c3c;
    color: #fff;
    height: 3rem;
    padding: 0 1rem;
    border-radius: 0.7rem;
    cursor: pointer;
}

/* Optional: Apply responsive layout adjustments */
@media screen and (max-width: 768px) {
    .header-container {
        padding: 0 2%;
    }

    .logo {
        font-size: 1.2rem;
    }

    .nav-link, .logout-btn {
        height: 2.5rem;
        width: auto;
        padding: 0 1.5rem;
        line-height: 2.5rem;
    }
}
</style>
