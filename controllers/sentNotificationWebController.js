const admin = require("firebase-admin");
const webNotification = require("../models/notificationForWebModel");
const Lead = require("../models/leadModel");
const schedule = require("node-schedule");
var FCM = require("fcm-node");
var serverKey = "AAAAnus9Ao0:APA91bGCHcEiRwMsFRbsnN8od663jhfhdnuq10H2jMMmFzVrCVBACE4caGSZ-mAwf3VB6n_fUmrHxKPou1oyBaKXfUfcnAz6J2TTJm12woXqJVTleay2RSE0KPzuRTI2QppI3rrYY2HQ"; // Replace with your actual server key
var fcm = new FCM(serverKey);
  
async function scheduleJob() {
  const inputDate = new Date();
  inputDate.setHours(inputDate.getHours() + 5);
  inputDate.setMinutes(inputDate.getMinutes() + 30);
  const formattedDate = inputDate.toISOString();
   
  const leads = await Lead.find({
    followup_date: { $gte: '2024-04-20T12:09:00.000Z' },
    status: { $nin: ["65a904164473619190494480", "65a903e9447361919049447a"] },
  });

  if (leads.length > 0) {
    const message1 = {
      collapse_key: "your_collapse_key",
      notification: {  
        title: "Title of your push notification",
        body: 'Umesh Sir Lamchothad hai', // You can customize this
      },
      data: {
        my_key: "my value",
        my_another_key: "my another value",
      },
    };

    for (const element of leads) {
      const followup_date = new Date(element.followup_date);
      // console.log('followup_date',followup_date)
      const agent_id = element.assign_to_agent;
      const message = element.massage_of_calander;

      followup_date.setHours(followup_date.getHours() - 5);
      followup_date.setMinutes(followup_date.getMinutes() - 30);
      const formattedDate1 = followup_date.toISOString();
      const targetDate = new Date(formattedDate1);

      schedule.scheduleJob('2024-04-20T11:29:00.000Z', async () => {
        try {
         console.log('agent_id', agent_id)
          const tokentable = await webNotification.findOne({
            user_id: agent_id,
          });   

          console.log('tokentable', tokentable);

          const token = tokentable ? tokentable.token : 'c1JZIvWKT-qPBArK0loypj:APA91bGp5-dAl2n2lzVeGyCqOiXhOjjm5cN_ps7S0EVOwNbi07-1KtidaxT8uaLgLIhw14w0D3yHs5sHMkdUy5DCgSvtK1_Li8hz_-3jwnFmz9FUTNujIh3szdirobopwbk3Eis4WqNH';
          console.log('token', token)
          if (!message) {
            message = "meeting";
          }
          console.log('message', message)

          if (token) {
            message1.to = token; // Assign the token to the 'to' property
            fcm.send(message1, function (err, response) { 
              if (err) {
                console.log("Something has gone wrong!");
              } else {
                console.log("Successfully sent with response: ", response);
              }
            });
          } else {
            console.log('Token not found for agent:', agent_id);
          } 
        } catch (error) {
          console.error("Error fetching webNotification:", error);
        }
      });
      console.log('targetDate', targetDate)
    }
  } else {
    console.log("No leads found. Job not scheduled.");
  }
}

module.exports = scheduleJob;
