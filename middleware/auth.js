export default function ({ route, redirect }) {
  if (process.client) {
    if (route.path === '/login') return

    const token = window.localStorage.getItem('token')
    if (!token) return redirect('/login')
  }
}
