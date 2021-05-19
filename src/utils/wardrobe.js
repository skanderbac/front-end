import axios from "axios";
const url = 'https://online-wardrobe-back.herokuapp.com/robe' ;
export const ajoutdress =  (newdress) =>   axios.post(url , newdress);
export const getDresses =  () =>   axios.get(url);
export const deleteDresses =  (id) =>   axios.delete(`${url},${id}`);
export const getPreferences =  (usage,gender) =>   axios.get('http://51.38.224.143:9000/api?usage='+usage+'&&gender='+gender,{
    headers: {"Access-Control-Allow-Origin": "*"}
});
export const getClasification =  (image) =>   axios.post('http://51.38.224.143:8000/api/predict/',image,{
    headers: {"Access-Control-Allow-Origin": "*"}
});
