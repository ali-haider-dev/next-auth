import { compare, hash } from 'bcryptjs';
import fs from 'fs';
import Error from 'next/error';
import path from 'path';

const filePath = path.join(process.cwd(), "src" , "data", "user.json");

export function getAll () {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

export function getById (id) {
    const data = getAll();
    return data.find(p => p.id === Number(id));
}
export function getByEmail (email) {
    const data = getAll();
    return data.find(p => p.email.toLowerCase() === email.toLowerCase());
}
export async function verifyPassword (hashedPassword,password) {
    const isValid = await compare(password,hashedPassword)
 return isValid; 
}
export async function save (email,password) {
    const found = getByEmail(email);
    const hashedpassword = await hash(password,12)
   
    if(found){
    throw new Error("Already exist")
    }
    const data = getAll();
    data.push({
        id: data.length + 1,
        email,password:hashedpassword
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
}