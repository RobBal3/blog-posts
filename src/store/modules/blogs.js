export default {
    namespaced: true,
    state() {
        return {
            blogs: [],
        }
    },
    mutations: {
        setBlogsData(state, data) {
            state.blogs = data;
        },
        deleteBlog(state, data) {
            state.blogs = state.blogs.filter(blog => {
                return blog.id !== data;
            })
        },
        editBlog(state, payload) {
            const index = state.blogs.findIndex(blog => blog.id === payload.id)
            if (index !== -1) {
                state.blogs.splice(index, 1, payload)
            }
        }
    },
    actions: {
        fetchBlogsData({ commit }) {
            fetch("http://localhost:3000/blogs").
                then(res => res.json()).
                then((data) => {
                    commit('setBlogsData', data);
                }).
                catch((error) => {
                console.log('Error catched when fetching', error)
            } )
        },
    },
    getters: {
        blogs(state) {
            return state.blogs;
        }
    }
}