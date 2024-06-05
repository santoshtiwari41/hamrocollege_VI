import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return data;
};
export const notifiation=async():Promise<User[]>=>{
    const{data}=await axios.get('https://jsonplaceholder.typicode.com/notification')
    return data
}
