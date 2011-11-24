
var genericObjectModelDao = new Dao("genericObjectModel");

function createJson() {
	return {"id": $("#id").val(), "description": $("#description").val()};
}

function create() {
	var jsonObject = createJson();
	genericObjectModelDao.create(jsonObject);
	clearFields();
}

function retrieveById() {
	var id = $("#id").val();

	var retrievedRecord = genericObjectModelDao.retrieveById(id);
	
	if (retrievedRecord == null) {
		clearFieldsButId();
		alert("Not found!");
	} else {
		fillFields(retrievedRecord);
	}
}

function list() {
	var recordsHtml = "";
	var records = genericObjectModelDao.retrieveAll();
	if (records.length > 0) {
		for (i=0; i<records.length; i++) {
			recordsHtml += records[i].description + "(" + records[i].id + ")<br/>";
		}
		showRecordsList(recordsHtml);
	} else {
		hideRecordsList();
	}
}

function updateById() {
	genericObjectModelDao.update(createJson());
}

function deleteById() {
	genericObjectModelDao.del(createJson());
	clearFields();
	hideRecordsList();
}

function deleteAll() {
	genericObjectModelDao.deleteAll();
	clearFields();
	hideRecordsList();
}

function fillFields(genericModelObject) {
	$("#id").val(genericModelObject.id);
	$("#description").val(genericModelObject.description);
}

function clearFields() {
	clearFieldsButId();
	$("#id").val("");
}

function clearFieldsButId() {
	$("#description").val("");
}

function showRecordsList(html) {
	$("#list").html(html);
	$("#listDiv").show();
}

function hideRecordsList() {
	$("#list").html("");
	$("#listDiv").hide();
}

function readGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
	}
}

function onGeolocationSuccess(position) {
	$("#latitude").val(position.coords.latitude);
	$("#longitude").val(position.coords.longitude);
}

function onGeolocationError(message) {
	alert(message);
}
