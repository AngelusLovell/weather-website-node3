		
		console.log('Client side javascript!');
		
		
		
		
		const weatherForm = document.querySelector('form');
		const search = document.querySelector('form input');
		const forecastLocation = document.querySelector('#forecastLocation');
		const forecastData = document.querySelector('#forecastData');
		
		weatherForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			forecastLocation.textContent = 'Loading...';
			forecastData.textContent = '';
		
			const location = search.value;
			fetch('http://localhost:3000/weather?address=' + location).then((response) => {
				response.json().then((data) => {
					if(data.error) {
						forecastLocation.textContent = data.error;
					} else {
						forecastLocation.textContent = data.location;
						forecastData.textContent = data.forecast;
					}
				});
			})
		});
		