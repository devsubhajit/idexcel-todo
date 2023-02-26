import axios from 'axios';


type postType = {
    item:string
}
type deleteType = {
    id:string
}
type updateType = {
    id:string,
    status:string
}

const getItem = () => {
    return axios({
        method: 'GET',
        url: '/todos',
        headers: {
            "Content-Type": "application/json"
        }
    })
}
const postItem = (params:postType) => {
    return axios({
        method: 'POST',
        url: '/todos',
        headers: {
            "Content-Type": "application/json",
        },
        data: params
    })
}
const deletItem = (params:deleteType) => {
    return axios({
        method: 'DELETE',
        url: '/todos/' + params.id,
        headers: {
            "Content-Type": "application/json",
        }
    })
}
const updateItem = (params:updateType) => {
    return axios({
        method: 'PUT',
        url: '/todos/' + params.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: params
    })
}

export const api = {
    getItem: getItem,
    postItem: postItem,
    deletItem: deletItem,
    updateItem: updateItem,
}