<template>
  <div>
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
    <h2>Создать пользователя</h2>
      <el-form-item label="Логин" prop="email">
        <el-input v-model="controls.email"></el-input>
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input v-model="controls.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" round :loading="loading">
          Создать
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
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
  methods: {
   async onSubmit () {
      const formData = {
        email: this.controls.email,
        password: this.controls.password
      }
      try {
        await this.$refs.form.validate()
        this.loading = true
        await this.$store.dispatch('auth/createUser', formData)
        this.$message.success('Новый пользователь добавлен')
        this.controls.email = ''
        this.controls.password = ''
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e);
      }
    }
  }

}
</script>

<style scoped>
 form {
   width: 600px;
 }
</style>