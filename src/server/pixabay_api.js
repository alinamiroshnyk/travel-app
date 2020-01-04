import request from 'request';

const getPixaBay = async (destination) => {
    const baseURL = `https://pixabay.com/api?key=${process.env.PIXABAY_API_KEY}&q=${destination}&image_type=photo&category=places`;
    const url = `${baseURL}&pretty=true`;

return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, res, data) => {
        if (err) {
            reject(new Error({
            success: false,
            message: 'Sorry, we are having issues',
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
    };

export {getPixaBay};
