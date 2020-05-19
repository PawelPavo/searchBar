

const cron = require('node-cron');
const sendBirthdayMessage = () => { console.log("*** THIS IS COMING FROM CHRON ***") };

// schedule takes two arguments, cron time and the task to call when we reach that time
cron.schedule('1 1 1 * *', sendBirthdayMessage())

export default cron;