$(function() {

	//compile handlebars templates
	var source = $('#pies-template').html();
	var template = Handlebars.compile(source);

	//array of test data
	var allPies = [
		{fruitPie: 'Bosenberry'}, 
		{fruitPie: 'Apple'}, 
		{fruitPie: 'Banana Cream Pie'},
		{savoryPie: 'Chicken Pot Pie'},
		{savoryPie: 'Spinach and Cheddar Tart'}, 
		{savoryPie: "Shepherd's Pie"},
		{internationalPie: 'Chicken Pot Pie'},
		{internationalPie: 'Aloo Pie'}, 
		{internationalPie: 'Linzertorte'}
	];


    // AJAX call to GET all pies
  $.get('/api/pies', function (data) {
    allPies = data.pies;
    
    var piesHtml = template({ pies: allPies });
    $('#pies-list').append(piesHtml);
  		
  	});
  
}); 



















