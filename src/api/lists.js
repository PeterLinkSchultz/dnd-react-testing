import request from 'superagent';
const url = "/api/data.js";
export const getListApi = async () => {
    try {
        const {body} = await request.get(url).withCredentials();
        return body;
    } catch(err) {
        return false;
    }
};