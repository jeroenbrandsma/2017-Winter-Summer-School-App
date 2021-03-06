/**
 *
 * @param {String} requestType
 * @param $event
 * @param {function} callback
 */

const httpRequest = function (requestType, $event, callback) {
	const requestToString = function (requestType) {
		switch (requestType) {
		case "post":
			return "add";
		case "put" :
			return "edit";
		case "get" :
			return "retrieve";
		default :
			return requestType;
		}
	};


	const data = $($event.target).data();
	const entityType = data.entityType;
	delete data.reload;
	delete data.entityType;

	if (requestType === "get" || confirm("Are you sure you want to " + requestToString(requestType) + " this " +
			entityType + "?")) {
		$.ajax({
			url: "/API/" + entityType,
			type: requestType,
			data: data,
			success: function (result) {
				if (callback) {
					callback();
				} else {
					location.reload();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}

};
