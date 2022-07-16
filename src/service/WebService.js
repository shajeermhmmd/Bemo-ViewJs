import Api, { FileUp } from '@/service/Api'
export default {
  postCall (link, params) {
    return Api().post(link, params).catch((error) => {
      switch (error.response.status) {
        case 400:
          alert(error.response.data.message)
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$router.push('/')
          break
        case 401:
          this.$router.push('/')
          break
        case 403:
          this.$router.push('/403')
          break
        case 500:
          alert('Server Error Try again latter')
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
      }
    })
  },
  putCall (link, params) {
    return Api().put(link, params).catch((error) => {
      switch (error.response.status) {
        case 400:
          alert(error.response.data.message)
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$router.push('/')
          break
        case 401:
          this.$router.push('/')
          break
        case 403:
          this.$router.push('/403')
          break
        case 500:
          alert('Server Error Try again latter')
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
      }
    })
  },
  getCall (link, params) {
    return Api().get(link, params).catch((error) => {
      switch (error.response.status) {
        case 400:
          alert(error.response.data.message)
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$router.push('/')
          break
        case 401:
        case 403:
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$emit.logout()
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
          break
        case 500:
          alert('Server Error Try again latter')
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
      }
    })
  },
  deleteCall (link, params) {
    return Api().delete(link, params).catch((error) => {
      switch (error.response.status) {
        case 400:
          alert(error.response.data.message)
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$router.push('/')
          break
        case 401:
        case 403:
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$emit.logout()
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
          break
        case 500:
          alert('Server Error Try again latter')
          this.$router.replace({ name: 'Login' })
          this.$router.push('/')
      }
    })
  },
  authFileUp (link, params) {
    return FileUp.post(link, params).catch((error) => {
      switch (error.response.status) {
        case 400:
        case 500:
        case 401:
        case 403:
          this.$emit('authenticated', false)
          localStorage.setItem('accessToken', '')
          localStorage.setItem('loggedIn', false)
          this.setToken()
          this.$router.push('/login')
      }
    })
  },
}
