
function create()
{
	var jsonObject = {"id": $("#id").val(), "description": $("#description").val()};
	
	var jsonAllObjects = load();
	
	if (jsonAllObjects)
	{
		jsonAllObjects.records[jsonAllObjects.records.length] = jsonObject;
	}
	else
	{
		jsonAllObjects = {"records": [jsonObject]};
	}
	
	save(jsonAllObjects);
}

function retrieveById()
{
	var id = $("#id").val();
	
	var jsonAllObjects = load();
	
	if (jsonAllObjects)
	{
		var found = false;
		
		for (i=0; i<jsonAllObjects.records.length; i++)
		{
			jsonObject = jsonAllObjects.records[i];
			
			if (jsonObject.id == id)
			{
				fillFields(jsonObject);
				found = true;
				break;
			}
		}
		
		if (!found)
		{
			clearFieldsButId();
		}
	}
	else
	{
		clearFieldsButId();
	}
}

function deleteAll()
{
	localStorage.clear();
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

function save(json)
{
	localStorage.genericModelObjects = JSON.stringify(json);
}

function load()
{
	var stringJson = localStorage.genericModelObjects;
	
	if (stringJson)
	{
		return JSON.parse(stringJson);
	}
	else
	{
		return null;
	}
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
