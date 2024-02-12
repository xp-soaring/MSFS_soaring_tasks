"use strict"

class DiscordDoc {
    constructor() {
        let dd = this;
        dd.template_str = `
SSC Task Title

#DATETIME#

**MSFS Server:** Southeast Asia

**Sim date/time:** Nov 11th 3pm local (i.e. 3pm on day we are flying)

**Max start:** 5000 Feet MSL

Distance is 300km, expected duration ~90 min

**Meet/Briefing:** #TIME#
At this time we meet in the voice chat and get ready. https://discord.com/channels/876123356385149009/876397825934626836

**Synchronized Fly:** #TIME+15#
At this time we simultaneously click the [FLY] button to sync our weather.

**Task Start:** #TIME+45#
At this time we cross the starting line and start the task.

A scenic trip out of Valparaiso, Chile.  Pilots who finish this task successfully during the event will be eligible to apply for the Silver Soaring Badge :silver:
`;
    } // end constructor()

    init() {
        let dd = this;

        dd.local_date_str = "2024-02-11";
        dd.local_time_str = "18:45";

        dd.local_datetime_str = dd.local_date_str+"T"+dd.local_time_str;

        dd.datetime_js = new Date(dd.local_datetime_str);

        console.log(dd.datetime_js.toISOString(), Math.round(dd.datetime_js.getTime()/1000));

        dd.date_el = document.getElementById("input_date");
        dd.date_el.addEventListener('change', function (){
            console.log(`date=${this.value}`);
            dd.update_datetime(dd);
        })

        dd.time_el = document.getElementById("input_time");
        dd.time_el.addEventListener('change', function (){
            console.log(`time=${this.value}`);
            dd.update_datetime(dd);
        })


        dd.date_el.valueAsDate = new Date();
        //dd.time_el.valueAsDate = new Date();

        dd.template_el = document.getElementById("discorddoc_template");
        dd.template_el.innerText = this.template_str;

        dd.display_el = document.getElementById("discorddoc_display");
        dd.output_el = document.getElementById("discorddoc_output");

        // trigger an 'update' so the display area is populated
        dd.update_datetime(dd);
    } // end init()

    // The user has changed local date or time.
    update_datetime(dd) {
        dd.local_date_str = dd.date_el.value;
        dd.local_time_str = dd.time_el.value;
        dd.local_datetime_str = dd.local_date_str+"T"+dd.local_time_str;
        dd.datetime_js = new Date(dd.local_datetime_str);
        dd.unix_timestamp_str = (dd.datetime_js.getTime()/1000).toFixed(0);

        console.log(`Local datetime: ${dd.local_datetime_str}, timestamp: ${dd.unix_timestamp_str}`);
        dd.update_output(dd);
    }

    update_output(dd)  {
        let display_str = "";
        dd.output_str = "";

        let lines = dd.template_str.split("\n");
        for (let i=0; i<lines.length; i++) {
            let display_line = lines[i];
            let output_line = lines[i];

            // Replace #DATETIME#
            display_line = dd.display_replace_datetime(display_line);
            output_line = dd.output_replace_datetime(output_line);

            // Replace #TIME...#
            display_line = dd.display_replace_time(display_line);

            display_str += display_line + "\n";
            dd.output_str += output_line + "\n";
        }
        dd.display_el.innerHTML = display_str;
    }

    // Replace #DATETIME# with e.g. "Sunday, 11 February 2024 14:00"
    display_replace_datetime(str) {
        let day_of_week = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")[dd.datetime_js.getDay()];
        let day_of_month = dd.datetime_js.getDate().toString();
        let month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December")[dd.datetime_js.getMonth()];
        let year = dd.datetime_js.getFullYear().toString();
        let time = ("0"+dd.datetime_js.getHours()).slice(-2) + ":" + ("0"+dd.datetime_js.getMinutes()).slice(-2);
        let datetime_str = day_of_week+", "+day_of_month+" "+month+" "+year+" "+time;
        return str.replace("#DATETIME#", datetime_str);
    }

    // Replace #TIME# with e.g.  "18:45"
    // Replace #TIME+15" with    "19:00"
    // Replace #TIME+1:30# with  "20:15"
    // Replace #TIME-15# with    "18:30"
    display_replace_time(str) {
        let replaced_str = str;
        let time_pos = str.indexOf("#TIME");
        while (time_pos >= 0) {
            let time_end_pos = str.indexOf("#",time_pos+1);
            let time_str = str.slice(time_pos, time_end_pos+1);
            console.log(`${time_str} between ${time_pos} and ${time_end_pos}`);

            // Check for time adjustment
            let adjust_s = 0;
            if (time_str.startsWith("#TIME+") || time_str.startsWith("#TIME-")) {
                // e.g. "#TIME+1:30#"
                // to "1:30"
                let adjust_str = time_str.slice(6,-1);
                // to ["1", "30"] i.e. hours, minutes
                let adjust_parts = adjust_str.split(":");

            }

            time_pos = str.indexOf("#TIME", time_end_pos);
        }
        return replaced_str;
    }

    output_replace_datetime(str) {
        return str.replace("#DATETIME#", "<t:"+dd.unix_timestamp_str+":F>");
    }

    get_time_str(time_str) {
        return "XXX";
    }

} // end class DiscordDoc

