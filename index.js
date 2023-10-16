const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;

const getRoundStartTimeText = timeStart => {};

const getRoundEndTime = (timeStart, duration) => {
	let roundHours;

	const durationArr = duration.split(' ');

	if (durationArr.length > 1) {
		const durationHours = Number(durationArr[1].split(':')[0]);
		const durationDays = Number(durationArr[0]);
		roundHours = durationDays * 24 + durationHours;
	} else {
		roundHours = Number(duration.split(':')[0]);
	}

	const roundMilliseconds = roundHours * MILLISECONDS_IN_HOUR;
	const startDate = new Date(timeStart);

	return new Date(startDate.getTime() + roundMilliseconds);
};

const getRoundEndTimeText = endRoundDate => {
	const day = endRoundDate.getDate();
	const month = endRoundDate.getMonth() + 1;
	const year = endRoundDate.getFullYear();
	const hours = endRoundDate.getHours();
	const minutes = endRoundDate.getMinutes();

	const date = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
	const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

	return `${date} в ${time}`;
};

let flag = false;

const inputDate = document.createElement('input');
const button = document.createElement('button');
const flagButton = document.createElement('button');
button.textContent = 'SUBMIT';
const TIME_IN_SECONDS = document.createElement('h1');
const START_ROUND_TIME = document.createElement('h2');
const END_ROUND_TIME = document.createElement('h2');
document.body.append(inputDate, START_ROUND_TIME, TIME_IN_SECONDS, END_ROUND_TIME, button);

button.addEventListener('click', () => {
	const timeStart = inputDate.value;
	if (!timeStart) return;
	const backOffset = 10800000;
	const offset = new Date().getTimezoneOffset() * 60 * 1000;
	const localeTimeStart = new Date(new Date(timeStart).getTime() + backOffset + offset);

	const duration = '02:00:00';
	const endTime = getRoundEndTime(localeTimeStart, duration);
	TIME_IN_SECONDS.textContent = endTime;
	END_ROUND_TIME.textContent = `РАУНД закончится в ${getRoundEndTimeText(endTime)}`;
	START_ROUND_TIME.textContent = `РАУНД начался в ${getRoundEndTimeText(
		new Date(localeTimeStart)
	)}`;
});
