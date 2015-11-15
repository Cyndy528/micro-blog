$(function() {

	//compile handlebars templates
	var source = $('#pies-template').html();
	var template = Handlebars.compile(source);

	// base API Route
	var baseUrl = "/api/pies";

	// array to hold all pie data from API
	var allPies = [];

	//element to display list from pies
	var $pieslist =$('#pies-list'); 

	// form to create new pie
	var $createPie = $('#create-pie'); 

	//array of test data
	// var pie = [
	// 	{fruitPie: 'Bosenberry'}, 
	// 	{fruitPie: 'Apple'}, 
	// 	{fruitPie: 'Banana Cream Pie'},
	// 	{savoryPie: 'Chicken Pot Pie'},
	// 	{savoryPie: 'Spinach and Cheddar Tart'}, 
	// 	{savoryPie: "Shepherd's Pie"},
	// 	{internationalPie: 'Chicken Pot Pie'},
	// 	{internationalPie: 'Aloo Pie'}, 
	// 	{internationalPie: 'Linzertorte'}
	// ];

//helper function to render all pies to view
var render = function() {
	//empty existing pies
	$pieslist.empty(); 

	//pass 'allPies' into the template function
	var piesHtml = template({ pies: allPies}); 

	//append html to the view
	$pieslist.append(piesHtml); 
};

// GET all pies on page load
$.get(baseUrl, function (data){
	console.log(data); 

	//set 'allPies' to pie data from API
	allPies = data.pies;

	// render all pies to view
	render (); 
}); 

//listen for submit on form
$createPie.on('submit', function (event){
	event.preventDefault(); 

	//serialize form data
	var newPie = $(this).serialize(); 

	//POST request to create new pie
	$.post(baseUrl, newPie, function(data){
		console.log(data);

	//add new pie to 'allPies'
	allPies.push(data); 

	//render all pies to view
	render(); 
	}); 

	//reset the form 
	$createPie[0].reset(); 
	$createPie.find('input').first().focus(); 
	}

	//add event-handlers to pies for updating/deleting
	$piesList

	//for update: submit event on '.update-pie' form 
	.on("submit", ".update-pie", function (event){
		event.preventDefault(); 

	//find the pie's id 
	var pieId = $(this).closest('.pie').attr('data-id'); 

	//find the pie to update by its id
	var pieToUpdate = allPies.filter(function (pie){
		return pie._id == pieId; 
	}) [0]; 

	//serialize form data
	var updatedPie = $(this).serialize(); 

	//PUT request to update pie
	$.ajax({
		type: 'PUT', 
		url: baseUrl + '/' + pieId, 
		data: updatedPie, 
		success: function(data){
			//replace pie to update with new data
			allPies.splice(allPies.indexOf(pieToUpdate), 1, data); 

			//render all pies to view
			render(); 
		}
	});
	});

//for delete: click event on '.delete-pie' button
.on('click', '.delete-pie', function (event){
	event.preventDefault(); 

	//find pie id
	var pieId = $(this).closest('.pie').attr('data-id'); 

	//find the pie to delete by its id
	var pieToDelete = allPies.filter(function (pie){
		return pie._id == pieId; 
	}) [0]; 

	//DELETE request to delete pie
	$.ajax ({
		type: 'DELETE', 
		url: baseUrl + '/' + pieId, 
		success: function(data) {
			//remove deleted pie from all pies
			allPies.splice(allPies.indexOf(pieToDelete), 1); 
		
		//render all pies to view
		render(); 
		}
	}); 
	}); 
}); 	





















