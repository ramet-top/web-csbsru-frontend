export default function ({ store, redirect }) {
  if (!store.state.auth.user.role.name === 'AuthAdmin') {
    return redirect('/')
  }
}
