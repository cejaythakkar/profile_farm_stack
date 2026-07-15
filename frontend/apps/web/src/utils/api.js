import { axiosClient } from './axiosClient'
export const fetchData = async ({ url }) => {
    const token = localStorage.getItem('token') || '';
    const response = await axiosClient.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const responseData = response.data
    return responseData.data
}