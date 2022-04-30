<template>
  <q-page class="flex flex-center">
    <div class="text-h4 text-purple text-bold">
      안녕하세요. 생채인증을 해주세요.
      <q-linear-progress indeterminate color="warning"></q-linear-progress>
    </div>
  </q-page>
</template>
<style>
</style>

<script>
let interval
import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {}
  },
  mounted() {
    interval = setInterval(() => this.checkUser(), 2000)
  },
  methods: {
    checkUser() {
      axios
          .get('http://localhost:5001/java/user/')
          .then(response => {
            const data = response.data
            if (data.userDongHo !== null) {

              clearInterval(interval)

              this.$router.push({
                name: 'order', params: {
                  userDong: data.userDongHo.split('-')[0],
                  userHo: data.userDongHo.split('-')[1],
                  userName: data.userName
                }
              })
            }
          })
          .catch(() => {
            this.$router.push('error')
          })
    }
  }
}
</script>
