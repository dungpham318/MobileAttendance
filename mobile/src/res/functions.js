export const convertDate = (time, type) => {
  if (time === null || time === undefined) {
    return "";
  }
  let day = time.getUTCDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = time.getUTCMonth() + 1
  if (month < 10) {
    month = "0" + month;
  }
  let year = time.getFullYear();
  if (year < 10) {
    year = "0" + year;
  }
  let result = ''
  if (type === 'yyyy-mm-dd') {
    result = `${year}-${month}-${day}`;
  } else {
    result = `${day}-${month}-${year}`;
  }
  return result;
}

export const convertTime = (time) => {
  if (time === null || time === undefined) {
    return "";
  }
  time = new Date(time)
  let hour = time.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minutes = time.getMinutes()
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  // let year = time.getFullYear();
  // if (year < 10) {
  //   year = "0" + year;
  // }

  let result = `${hour}:${minutes}`;
  return result;
}