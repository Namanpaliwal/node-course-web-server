const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();






// if we want to include particular part of web page in 
//more than one page like footer then we can use 
//register Partials and we had to mention in that web page
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (error)=>{
		if(error)
			console.log(error);
	});

next();
});


app.use((req, res, next) =>{
	res.render('maintaince.hbs')

});

// if we mention the exact file we want we we do this 
// i.e if we want help.html we we use this as help.html 
//is in public dir so we are giving absolute path
app.use(express.static(__dirname + '/public'));
// we have written this here so that first app.use(....,  next get executed)

app.get('/', (req, res)=>{
	res.render('home.hbs',{
		companyName: 'pixere',
		year: new Date().getFullYear()
	});

});

app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		aboutPage: 'this is about the page',
		currentYear: new Date().getFullYear()
	});
});

/*app.get('/help', (req, res)=>{
	res.render(help.html);
});
*/
app.listen(3000);