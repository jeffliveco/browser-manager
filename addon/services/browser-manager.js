import Ember from 'ember';
/*
* @author Jefferson Ortiz
* @version 1.0
*/
export default Ember.Service.extend({
	// variable set o get browser name
	browserName:'',
	// variable set o get browser version
	browserVersion:'',
	// variable set o get all browser data
	browser:null,
	//
	osName:'',
	//
	osVersion:'',
	//
	clientStrings: [
		{s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
		{s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
		{s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
		{s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
		{s:'Windows Vista', r:/Windows NT 6.0/},
		{s:'Windows Server 2003', r:/Windows NT 5.2/},
		{s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
		{s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
		{s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
		{s:'Windows 98', r:/(Windows 98|Win98)/},
		{s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
		{s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
		{s:'Windows CE', r:/Windows CE/},
		{s:'Windows 3.11', r:/Win16/},
		{s:'Android', r:/Android/},
		{s:'Open BSD', r:/OpenBSD/},
		{s:'Sun OS', r:/SunOS/},
		{s:'Linux', r:/(Linux|X11)/},
		{s:'iOS', r:/(iPhone|iPad|iPod)/},
		{s:'Mac OS X', r:/Mac OS X/},
		{s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
		{s:'QNX', r:/QNX/},
		{s:'UNIX', r:/UNIX/},
		{s:'BeOS', r:/BeOS/},
		{s:'OS/2', r:/OS\/2/},
		{s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
	],
	// default constructor
	init(){
		// parent initialice
		this._super(...arguments);
		// set variable browser
		this.set('browser', navigator);
		// call detect browser
		this.detectBrowser();
	},
	// function to detect name and version browser
	detectBrowser(){
		// get user agent browser
		let ua = this.get('browser').userAgent;
		// get array browser data
		let browser = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		// set name
		this.set('browserName', browser[1]);
		// set version
		this.set('browserVersion', browser[2]);
		// system
		for (var id in this.get('clientStrings')) {
			var cs = this.get('clientStrings')[id];
			if (cs.r.test(ua)) {
				this.set('osName', cs.s);
				break;
			}
		}

		if (/Windows/.test(this.get('osName'))) {
			this.set('osVersion', /Windows (.*)/.exec(this.get('osName'))[1]);
			this.set('osName', 'Windows');
		}

		switch (this.get('osName')) {
			case 'Mac OS X':
			this.set('osVersion', /Mac OS X (10[\.\_\d]+)/.exec(ua)[1]);
			break;

			case 'Android':
			this.set('osVersion', /Android ([\.\_\d]+)/.exec(ua)[1]);
			break;

			case 'iOS':
			let nVer = navigator.appVersion;
			let iosV = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
			iosV = iosV[1] + '.' + iosV[2] + '.' + (iosV[3] | 0);
			this.set('osVersion', iosV);
			break;
		}
	}
});
