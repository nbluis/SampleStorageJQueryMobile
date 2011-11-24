
var genericObjectModelDao = new Dao("genericObjectModel");

function create()
{
	var jsonObject = {"id": $("#id").val(), "description": $("#description").val()};
	genericObjectModelDao.create(jsonObject);
}

function retrieveById()
{
	var id = $("#id").val();

	var retrievedRecord = genericObjectModelDao.retrieveById(id);
	
	if (retrievedRecord == null)
	{
		clearFieldsButId();
		alert("Not found!");
	}
	else
	{
		fillFields(retrievedRecord);
	}
}

function deleteAll()
{
	genericObjectModelDao.deleteAll();
	clearFields();
}

function fillFields(genericModelObject)
{
	$("#id").val(genericModelObject.id);
	$("#description").val(genericModelObject.description);
}

function clearFields()
{
	clearFieldsButId();
	$("#id").val("");
}

function clearFieldsButId()
{
	$("#description").val("");
}

function readGeolocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
	}
}

function onGeolocationSuccess(position)
{
	$("#latitude").val(position.coords.latitude);
	$("#longitude").val(position.coords.longitude);
}

function onGeolocationError(message)
{
	alert(message);
}
