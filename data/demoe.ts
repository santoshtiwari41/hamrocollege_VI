// demoe.tsx (or demoe.ts if it's not a React component)

interface Event {
    description: string;
    endTime: string;
    holiday: boolean;
    id: number;
    startTime: string;
    title: string;
  }
  
  
  
  export const convertEvents = (events: Event[]): { description: string, holiday: boolean, id: number, date: string, title: string }[] => {
    let convertedEvents: { description: string, holiday: boolean, id: number, date: string, title: string }[] = [];
    let currentId: number = 1; // Start id counter from 1
  
    events.forEach(event => {
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);
  
      // Loop through each day between startDate and endDate
      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
        const newEvent = {
          description: event.description,
          holiday: event.holiday,
          id: currentId, // Assign the current id
          date: formattedDate,
          title: event.title
        };
        convertedEvents.push(newEvent);
        currentId++; // Increment id for the next event
      }
    });
  
    return convertedEvents;
  };
  
 
 