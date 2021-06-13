import moment from "moment";
export const getLastPostDuration = (date) => {
  const now = moment(date);
  const expiration = moment();
  const diff = expiration.diff(now);
  const diffDuration = moment.duration(diff);
  if (diffDuration.hours() < 1 && diffDuration.days() < 1) {
    return moment(date).startOf("minutes").fromNow();
  }
  if (diffDuration.days() >= 6) {
    return moment(date).format("D MMM YY, h:mm a");
  }
  return moment(date).calendar().replace(" at ", ", ");
};
export const getTimeDuration = (duration) => {
  let seconds = Math.floor((duration % 1) * 60);
  let minutes = Math.floor(duration);
  let hours = 0;
  if (minutes > 60) {
    hours = minutes / 60;
    minutes = (hours % 1) * 60;
    hours = Math.floor(hours);
  }
  let newDuration = "";
  if (hours > 0) {
    newDuration += hours + " h ";
  }
  if (minutes > 0) {
    newDuration += minutes + " min ";
  }
  if (seconds > 0) {
    newDuration += seconds + " sec";
  }
  return newDuration;
};
export const mmss = (secs) => {
  const formatted = moment.utc(Math.round(secs) * 1000).format("mm:ss");
  return formatted;
};
export const covertMiliToDays = (milli) => {
  let minutes = Math.floor(milli / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);

  return (
    (days && { value: days, unit: "days" }) ||
    (hours && { value: hours, unit: "hours" }) || {
      value: minutes,
      unit: "minutes",
    }
  );
};
