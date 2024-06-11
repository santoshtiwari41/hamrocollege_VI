import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}
export interface StudentData {
  name: string;
  email: string;
  department: string;
  batch: string;
}
export interface Credentials{
  email: string;
  password: string;
}
export interface Notification{
  title: string;
  description: string;
  scheduledDate: string;
  imageUri: string;
}
export interface Calendar{
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  isHoliday:boolean
}

const api = axios.create({
  baseURL: 'http://apiUrl',
});

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return data;
};
export const notifiation=async():Promise<User[]>=>{
    const{data}=await axios.get('https://jsonplaceholder.typicode.com/notification')
    return data
}

export const studentRegister= async (studentData:StudentData) => {
  return await api.post('/api/register', studentData)
}

export const studentLogin= async(credentials:Credentials) => {
  return await api.post('/api/login', credentials)
}

export const sendNotification=async (notification:Notification) => {
  return await api.post('/api/sendNotification', notification)
}

export const sendCalendarEvent= async (calendar:Calendar) => {
  return await api.post('/api/calendar', calendar)
}

export const receiveCaledarEvent= async() => {
  const{data}=await axios.get('/api/calendar')
  return data
}
