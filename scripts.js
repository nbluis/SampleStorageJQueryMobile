
function save()
{
	localStorage.textValue = $("#text").val();
}

function load()
{
	$("#text").val(localStorage.textValue);
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
