const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;

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

const getTimeRemaining = endTime => {
	const t = endTime.getTime() - new Date().getTime();
	const seconds = Math.floor((t / 1000) % 60);
	const minutes = Math.floor((t / 1000 / 60) % 60);
	const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	const days = Math.floor(t / (1000 * 60 * 60 * 24));

	const daysRemaining = days ? `${days} д. ` : '';
	const timeRemaining = `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	console.log('rere');
	console.log('ttt', t);
	return {
		total: t,
		result: daysRemaining + timeRemaining,
	};
};

const inputDate = document.createElement('input');
const button = document.createElement('button');
const flagButton = document.createElement('button');
const START_ROUND_TIME_L = document.createElement('h2');
const START_ROUND_TIME = document.createElement('h2');
const END_ROUND_TIME_L = document.createElement('h2');
const END_ROUND_TIME = document.createElement('h2');
const DISPLAY = document.createElement('div');
const DISPLAY_L = document.createElement('div');
const hr = document.createElement('hr');
button.textContent = 'SUBMIT';
DISPLAY.classList.add('display');
DISPLAY_L.classList.add('display-l', 'display');
document.body.append(
	inputDate,
	DISPLAY,
	DISPLAY_L,
	START_ROUND_TIME,
	START_ROUND_TIME_L,
	hr,
	END_ROUND_TIME,
	END_ROUND_TIME_L,
	button
);

button.addEventListener('click', () => {
	const timeStartStr = inputDate.value;
	if (!timeStartStr) return;

	const offset = new Date().getTimezoneOffset() * 60 * 1000;
	const localeTimeStart = new Date(new Date(timeStartStr).getTime() + offset);
	const timeStart = new Date(timeStartStr);

	const duration = '02:00:00';
	const endTime = getRoundEndTime(timeStart, duration);
	const endTime_L = getRoundEndTime(localeTimeStart, duration);

	countdown(endTime, DISPLAY);
	countdown(endTime_L, DISPLAY_L);

	START_ROUND_TIME.textContent = `РАУНД начался в ${getRoundEndTimeText(timeStart)}`;
	START_ROUND_TIME_L.textContent = `(L)РАУНД начался в ${getRoundEndTimeText(localeTimeStart)}`;
	END_ROUND_TIME.textContent = `РАУНД закончится в ${getRoundEndTimeText(endTime)}`;
	END_ROUND_TIME_L.textContent = `(L)РАУНД закончится в ${getRoundEndTimeText(endTime_L)}`;
});

function countdown(endTime, target) {
	const interval = setInterval(() => {
		const { total, result } = getTimeRemaining(endTime);
		target.textContent = result;

		if (total < 0) {
			clearInterval(interval);
			target.textContent = 'Timer expired';
		}
	}, 1000);
}
