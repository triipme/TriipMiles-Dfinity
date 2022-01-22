export const destinationService = async () => {
  try {
    const rs = fetch(`https://api.triip.me/api/v1/places?q=`).then(json => json.json());
    return rs;
  } catch (error) {
    console.log(error);
  }
};
