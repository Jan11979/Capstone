import axios from "axios";

 export const getInfo = () =>
        axios.get(`/api/info`).then(response => response.data)


