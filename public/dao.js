
function Dao(entityName) {

	this.create = function(record) {
		var json = this._loadJson();
		json.records[json.records.length] = record;
		this._saveJson(json);
	};
	
	this.retrieveById = function(id) {
		var records = this.retrieveAll();
		
		for (i=0; i<records.length; i++) {
			var record = records[i];
			
			if (record.id == id) {
				return record;
			}
		}
		
		return null;
	};
	
	this.retrieveAll = function() {
		return this._loadJson().records;
	};

	this.deleteAll = function() {
		localStorage.removeItem(entityName);
	};

	this._saveJson = function(json) {
		localStorage.setItem(entityName, JSON.stringify(json));
	};
	
	this._loadJson = function() {
		var jsonString = localStorage.getItem(entityName);
		
		if (jsonString) {
			return JSON.parse(jsonString);
		} else {
			return {"records": []};
		}
	};
}
