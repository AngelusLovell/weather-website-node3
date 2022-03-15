			
			const request = require('request');
			
			const geocode = (address, callback) => {
				const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYW5nZWx1cy1sb3ZlbGwiLCJhIjoiY2wwa29zMHZtMG1lbjNicXRzdjlzdTNkMCJ9.aunN42FcnA5bZHpMqZLZtQ&limit=1';
				
				request({ url, json: true }, (error, { body } = {}) => {
					if(error) {
						callback('Unable to connect to location services!', undefined);
					} else if(body.features.length === 0) {
						callback('Unable to find location. Try another search!', undefined);
					} else {
						const data = {
							longitude: body.features[0].center[1],
							latitude: body.features[0].center[0],
							location: body.features[0].place_name
						};
						callback(undefined, data);
					}
				});
			};
			
			module.exports = geocode;