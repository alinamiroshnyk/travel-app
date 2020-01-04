import request from 'request';

const getGEO = async (destination) => {
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.GEO_USERNAME}`;

  return new Promise((resolve, reject) => {
      console.log(process.env.GEO_USERNAME)
    request(url, {json: true}, (err, res, data) => {
      if (err) {
        reject(new Error({
          success: false,
          message: 'Sorry, we are having an error',
        }));
      } else {
        if (data && data.geonames && data.geonames[0]) {
          const {countryCode, countryName, lat, lng} = data.geonames[0];
          resolve({
            success: true,
            data: {destination: destination, countryCode, countryName, lat, lng},
          });
        } 
      }
    });
  });
};

export {getGEO};
