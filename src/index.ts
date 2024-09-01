//view
//boutton reset
let baseMoreClockButtonClass = "ui-component button more-clock-button";
let buttonMoreClock = document.createElement("div");
buttonMoreClock.setAttribute("class", baseMoreClockButtonClass);
//icon
let m_i = document.createElement("i");
m_i.setAttribute("class", "fa-regular fa-square-plus");
buttonMoreClock.appendChild(m_i);

document.body.appendChild(buttonMoreClock);

let root = document.createElement("div");
root.setAttribute("class", "root ui-component ");
document.body.appendChild(root);

let buildClock = () => {
	//cadrant circulaire
	let baseCadrantClass = "ui-component clock";
	let Cadrant = document.createElement("div");
	Cadrant.setAttribute("class", baseCadrantClass);

	// zone lumineuse
	let baseLightAreaClass = "ui-component light-area ";
	let additionalClassElement = ["light-off"];
	let lightArea = document.createElement("div");
	lightArea.setAttribute(
		"class",
		baseLightAreaClass + additionalClassElement[0],
	);

	// hour Element
	let baseHourElementClass = "ui-component hour-element";
	let hourElement = document.createElement("p");
	hourElement.setAttribute("class", baseHourElementClass);

	//hour digit elements
	let baseHourDigitElementClass = "";
	let hourDigitElement = document.createElement("span");
	hourDigitElement.setAttribute("class", baseHourDigitElementClass);

	//minutes digit elements
	let baseMinutesDigitElementClass = "";
	let minutesDigitElement = document.createElement("span");
	minutesDigitElement.setAttribute("class", baseMinutesDigitElementClass);

	//secunds digit elements
	let baseSecundsDigitElementClass = "";
	let secundsDigitElement = document.createElement("span");
	secundsDigitElement.setAttribute("class", baseSecundsDigitElementClass);

	//button container
	let baseButtonContainerClass = "ui-component container";
	let buttonContainer = document.createElement("div");
	buttonContainer.setAttribute("class", baseButtonContainerClass);

	// boutton lumière
	let baseLightButtonClass = "ui-component button";
	let ligthButton = document.createElement("div");
	ligthButton.setAttribute("class", baseLightButtonClass);
	//icon
	let l_i = document.createElement("i");
	l_i.setAttribute("class", "fa-regular fa-sun ");
	ligthButton.appendChild(l_i);

	// boutton lumière
	let baseSettingsButtonClass = "ui-component button";
	let settingsButton = document.createElement("div");
	settingsButton.setAttribute("class", baseSettingsButtonClass);
	//icon
	let s_i = document.createElement("i");
	s_i.setAttribute("class", "fa-solid fa-gear ");
	settingsButton.appendChild(s_i);

	// boutton heures
	let baseHourButtonClass = "ui-component button";
	let hourButton = document.createElement("div");
	hourButton.setAttribute("class", baseHourButtonClass);
	//icon
	let h_i = document.createElement("i");
	h_i.setAttribute("class", "fa-regular fa-clock ");
	hourButton.appendChild(h_i);

	//boutton reset
	let baseResetButtonClass = "ui-component button";
	let buttonreset = document.createElement("div");
	buttonreset.setAttribute("class", baseResetButtonClass);
	//icon
	let r_i = document.createElement("i");
	r_i.setAttribute("class", "fa-solid fa-arrow-rotate-left ");
	buttonreset.appendChild(r_i);

	//setting up the tree

	let rootChildren = [Cadrant];
	let cadrantChildren = [buttonContainer, lightArea]; //+icon
	let lightChildren = [hourElement];
	let hourElementChildren = [
		hourDigitElement,
		minutesDigitElement,
		secundsDigitElement,
	];
	let buttonContainerChildren = [
		ligthButton,
		settingsButton,
		hourButton,
		buttonreset,
	];

	//composition : building the tree
	lightChildren.forEach((e: HTMLDivElement) => lightArea.appendChild(e));
	buttonContainerChildren.forEach((e) => buttonContainer.appendChild(e));
	hourElementChildren.forEach((e) => hourElement.appendChild(e));
	cadrantChildren.forEach((e: HTMLDivElement) => Cadrant.appendChild(e));
	rootChildren.forEach((e) => root.appendChild(e));

	let hourIncr = 0;
	let minIncr = 0;
	let states = [0, 1, 2, 3];
	let stateCheck = 0;
	let currentState = 0;
	let timeToWait = 2000;

	//turn light on :
	ligthButton.addEventListener("click", (e) => {
		if (lightArea.className.includes("light-on")) {
			additionalClassElement[0] = "light-off";
		}
		if (lightArea.className.includes("light-off")) {
			additionalClassElement[0] = "light-on";
		}
		lightArea.setAttribute(
			"class",
			baseLightAreaClass + additionalClassElement[0],
		);
	});

	buttonreset.addEventListener("click", (e) => {
		hourIncr = 0;
		minIncr = 0;
	});

	setInterval(() => {
		let now = new Date();
		now.setHours(now.getHours() + hourIncr, now.getMinutes() + minIncr);
		let current = now.toLocaleString(undefined, {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			day: undefined,
		});
		hourDigitElement.innerText = `${current[0]}${current[1]}:`;
		minutesDigitElement.innerText = `${current[3]}${current[4]}:`;
		secundsDigitElement.innerText = `${current[6]}${current[7]}`;
	}, 10);

	settingsButton.addEventListener("click", (e) => {
		setInterval(() => {
			stateCheck = 0;
		}, timeToWait);
		stateCheck++;
		if (stateCheck > states.length - 1) stateCheck == states.length - 1;
		currentState = states[stateCheck];
	});

	settingsButton.addEventListener("click", (e) => {
		if (stateCheck < 2) {
			hourDigitElement.setAttribute("class", "");
			minutesDigitElement.setAttribute("class", "");
		}
		if (currentState == states[1]) {
			hourDigitElement.setAttribute("class", "isBlinking");
			console.log("hours blink");
		} else {
			hourDigitElement.setAttribute("class", "");
		}
		if (currentState == states[2]) {
			console.log("minutes blink");
			minutesDigitElement.setAttribute("class", "isBlinking");
		} else {
			minutesDigitElement.setAttribute("class", "");
		}
		if (currentState == states[3]) {
			hourDigitElement.setAttribute("class", "");
			minutesDigitElement.setAttribute("class", "");
			currentState = states[0];
		}
	});
	hourButton.addEventListener("click", (e) => {
		if (currentState == states[1]) {
			hourIncr++;
		}
		if (currentState == states[2]) {
			minIncr++;
		}
	});
};

buildClock();

buttonMoreClock.addEventListener("click", (e) => buildClock());
