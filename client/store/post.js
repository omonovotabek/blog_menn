const posts = [
  {title: 'Post 1', date: new Date(), views:22, comments:[1,2], _id: 'id1'},
  {title: 'Post 2', date: new Date(), views:22, comments:[1,2], _id: 'id2'}
]

export default {

  actions: {
   async fetchAdmin({}) {
     return await new Promise(resolve => {
       setTimeout(() => {
         resolve(posts)
       }, 2000)
     })
   },

   async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(p => p._id === id))
      }, 2000)
    })
  },

  async remove ({}, id) {

  },

  async update ({}, {id, text}) {

  },

  async create ({}, {title, text}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
  },
  getters: {

  }
}