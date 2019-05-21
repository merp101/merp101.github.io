function updateGear() {
	let gearTypes = ["weapon", "helmet", "chestplate", "gloves", "leggings"];
	//new gear
	let elementValue;
	let gear;
	for (j = 0; j < gearTypes.length; j++) {
		elementValue = element(gearTypes[j]).childNodes;
		gear = game.inventory.gear[gearTypes[j]]
		if (gear.length > elementValue.length) {
			for (i = gear.length - (gear.length - elementValue.length); i < gear.length; i++) {
				createTextElement(gear[i], "gear", gear[i], 'OPTION', false, false);
				element(gear[i]).value = gear[i];
			}
		}
	}

}
