
const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    let expires2 = expires
    if (expires2 instanceof Date) {
      expires2 = expires2.toUTCString()
    }

    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${expires2}`,
    ].join(';')
  },

  unset(name) {
    cookie.set({ name, expires: new Date(0) })
  },

  get(name) {
    const re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)',
    ].join(''))

    const matches = document.cookie.match(re)

    return matches ? decodeURIComponent(matches[1]) : undefined
  },
}

export default cookie
