
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
	
	this.update = function(record) {
		var json = this._loadJson();
		
		for (i=0; i<json.records.length; i++) {
			if (json.records[i].id == record.id) {
				json.records[i] = record;
			}
		}
		this._saveJson(json);
	}
	
	this.delete = function(record) {
		var json = this._loadJson();
		
		for (i=0; i<json.records.length; i++) {
			if (json.records[i].id == record.id) {
				json.records.splice(i, 1);
				i--;
			}
		}
		this._saveJson(json);
	}

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
