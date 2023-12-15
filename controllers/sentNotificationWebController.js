const webNotification = require('../models/notificationForWebModel');
const Lead = require('../models/leadModel');
const schedule = require('node-schedule');

async function scheduleJob() {
  const inputDate = new Date();
  inputDate.setHours(inputDate.getHours() + 5);
  inputDate.setMinutes(inputDate.getMinutes() + 30);
  const formattedDate = inputDate.toISOString();

  const leads = await Lead.find({
    followup_date: { $gte: formattedDate },
    status: { $nin: ["6539fa950b9756b61601287b", "6561c44233093ed343745a3e"] }
  });

  if (leads.length > 0) {
    for (const element of leads) {
      const followup_date = new Date(element.followup_date);
      const agent_id = element.assign_to_agent;
      const message = element.massage_of_calander;

      followup_date.setHours(followup_date.getHours() - 5);
      followup_date.setMinutes(followup_date.getMinutes() - 30);
      const formattedDate1 = followup_date.toISOString();

      const targetDate = new Date(formattedDate1);

      schedule.scheduleJob(targetDate, async () => {
        try {
          const leads = await webNotification.find({
            user_id: agent_id,
          });

          const token = leads.token;
          if (!message) {
            message = "meeting";
          }
          const title = "Notification From Crm";

          // Your notification logic here
          console.log(title); 

        } catch (error) {
          console.error('Error fetching webNotification:', error);
        }
      });
     
    }
  } else {
    console.log('No leads found. Job not scheduled.');
  }
}

module.exports = scheduleJob;
