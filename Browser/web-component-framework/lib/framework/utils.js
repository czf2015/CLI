export function isRoute(path) {
    const paths = (window.location.pathname || '/').split('/')
    const slugs = path.split('/')
    if (slugs.length !== paths.length) {
        return false
    }
    for (let i = 0; i < slugs.length; i++) {
        if (slugs[i].includes(':')) {
            return true
        } else {
            if (slugs[i] !== paths[i]) {
                return false
            }
        }
    }
    return true
}