<template>
  <el-card shadow="always" :style="{ width: '500px' }">
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
    <h2>Войти в панел администратора</h2>
      <el-form-item label="Логин" prop="email">
        <el-input v-model="controls.email"></el-input>
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input v-model="controls.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: "empty",
   data() {
    return {
      loading: false,
      controls: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Введите логин",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Введите парол",
            trigger: "blur",
          },
          {
            min: 6,
            message: 'Пароль должен быть не менее 6 символов',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  mounted() {
    const {message} = this.$route.query
    if(message === 'login')
        this.$message.info('Для начала войдите в систему')

    if(message === 'logout')
        this.$message.success('Вы успешно вышли из систему')
  },
  methods: {
   async onSubmit () {
      const formData = {
        email: this.controls.email,
        password: this.controls.password
      }
      try {
        await this.$refs.form.validate()
        this.loading = true
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/admin')
      } catch (e) {
        this.loading = false
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
</style>