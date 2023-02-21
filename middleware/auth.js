export default function ({ route, redirect }) {
  if (process.client) {
    if (route.path === '/login') return

    const cookies = document.cookie
    if (cookies.indexOf('jwt-token=') === -1) {
      // token didnt exist
      redirect('/login')
    }
  }
}
