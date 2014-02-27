var Ti;
var screenwidth = Ti.Platform.displayCaps.platformWidth;
var screenheight = Ti.Platform.displayCaps.platformHeight;


Titanium.UI.setBackgroundColor('#000');

Ti.UI.iPhone.hideStatusBar();

var guestlist = "[{\"title\":\"Ms\",\"firstname\":\"Hannah\",\"lastname\":\"Dix\",\"checkin\":\"24-02-2014 14:00:00\",\"checkout\":\"04-03-2014 12:00:00\",\"agent\":\"Wotif.com\",\"flight\":\"SINGAPORE AIRLINES SQL 11\",\"checkintime\":\"2014-02-09 17:16:13\"},{\"title\":\"Mr\",\"firstname\":\"Ravil\",\"lastname\":\"Shagaleev\",\"checkin\":\"2014-02-14\",\"checkout\":\"2014-02-18\",\"agent\":\"Navigator Indonesia\",\"flight\":\"SINGAPORE AIRLINES SQL 32\",\"checkintime\":\"2014-02-09 01:52:50\"},{\"title\":\"Mr and Mrs\",\"firstname\":\"Evgeny Lidia\",\"lastname\":\"Samokhin\",\"checkin\":\"2014-02-18\",\"checkout\":\"2014-02-22\",\"agent\":\"Navigator Indonesia\",\"flight\":\"AMIRATE ARAB AA 78\",\"checkintime\":\"2014-02-09 13:44:17\"},{\"title\":\"Mr\",\"firstname\":\"Benjamin Ing Kiat\",\"lastname\":\"Koh\",\"checkin\":\"2014-02-17\",\"checkout\":\"2014-02-21\",\"agent\":\"Gullivers Travel Associates\",\"flight\":\"LION AIR JT 89\",\"checkintime\":\"2014-02-09 06:53:31\"},{\"title\":\"Mr\",\"firstname\":\"Walter\",\"lastname\":\"Sobotta\",\"checkin\":\"2014-02-14\",\"checkout\":\"2014-02-17\",\"agent\":\"Dertour GmbH & Co, KG\",\"flight\":\"SINGAPORE AIRLINES SQL 32\",\"checkintime\":\"2014-02-09 22:17:14\"},{\"title\":\"Mr and Mrs\",\"firstname\":\"Yukio Hitomi\",\"lastname\":\"Yamane\",\"checkin\":\"2014-02-17\",\"checkout\":\"2014-02-20\",\"agent\":\"HIS (Harum Indah Sari)\",\"flight\":\"LION AIR JT 89\",\"checkintime\":\"2014-02-09 19:38:25\"},{\"title\":\"Mr\",\"firstname\":\"Mark\",\"lastname\":\"Fox\",\"checkin\":\"2014-02-17\",\"checkout\":\"2014-02-22\",\"agent\":\"Expedia.Com\",\"flight\":\"GARUDA INDONESIA GA 43\",\"checkintime\":\"2014-02-09 23:26:31\"},{\"title\":\"Mr and Mrs\",\"firstname\":\"Tim Fransisca\",\"lastname\":\"Cordts\",\"checkin\":\"2014-02-16\",\"checkout\":\"2014-02-20\",\"agent\":\"Airtours Business Unit Luxury Brand Air\",\"flight\":\"GARUDA INDONESIA GA 43\",\"checkintime\":\"2014-02-09 20:03:27\"},{\"title\":\"Mr\",\"firstname\":\"Lee Jung Wan\",\"lastname\":\"Lee Jung Wan\",\"checkin\":\"2014-02-17\",\"checkout\":\"2014-02-20\",\"agent\":\"HNM KOREA\",\"flight\":\"AMIRATE ARAB AA 78\",\"checkintime\":\"2014-02-09 17:44:48\"},{\"title\":\"Mr\",\"firstname\":\"Kevin\",\"lastname\":\"Etherington\",\"checkin\":\"2014-02-13\",\"checkout\":\"2014-02-16\",\"agent\":\"Individual Hotel Web Site (0%\",\"flight\":\"LION AIR JT 89\",\"checkintime\":\"2014-02-09 21:38:38\"},{\"title\":\"Mr and Mrs\",\"firstname\":\"Woan Jiuan\",\"lastname\":\"Choong\",\"checkin\":\"2014-02-15\",\"checkout\":\"2014-02-18\",\"agent\":\"Flight Centre\",\"flight\":\"BRITIES BA 99\",\"checkintime\":\"2014-02-09 04:53:18\"},{\"title\":\"Mr\",\"firstname\":\"Bernard\",\"lastname\":\"Tarroza\",\"checkin\":\"2014-02-18\",\"checkout\":\"2014-02-22\",\"agent\":\"Google Usa Search Core\",\"flight\":\"AMIRATE ARAB AA 78\",\"checkintime\":\"2014-02-09 23:36:27\"},{\"title\":\"Mr and Mrs\",\"firstname\":\"Toru Sayaka\",\"lastname\":\"Yamauchi\",\"checkin\":\"2014-02-17\",\"checkout\":\"2014-02-20\",\"agent\":\"Rama Tours\",\"flight\":\"QANTAS AIRLINES QAL 88\",\"checkintime\":\"2014-02-09 07:56:31\"}]";
guestlist = JSON.parse(guestlist);

Ti.include('cs/cs.js');
Ti.include('cs/function.js');
Ti.include('cs/datetime.js');
Ti.include('ui/topmenuWindow.js');
Ti.include('ui/calendarWindow.js');
Ti.include('ui/addWindow.js');
Ti.include('ui/assignWindow.js');
Ti.include('ui/firstView.js');

Bali.GuestRoom = null;
Bali.GuestName = null;
Bali.GuestID = null;

