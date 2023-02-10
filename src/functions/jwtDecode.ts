// import jwt from 'jwt-decode'
import jwtDecode from "jwt-decode";


export async function jwtDecodeFunction(){
    const token:any = window.localStorage.getItem('token');
    return await jwtDecode(token)
}