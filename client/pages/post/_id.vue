<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{post.title}}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
        
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{post.views}}
        </small>
      </div>
      <div class="post-image">
        <img 
        :src="post.imageUrl" 
        alt="post image" />
      </div>
    </header>
    <main class="post-content">
      <vue-markdown> {{post.text}}</vue-markdown>
     
    </main>
    <footer>
      <app-comment-form
      v-if="canAddComment" 
      @created="createCommentHendler"
      />
      <div class="comments" v-if="post.comments.length">
        <app-comment
        v-for="comment in comments"
        :key="comment"
        :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Коментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'
export default {
  data() {
    return {
      canAddComment: true
    }
  },
  validate({params}) {
    return Boolean(params.id);
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    console.log(post)
    return {post}
  },
  components: {
    AppComment,
    AppCommentForm
  },
  methods: {
    createCommentHendler() {
      this.canAddComment = false
    }
  }
};
</script>

<style scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }
  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }
  .post-image img{
    width: 100%;
    height: auto;
  }
  .post-header {
    margin-bottom: 1.5rem;
  }
  .post-content {
    margin-bottom: 2rem;
  }
</style>