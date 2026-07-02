import { CronJob } from "cron";
import https from "https";

const job = new CronJob("*/14 * * * *", () => {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Keep-alive ping sent successfully");
      } else {
        console.log(`Keep-alive ping failed: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error sending keep-alive ping:", err);
    });
});

export default job;