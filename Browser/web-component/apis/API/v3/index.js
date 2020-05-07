import respond from '@/utils/respond'


export default (Model, list = [], methods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']) => {
    const API = {}
    methods.forEach(method => API[method] = respond(method, Model, list))
    return API
}
