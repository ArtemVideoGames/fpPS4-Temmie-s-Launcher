/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	emumanager.js

	This file contains all functions / variables about running main project 
	executable and game module checks.
	******************************************************************************
*/

temp_EMUMANAGER = {

	// Emulator is running
	emuRunning: !1,
	
	// Run emu
	runGame: function(){

		// Get selected game details
		const mainGameData = APP.gameList.list[APP.gameList.selectedGame];

		// If user selected a game
		if (mainGameData !== void 0){

			// Reset Error List
			APP.emuManager.emuErrorList = [];

			// Options: Clear log on emu starts
			if (APP.settings.data.clearLogOnEmuLoad === !0 && APP.emuManager.emuRunCounter !== 0){
				APP.clearLog(!0);
			}

			// If (by some reason) main emu still running, close it!
			this.killEmu(!0);

			// Set main variables
			var ebootPath = APP.gameList.list[APP.gameList.selectedGame].exe,
				emuArgs = ['-e', ebootPath],
				hList = APP.design.hackList;
			
			// Get enabled hacks
			hList.forEach(function(hackName){
				if (document.getElementById('CHECK_' + hackName).checked === !0){
					emuArgs.push('-h');
					emuArgs.push(hackName);
				}
			});

			// Log emu location and args
			APP.log('\nINFO - Running fpPS4 with args: ' + emuArgs.toString().replace(RegExp(',', 'gi'), ' ') + '\nEmu location: ' + APP.settings.data.emuPath);

			// Run fpPS4
			APP.runfpPS4(APP.settings.data.emuPath, emuArgs);
			this.emuRunning = !0;

			// Update main GUI
			APP.design.update();
			APP.design.toggleDisplayMode({
				appStatus: 'Running',
				appPath: mainGameData.exe,
				appIcon: mainGameData.icon,
				appName: mainGameData.name,
				paramSfo: mainGameData.paramSfo
			});

			// Save game settings
			APP.gameList.saveGameSettings();
		
		}

	},

	// Stop fpPS4
	killEmu: function(){
		
		// Kill process and set emu running var to false
		APP.getProcessInfo('fpPS4.exe', function(pData){
			process.kill(pData.th32ProcessID);
			this.emuRunning = !1;
		});

		// Update status
		document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = 'Main process closed - close fpPS4 log window to go back';

	}

}