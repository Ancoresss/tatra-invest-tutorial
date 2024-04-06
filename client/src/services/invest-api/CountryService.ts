import {API_URL, Token} from "@/services/ApiData";

const headers = {
    'X-RapidAPI-Key': Token,
    'X-RapidAPI-Host': 'investing4.p.rapidapi.com'
};

const getCountries = async ()=>  await fetch(`${API_URL}/stock/list-countries`, { headers }).then((res:Response)=>{
            return res.json();
        }).catch((err)=>{
            console.warn(err)
        });

const CountryService = {
    getCountries
};

export default CountryService;
