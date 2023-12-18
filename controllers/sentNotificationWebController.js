const admin = require("firebase-admin");
const webNotification = require("../models/notificationForWebModel");
const Lead = require("../models/leadModel");
const schedule = require("node-schedule");
var FCM = require("fcm-node");
var serverKey =
  "AAAAG8g0Jgk:APA91bF2Tm4IkOcsVuAwaw2nqicIndyvBQOiO_GXRxAntYjhYKLTPkKIy4d0yyBY1cY8H175mHUzpASxUGpGJ7xJXT1Fpc0nIggGaPQXpzrrt2aaJM1WPO1D4ELcT18emGKV_BviJkkE"; //put your server key here
var fcm = new FCM(serverKey);

async function scheduleJob() {
  const inputDate = new Date(); 
  inputDate.setHours(inputDate.getHours() + 5);
  inputDate.setMinutes(inputDate.getMinutes() + 30);
  const formattedDate = inputDate.toISOString();
     //console.log(inputDate)
  const leads = await Lead.find({
    followup_date: { $gte: formattedDate },
    status: { $nin: ["6539fa950b9756b61601287b", "6561c44233093ed343745a3e"] },
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
      //console.log(targetDate)
       schedule.scheduleJob(targetDate, async () => {
        try {
          //console.log('chala')
         // console.log('agent_id',agent_id)
          const tokentable = await webNotification.findOne({
            user_id: agent_id,
          });
     
         // console.log('tokentable',tokentable);

          const token = await tokentable.token;
         // console.log('token',token)
          if (!message) {  
            message = "meeting";
          }
       //   console.log('message',message)
          var message1 = {  
            to: token,
            collapse_key: "your_collapse_key",
            notification: {
              title: "Title of your push notification",
              body: message,
            },
            data: {
              my_key: "my value",
              my_another_key: "my another value",
            },  
          };
          fcm.send(message1, function (err, response) {
            if (err) {
              console.log("Something has gone wrong!");
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
        } catch (error) {
          console.error("Error fetching webNotification:", error);
        }
      });
    // console.log(targetDate)
    }
  } else {
    console.log("No leads found. Job not scheduled.");
  }
}
 
module.exports = scheduleJob;
