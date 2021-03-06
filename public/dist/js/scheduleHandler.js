/** The parsed data, and week offset: default is zero */
let result, week = 0;

function initialisePreviousButton () {
	$("#sched-getprevious").on("click", function () {
		week -= 1;
		$("#weekOffset").val(week);
		$.ajax({
			url: "/API/event?week=" + week, success: function (result) {
				if ((result = JSON.parse(result))) {
					if (result.error) {
						console.log("scheduleHandler: Request to get previous week data failed!");
						week += 1;
					} else {
						$("#scheduleModule").html(result.data);
						refreshModalAndSchedule();
					}
				}
			}
		});
	});
}

function initialiseNextButton () {
	$("#sched-getnext").on("click", function () {
		week += 1;
		$("#weekOffset").val(week);
		$.ajax({
			url: "/API/event?week=" + week, success: function (result) {
				if ((result = JSON.parse(result))) {
					if (result.error) {
						console.log("scheduleHandler: Request to get next week data failed!");
						week -= 1;
					} else {
						$("#scheduleModule").html(result.data);
						refreshModalAndSchedule();
					}
				}
			}
		});
	});
}

function refreshModalAndSchedule () {
	initialisePreviousButton();
	initialiseNextButton();
	initialiseModalOpeners();
	openTodaysSchedule();
}

function initialiseScheduleButtons () {
	initialisePreviousButton();
	initialiseNextButton();
}
