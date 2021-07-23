const convertDate = (time) => {
  if (time === null || time === undefined) {
    return "";
  }
  time = new Date(time)

  let day = time.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = time.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = time.getFullYear();
  if (year < 10) {
    year = "0" + year;
  }
  let result = `${day}-${month}-${year}`;
  return result;
};

const convertTime = (time) => {
  if (time === null || time === undefined) {
    return "";
  }
  time = new Date(time)
  let hours = time.getUTCHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = time.getUTCMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = time.getUTCSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let result = `${hours}:${minutes}:${seconds}`;
  return result;
};

const convertDateTime = (time) => {
  if (time === null || time === undefined) {
    return "";
  }
  time = new Date(time)
  let day = time.getUTCDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = time.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = time.getFullYear();
  if (year < 10) {
    year = "0" + year;
  }
  let hours = time.getUTCHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = time.getUTCMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = time.getUTCSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

export {
  convertDate,
  convertTime,
  convertDateTime
}