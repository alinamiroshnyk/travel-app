import request from 'request';

const _getEpochTime = (date) => {
    return Math.round(date.getTime() / 1000);
  };

const _getForecastType = (date) => {
    const currentDate = _getEpochTime(new Date());
    const epochTime = _getEpochTime(new Date(date));
    return (epochTime - currentDate > 7 * 24 * 60 * 60 * 1000) ? 'expected' : 'current';
};

const getDarkSky = async (date, lat, lng) => {
    const forecatsType = _getForecastType(date);
    const baseURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}`;
  
    if ('current' === forecatsType) {
      const url = `${baseURL}/${lat},${lng}`;
      return new Promise((resolve, reject) => {
        request(url, {json: true}, (err, res, data) => {
          if (err) {
            reject(new Error({
              success: false,
              message: 'Sorry, we are having an error',
            }));
          } else {
            if (data) {
              resolve({
                success: true,
                data: data,
              });
            } 
          }
        });
      });
    } else {
      const url = `${baseURL}/${lat},${lng},${_getEpochTime(new Date(date))}`;
      return new Promise((resolve, reject) => {
        request(url, {json: true}, (err, res, data) => {
          if (err) {
            reject(new Error({
              success: false,
              message: 'Sorry, we are having an error',
            }));
          } else {
            if (data) {
              resolve({
                success: true,
                data: {...data},
              });
            } 
          }
        });
      });
    }
  };
  
  export {getDarkSky};
  