class Time
{
    constructor()
    {
        this.alerts = [];
        this.createAlertFunction = null;

        // DOM
        this.dateLabel = document.getElementById("main-date");
        this.clockLabel = document.getElementById("main-clock");
        this.weekdayLabel = document.getElementById("main-weekday");
        this.weekLabel = document.getElementById("main-week");

        this.weekdays = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
        this.months = ["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."];

        this.dateFormat = "% % %";
        this.clockFormat = "%:%:%";
        this.weekdayFormat = "%";
        this.weekFormat = "vecka %";

        this.resetTime = [4, 0]; // Reset occurs at 4:00

        this.interval = setInterval(this.count.bind(this), 1000);
        this.count();
    }

    loadAlerts(alerts, createAlertFunction)
    {
        this.alerts = alerts;
        this.createAlertFunction = createAlertFunction;
    }

    count()
    {
        // Update the time
        var now = new Date();

        // Check alerts
        for (var alert of this.alerts)
        {
            if (alert.h == now.getHours() && alert.m == now.getMinutes() && now.getSeconds() == 0)
                this.createAlertFunction(alert.message);
        }

        // Check reset time
        if (this.resetTime[0] == now.getHours() && this.resetTime[1] == now.getMinutes() && now.getSeconds() == 0)
            debugPrint("reset!");

        var date = String.format(
            this.dateFormat,
            now.getDate().toString(),
            this.months[now.getMonth()],
            now.getFullYear().toString()
        );
        
        var clock = String.format(
            this.clockFormat,
            now.getHours().toString().padStart(2, "0"),
            now.getMinutes().toString().padStart(2, "0"),
            now.getSeconds().toString().padStart(2, "0")
        );

        var weekday = String.format(
            this.weekdayFormat,
            this.weekdays[now.getDay()]
        );

        // Get the current week nr.
        now.setHours(0, 0, 0);
        now.setDate(now.getDate() + 4 - (now.getDay() || 7));
        var w = Math.ceil((((now - new Date(now.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);

        var week = String.format(
            this.weekFormat,
            w
        );

        // Commit to DOM
        this.dateLabel.innerHTML = date;
        this.clockLabel.innerHTML = clock;
        this.weekdayLabel.innerHTML = weekday;
        this.weekLabel.innerHTML = week;
    }

}