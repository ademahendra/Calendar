(function() {	
	/**
	 * Emulates the PHP strtotime() function in Javascript.
	 *
	 * @link http://phpjs.org/functions/strtotime:554
	 * @link http://www.php.net/strtotime
	 */
	Bali.datetime.strtotime = function (str, now) {
	    var i, match, s, strTmp = '',
	        parse = '';
	    strTmp = str;
	    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
	    strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
	    if (strTmp == 'now') {
	        return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
	    } else if (!isNaN(parse = Date.parse(strTmp))) {
	        return (parse / 1000);
	    } else if (now) {
	        now = new Date(now * 1000); // Accept PHP-style seconds
	    } else {
	        now = new Date();
	    }
	    strTmp = strTmp.toLowerCase();
	    var __is = {
	        day: {
	            'sun': 0,
	            'mon': 1,
	            'tue': 2,
	            'wed': 3,
	            'thu': 4,
	            'fri': 5,
	            'sat': 6
	        },
	        mon: {
	            'jan': 0,
	            'feb': 1,
	            'mar': 2,
	            'apr': 3,
	            'may': 4,
	            'jun': 5,
	            'jul': 6,
	            'aug': 7,
	            'sep': 8,
	            'oct': 9,
	            'nov': 10,
	            'dec': 11
	        }
	    };
	    var process = function (m) {
	            var ago = (m[2] && m[2] == 'ago');
	            var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);
	
	            switch (m[0]) {
	            case 'last':
	            case 'next':
	                switch (m[1].substring(0, 3)) {
	                case 'yea':
	                    now.setFullYear(now.getFullYear() + num);
	                    break;
	                case 'mon':
	                    now.setMonth(now.getMonth() + num);
	                    break;
	                case 'wee':
	                    now.setDate(now.getDate() + (num * 7));
	                    break;
	                case 'day':
	                    now.setDate(now.getDate() + num);
	                    break;
	                case 'hou':
	                    now.setHours(now.getHours() + num);
	                    break;
	                case 'min':
	                    now.setMinutes(now.getMinutes() + num);
	                    break;
	                case 'sec':
	                    now.setSeconds(now.getSeconds() + num);
	                    break;
	                default:
	                    var day;
	                    if (typeof (day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
	                        var diff = day - now.getDay();
	                        if (diff === 0) {
	                            diff = 7 * num;
	                        } else if (diff > 0) {
	                            if (m[0] == 'last') {
	                                diff -= 7;
	                            }
	                        } else {
	                            if (m[0] == 'next') {
	                                diff += 7;
	                            }
	                        }
	                        now.setDate(now.getDate() + diff);
	                    }
	                    break;
	                }
	                break;
	            default:
	                if (/\d+/.test(m[0])) {
	                    num *= parseInt(m[0], 10);
	                    switch (m[1].substring(0, 3)) {
	                    case 'yea':
	                        now.setFullYear(now.getFullYear() + num);
	                        break;
	                    case 'mon':
	                        now.setMonth(now.getMonth() + num);
	                        break;
	                    case 'wee':
	                        now.setDate(now.getDate() + (num * 7));
	                        break;
	                    case 'day':
	                        now.setDate(now.getDate() + num);
	                        break;
	                    case 'hou':
	                        now.setHours(now.getHours() + num);
	                        break;
	                    case 'min':
	                        now.setMinutes(now.getMinutes() + num);
	                        break;
	                    case 'sec':
	                        now.setSeconds(now.getSeconds() + num);
	                        break;
	                    }
	                } else {
	                    return false;
	                }
	                break;
	            }
	            return true;
	        };
	
	    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
	    if (match !== null) {
	        if (!match[2]) {
	            match[2] = '00:00:00';
	        } else if (!match[3]) {
	            match[2] += ':00';
	        }
	        s = match[1].split(/-/g);
	        for (i in __is.mon) {
	            if (__is.mon[i] == s[1] - 1) {
	                s[1] = i;
	            }
	        }
	        s[0] = parseInt(s[0], 10);
	        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
	        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
	    }
	
	    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';
	    match = strTmp.match(new RegExp(regex, 'gi')); 
	    if (match === null) {
	        return false;
	    }
	    for (i = 0; i < match.length; i++) {
	        if (!process(match[i].split(' '))) {
	            return false;
	        }
	    }
	    return (now.getTime() / 1000);
	};
	
	Bali.datetime.prettyDate = function (time) {
	    var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    var date = new Date(time * 1000),
	        diff = (((new Date()).getTime() - date.getTime()) / 1000),
	        day_diff = Math.floor(diff / 86400);
	    if (isNaN(day_diff) || day_diff < 0) {
	        return '';
	    }
	    if (day_diff >= 31) {
	        var date_year = date.getFullYear();
	        var month_name = monthname[date.getMonth()];
	        var date_month = date.getMonth() + 1;
	        if (date_month < 10) {
	            date_month = "0" + date_month;
	        }
	        var date_monthday = date.getDate();
	        if (date_monthday < 10) {
	            date_monthday = "0" + date_monthday;
	        }
	        return date_monthday + " " + month_name + " " + date_year;
	    }
	    return day_diff === 0 && (
	    diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && "about " + Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " week" + ((Math.ceil(day_diff / 7)) == 1 ? "" : "s") + " ago";
	};
	
	Bali.datetime.getTwitterInterval = function (strDateTime) {
	    return Bali.datetime.prettyDate(Bali.datetime.strtotime(strDateTime));
	};
	Bali.datetime.NormalDate = function (indate) {
		if(indate !== "")
		{
			var listdate = indate.split('-');
				return listdate[2]+' '+Bali.datetime.monthToNameSort(listdate[1])+' '+listdate[0];
		}
		return '';
	};
	
	Bali.datetime.dayToName = function (day) {
	    switch (day) {
	    case 0:
	        return 'Sunday';
	    case 1:
	        return 'Monday';
	    case 2:
	        return 'Tuesday';
	    case 3:
	        return 'Wednesday';
	    case 4:
	        return 'Thursday';
	    case 5:
	        return 'Friday';
	    case 6:
	        return 'Saturday';
	    }
	};
	Bali.datetime.dayToNamesort = function (day) {
	    switch (day) {
	    case 0:
	        return 'Sun';
	    case 1:
	        return 'Mon';
	    case 2:
	        return 'Tue';
	    case 3:
	        return 'Wed';
	    case 4:
	        return 'Thu';
	    case 5:
	        return 'Fri';
	    case 6:
	        return 'Sat';
	    }
	};
	
	Bali.datetime.monthToName = function (month) {
	    switch (month) {
	    case 1:
	        return 'January';
	    case 2:
	        return 'February';
	    case 3:
	        return 'March';
	    case 4:
	        return 'April';
	    case 5:
	        return 'May';
	    case 6:
	        return 'June';
	    case 7:
	        return 'July';
	    case 8:
	        return 'August';
	    case 9:
	        return 'September';
	    case 10:
	        return 'October';
	    case 11:
	        return 'November';
	    case 12:
	        return 'December';
	    }
	};
	Bali.datetime.monthToNameSort = function (month) {
		Ti.API.info('MONTH:'+month);
		//   var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    switch (month) {
	    case '01':
	        return 'Jan';
	    case '02':
	        return 'Feb';
	    case '03':
	        return 'Mar';
	    case '04':
	        return 'Apr';
	    case '05':
	        return 'May';
	    case '06':
	        return 'Jun';
	    case '07':
	        return 'Jul';
	    case '08':
	        return 'Aug';
	    case '09':
	        return 'Sep';
	    case '10':
	        return 'Oct';
	    case '11':
	        return 'Nov';
	    case '12':
	        return 'Dec';
	    }
	};
	Bali.datetime.cleanDate = function (date) {
	    var label;
	    switch (date.getDate()) {
	    case 1:
	        label = 'st';
	        break;
	    case 2:
	        label = 'nd';
	        break;
	    default:
	        label = 'th';
	    }
	
	    return Bali.datetime.dayToName(date.getDay()) + ', ' + Bali.datetime.monthToName(date.getMonth() + 1) + ' ' + date.getDate() + label;
	};
	
	Bali.datetime.cleanDateiphone = function (date) {
	    var label;   
	    return Bali.datetime.dayToNamesort(date.getDay()) + '\n' + Bali.datetime.monthToName(date.getMonth() + 1) + ' ' + date.getDate() + ', '+date.getFullYear();//+'  '+date.getHours()+':'+date.getMinutes();
	};
	
	Bali.datetime.dateHeaderCalendar = function (date) {
	    var label;
	    return date.getDate() +' '+ Bali.datetime.dayToName(date.getDay());// + ', '+date.getFullYear();//+'  '+date.getHours()+':'+date.getMinutes();
	};
	
	Bali.datetime.shortDateiPad = function (date) {
	    var label;
	   
	    return Bali.datetime.monthToName(date.getMonth() + 1) + ' ' + date.getDate() + ', '+date.getFullYear();
	};
	
	Bali.datetime.cleanTime = function (time) {
	    var shortTime = time.substr(11, 5);
	    var mins = shortTime.substr(2, 5);
	    var hour = parseFloat(shortTime.slice(0, 2));
	    var ampm = 'AM';
	
	    // Assume that 12 means noon, not midnight.
	    if (hour == 12) {
	        ampm = 'PM';
	    } else if (hour >= 12) {
	        hour -= 12;
	        ampm = 'PM';
	    }
	    return hour + "" + mins + "" + ampm;
	};
	
	Bali.datetime.formatTime = function (hour) {
	    var ampm = 'AM';
	
	    // Assume that 12 means noon, not midnight.
	    
	    if (hour == 12) {
	        ampm = 'PM';
	    } else if (hour >= 12) {
	        hour -= 12;
	        ampm = 'PM';
	    }
	    
	    if(hour == 0){
	    	hour = 12;
	    }
	    return hour + " " + ampm;
	};
	
	Bali.datetime.createFromMysql = function(mysql_string)
	{ 
   		if(typeof mysql_string === 'string')
   		{
      		var t = mysql_string.split(/[- :]/);

      		//when t[3], t[4] and t[5] are missing they defaults to zero
      		return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
   		}

   return null;   
	};
	
	Bali.datetime.twoDigits = function(d) {
		
    	if(0 <= d && d < 10) return "0" + d.toString();
    	if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    	return d.toString();
	};
	
	Bali.datetime.toMysqlFormat = function(newdate) {
    
    	return newdate.getUTCFullYear() + "-" + Bali.datetime.twoDigits(1 + newdate.getUTCMonth()) + "-" + Bali.datetime.twoDigits(newdate.getUTCDate()) + " " + Bali.datetime.twoDigits(newdate.getUTCHours()) + ":" + Bali.datetime.twoDigits(newdate.getUTCMinutes()) + ":" + Bali.datetime.twoDigits(newdate.getUTCSeconds());
	};
	
})();
	