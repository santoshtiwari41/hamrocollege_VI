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
export interface BatchNotification{
  type: string;
  batchId: string;
  title: string;
  body: string;
  scheduledTime: string;
 
}

export interface DepartmentNotification{
  type: string;
  departmentId: string;
  title: string;
  body: string;
  scheduledTime: string;
}
export interface AllNotification{
  type: string;
  title: string;
  body: string;
  scheduledTime: string;
}
export interface Calendar{
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  holiday:boolean
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
  baseURL: 'http://192.168.1.5:4000',
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
  return await api.post('/events', calendar)
}

export const receiveCaledarEvent= async() => {
  return await api.get('/events')

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

export const sendNotificationBatch= async(notification:BatchNotification) => {
  return await api.post('/notifications', notification)
}

export const sendNotificationDepartment= async(notification:DepartmentNotification) => {
  return await api.post('/notifications', notification)
}

export const sendNotificationAll= async(notification:AllNotification) => {
  return await api.post('/notifications', notification)
}
export const getProfile= async(id:string) => {
  const response = await api.get(`/students/profile?studentId=${id}`);
  return response.data;
}
export const getAllStudents = async (batchId: string) => {
  try {
    const response = await api.get(`/batchs/${batchId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error; 
  }
};
