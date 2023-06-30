
export const calculateBarPercentage = (endTime) => {
  // const nowDate = Math.round(new Date().getTime() / 1000);
  // if (nowDate < endTime) {
  //   return 100
  // } else {
  //   // Define the two dates
  //   const date1 = new Date(1688078937 * 1000);
  //   const date2 = new Date();
  //   console.log(date1)
  //   console.log(date2);

  //   // Calculate the absolute difference in milliseconds between the two dates
  //   const timeDifference = Math.abs(date1 - date2);

  //   // Calculate the percentage difference
  //   const percentageDifference =
  //     (timeDifference / (date1.getTime() + date2.getTime())) * 100;

  //   console.log(percentageDifference); // Print the percentage difference
  // }
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
