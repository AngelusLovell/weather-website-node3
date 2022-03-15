			
			const request = require('request');
			
			const forecast = ({longitude, latitude, location}, callback) => {
				
				const url = 'http://api.weatherstack.com/current?access_key=5a0e1b5d12efd08593beb8404bcbc58f&query=' + longitude + ',' + latitude + '&units=f';
				
				request({ url, json: true }, (error, { body } = {}) => {
					if(error) {
						callback('Unable to connect to weather service!', undefined);
					} else if(body.error) {
						callback('Unable to find location!', undefined);
					} else {
						const data = {
							temperature : body.current.temperature,
							feelslike : body.current.feelslike
						}
						callback(undefined, data);
					}
				});
			};
			
			module.exports = forecast;