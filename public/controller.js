
var testModelDao = new Dao("TestModel");

var uniqueListOptions = ["option 1", "option 2", "option 3"];

var multipleListOptions = ["flag 1", "flag 2", "flag 3"];

$(appendComponentsToScreen);

/**
Initiates the screen with the form components.
*/
function appendComponentsToScreen() {
	appendNumericField("Id:", "id");
	appendTextField("Description:", "description");
	appendBooleanField("Checked", "checked");
	appendUniqueList("Option:", "option", uniqueListOptions);
	appendMultipleList("Flags:", "flags", multipleListOptions);
}

function appendComponentToForm(component) {
	$("#form").append(component);
}

function appendLabelAndComponent(label, component) {
	appendComponentToForm($("<label></label>").attr("for", component.attr("id")).text(label));
	appendComponentToForm(component);
}

function appendNumericField(label, id) {
	appendLabelAndComponent(label, $("<input></input>").attr("type", "number").attr("id", id));
}

function appendTextField(label, id) {
	appendLabelAndComponent(label, $("<input></input>").attr("type", "text").attr("id", id));
}

function appendDateField(label, id) {
}

function appendTimeField() {
}

function appendBooleanField(label, id) {
	appendLabelAndComponent(label, $("<input></input>").attr("type", "checkbox").attr("id", id));
}

function appendUniqueList(label, id, options) {
	appendList(label, id, options, "radio");
}

function appendMultipleList(label, id, options) {
	appendList(label, id, options, "checkbox");
}

function appendList(label, id, options, typeAttr) {
	
	var controlGroup = $("<fieldset></fieldset>").attr("data-role", "controlgroup");
	controlGroup.append($("<legend></legend>").text(label));

	for (i=0; i<options.length; i++) {
		var optionId = getItemId(id, i);
		var item = $("<input></input>").attr("type", typeAttr).attr("value", options[i]).attr("id", optionId).attr("name", id);
		controlGroup.append(item);
		controlGroup.append($("<label></label>").attr("for", optionId).text(options[i]));
	}
	
	appendComponentToForm(controlGroup);
}

/**
Returns the ID of the list item component.
*/
function getItemId(listId, itemIndex) {
	return listId + "_item_" + itemIndex;
}

/**
Creates a new record using the values of the components.
*/
function create() {
	testModelDao.create(createModel());
	clearFields();
}

/**
Loads a record and fill the screen components.
*/
function retrieveById() {
	var id = $("#id").val();

	var retrievedRecord = testModelDao.retrieveById(id);
	
	if (retrievedRecord == null) {
		clearFieldsButId();
		alert("Not found!");
	} else {
		fillFields(retrievedRecord);
	}
}

/**
Show the list with the saved records.
*/
function list() {
	var recordsHtml = "";
	var records = testModelDao.retrieveAll();
	if (records.length > 0) {
		for (i=0; i<records.length; i++) {
			jsonString = JSON.stringify(records[i]);
			recordsHtml += jsonString + "<br/>";
		}
		showRecordsList(recordsHtml);
	} else {
		hideRecordsList();
	}
}

/**
Updates the record using the values of the components.
*/
function updateById() {
	testModelDao.update(createModel());
}

/**
Deletes the record.
*/
function deleteById() {
	testModelDao.del(createModel());
	clearFields();
	hideRecordsList();
}

/**
Deletes all records.
*/
function deleteAll() {
	testModelDao.deleteAll();
	clearFields();
	hideRecordsList();
}

/**
Create and returns a new instance of TestModel with the values of
the screen components.
*/
function createModel() {
	var model = new TestModel();
	model.id = $("#id").val();
	model.description = $("#description").val();
	model.checked = $("#checked").attr("checked");
	model.option = null;
	model.flags = [];
	
	for (i=0; i<uniqueListOptions.length; i++) {
		var itemId = getItemId("option", i);
		if ($("#"+itemId).attr("checked")) {
			model.option = i;
			break;
		}
	}
	
	for (i=0; i<multipleListOptions.length; i++) {
		var itemId = getItemId("flags", i);
		if ($("#"+itemId).attr("checked")) {
			model.flags.push(i);
		}
	}
	return model;
}

/**
Fill the screen components with the values of the TestModel object.
*/
function fillFields(model) {
	clearListFields();
	
	$("#id").val(model.id);
	$("#description").val(model.description);
	$("#checked").attr("checked", model.checked);
	
	if (model.option != null) {
		var itemId = getItemId("option", model.option);
		$("#"+itemId).attr("checked", true);
	}
	for (i=0; i<model.flags.length; i++) {
		var itemId = getItemId("flags", model.flags[i]);
		$("#"+itemId).attr("checked", true);
	}
}

/**
Clear the values of all components of the screen.
*/
function clearFields() {
	clearFieldsButId();
	$("#id").val("");
}

/**
Clear the values of all components of the screen but the ID component.
*/
function clearFieldsButId() {
	$("#description").val("");
	$("#checked").attr("checked", false);
	clearListFields();
}

/**
Clear the selected values of the list components of the screen.
*/
function clearListFields() {
	for (i=0; i<uniqueListOptions.length; i++) {
		var itemId = getItemId("option", i);
		$("#"+itemId).attr("checked", false);
	}
	for (i=0; i<multipleListOptions.length; i++) {
		var itemId = getItemId("flags", i);
		$("#"+itemId).attr("checked", false);
	}
}

/**
Updates and show the records list component with the html content.
*/
function showRecordsList(html) {
	$("#list").html(html);
	$("#listDiv").show();
}

/**
Hides the records list component.
*/
function hideRecordsList() {
	$("#list").html("");
	$("#listDiv").hide();
}

/**
Request the geolocation to show in the screen components.
*/
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
