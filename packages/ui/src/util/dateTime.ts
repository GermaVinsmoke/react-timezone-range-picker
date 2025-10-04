export const getCurrentTime = () => new Date().toTimeString().slice(0, 8);

export const getCurrentDate = () => new Date().toISOString().slice(0, 10);
