function updateGear() {
	let gearTypes = ["weapon", "helmet", "chestplate", "gloves", "leggings"];
	let elementValue;
	let gear;
	for (j = 0; j < gearTypes.length; j++) {
		elementValue = element(gearTypes[j]).childNodes;
		gear = game.inventory.gear[gearTypes[j]];
		//new gear
		if (gear.length > elementValue.length) {
			for (i = gear.length - (gear.length - elementValue.length); i < gear.length; i++) {
				createTextElement(gear[i] + ", level " + gear[i].level, "gear", gear[i], 'OPTION', false, false);
				element(gear[i]).value = gear[i];
			}
		}
		// update levels
		for (i = 0; i < elementValue.length; i++) {
			elementValue[i].innerHTML = "gear[i] + ", level " + gear[i].level";
		}
	}
	
	

}
