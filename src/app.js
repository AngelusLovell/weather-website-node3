
			const path = require('path');
			const express = require('express');
			const hbs = require('hbs');
			const geocode = require('./utils/geocode.js');
			const forecast = require('./utils/forecast.js');
			
			const app = express();
			
			// Define path for express config
			const publicDirPath = path.join(__dirname, '../public')
			const viewsPath = path.join(__dirname, '../templates/views');
			const partialsPath = path.join(__dirname, '../templates/partials');
			
			// Setup handlebars engine and views location
			app.set('view engine', 'hbs');
			app.set('views', viewsPath);
			hbs.registerPartials(partialsPath);
			
			// Setup path for static docs for html
			app.use(express.static(publicDirPath));
			
			app.get('', (req, res) => {
				res.render('index', {
					title: 'Weather',
					name: 'Angelus Lovell'
				});
			});
			
			app.get('/about', (req, res) => {
				res.render('about', {
					title: 'About Me',
					name: 'Angelus Lovell'
				});
			});
			
			
			app.get('/help', (req, res) => {
				res.render('help', {
					title: 'help',
					name: 'Angelus Lovell',
					helpText: 'This some helpful text.'
				});
			});
			
			app.get('/weather', (req, res) => {
				if(!req.query.address) {
					return res.send({
						error: 'You must provide an address!'
					});
				}
				
				const address = req.query.address;
				geocode(address, (error, {longitude, latitude, location} = {}) => {
					if(error) {
						return res.send({ error });
					}
					
					forecast({longitude, latitude}, (error, { temperature, feelslike } = {}) => {
						if(error) {
							return res.send({ error });
						}
							
						const forecast = 'It is currently ' + temperature + 
						' degrees fehranheit.' + ' It feels like ' + feelslike + ' degrees out.';
						res.send({
							forecast,
							location,
							address
						});
					});
				});
				
			});
			
			app.get('/help/*', (req, res) => {
				res.render('404', {
					title: 404,
					name: 'Angelus Lovell',
					errorMessage: 'Help article not found'
				});
			});
			
			app.get('*', (req, res) => {
				res.render('404', {
					title: '404',
					name: 'Angelus Lovell',
					errorMessage: 'page not found'
				});
			});
			
			app.listen(3000, () => {
				console.log('Server is up on port 3000.');
			});