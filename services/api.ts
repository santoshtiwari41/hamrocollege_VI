import axios from 'axios';

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  batchId: string | undefined;
  
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
interface Batch{
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

interface Otp{
  email: string;
}

const api = axios.create({
  baseURL: 'http://192.168.1.3:4000',
});




export const studentRegister= async (studentData:StudentData) => {
  return await api.post('/admin/student/register', studentData)
}

export const studentLogin= async(credentials:Credentials) => {
  return await api.post('/auth/student/login', credentials)
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
export const createBatch= async(batch:Batch) => {
  return await api.post('/batchs', batch)
}
export const getBatchs= async() => {
  return await api.get('/batchs')
}

export const getOtp= async(otp:Otp) => {
  return await api.post('/auth/otp', otp)
}
