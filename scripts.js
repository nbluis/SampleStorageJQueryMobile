
function save()
{
	localStorage.textValue = $("#text").val();
}

function load()
{
	$("#text").val(localStorage.textValue);
}
