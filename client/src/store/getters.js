const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  // name: state => state.user.name,
  roles: state => state.user.roles,
  phone: state => state.user.phone,
  email: state => state.user.email,
  profile: state => state.user.profile
}
export default getters
