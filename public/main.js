$(function() {

	//compile handlebars templates
	var source1 = $('#fruitpies-template').html(); 
	var source2 = $('#savorypies-template').html();
	var source3 = $('#internationalpies-template').html();

	var template = Handlebars.compile(source);

	//array of test data
	var allFruitPies = [
		{fruitPie: 'Bosenberry'}, 
		{fruitPie: 'Apple'}, 
		{fruitPie: 'Banana Cream Pie'}
	];

	//array of test data
	var allSavoryPies = [
		{savoryPie: 'Chicken Pot Pie'},
		{savoryPie: 'Spinach and Cheddar Tart'}, 
		{savoryPie: "Shepherd's Pie"}
	];

	//array of test data
	var allInternationalPies = [
		{internationalPie: 'Chicken Pot Pie'},
		{internationalPie: 'Aloo Pie'}, 
		{internationalPie: 'Linzertorte'}
	];

  // AJAX call to GET all fruitPies
  $.get('/api/fruitpies', function (data) {
    allFruitPies = data.fruitPies;
    
    var fruitPiesHtml = template({ fruitPies: allFruitPies });
    $('#fruitPies-list').append(fruitPiesHtml);
 

  // AJAX call to GET all savoryPies
  $.get('/api/savory', function (data) {
    allSavoryPies = data.savoryPies;
    
    var savoryPiesHtml = template({ savoryPies: allsavoryPies });
    $('#savoryPies-list').append(savoryPiesHtml);


    // AJAX call to GET all internationalPies
  $.get('/api/internationalPies', function (data) {
    allInternationalPies = data.internationalPies;
    
    var internationalPiesHtml = template({ internationalPies: allinternationalPies });
    $('#internationalPies-list').append(internationalPiesHtml);
  		
  		});
	});
});

}); 



















