const API_URL = 'https://api.lanyard.rest/v1';
const USERID = '1025214794766221384';
const pfp = document.getElementById('pfp');
const status = document.getElementById('status');
const statusDot = document.getElementById('status-dot');
const status2 = document.getElementById('status2');
const username = document.getElementById('username');
const bigImage = document.getElementById('activity-big-image');
const smallImage = document.getElementById('activity-small-image');
const name = document.getElementById('activity-name');
const state = document.getElementById('activity-state');
const details = document.getElementById('activity-detail');
async function fetchResponse(userId) {
    try {
        const res = await fetch(`${API_URL}/users/${userId}`);
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
async function setAvatar() {
    const {
        data: {
            discord_user: {
                avatar
            }
        }
    } = await fetchResponse(USERID);
    const fullUrl = `https://cdn.discordapp.com/avatars/${USERID}/${avatar}`;
    pfp.src = fullUrl;
}
async function setAvatarFrame() {
    const {
        data: {
            discord_status
        }
    } = await fetchResponse(USERID);
    switch (discord_status) {
    case 'online':
        statusDot.style.background =
            '#3ba45d';
        statusDot.title = 'Online';
        status2.innerHTML = 'online';
        status2.style.cssText = 'color: #3ba45d; opacity: 1;';
        break;
    case 'dnd':
        statusDot.style.background =
            '#ed4245';
        statusDot.title = 'Do not disturb';
        status2.innerHTML = 'dnd';
        status2.style.cssText = 'color: #ed4245; opacity: 1;';
        break;
    case 'idle':
        statusDot.style.background =
            '#faa81a';
        statusDot.title = 'Idle';
        status2.innerHTML = "idle";
        status2.style.cssText = 'color: #faa81a; opacity: 1;';
        break;
    case 'offline':
        statusDot.style.background =
            '#747e8c';
        statusDot.title = 'Offline';
        status2.innerHTML = "offline <br> might be in eternal sleep";
        status2.style.cssText = 'color: unset; opacity: 0.5;';
        break;
    }
}
async function setUsername() {
    const {
        data: {
            discord_user: {
                username: user,
                discriminator
            }
        }
    } = await fetchResponse(USERID);
    username.innerHTML = `${user}&#8239;#&#8239;${discriminator}`;
}
async function setStatus() {
    const {
        data: {
            discord_status,
            activities
        }
    } = await fetchResponse(USERID);
    if (discord_status == 'offline')
        return;
    const {
        state
    } = activities.find(m => m.type == 4);
    if (!state) {
        return;
    }
    status.innerHTML = `Status: "${state}"`;
}
async function setActivityBigImage() {
    const {
        data: {
            activities,
            spotify
        }
    } = await fetchResponse(USERID);
    const mostRecent = activities.filter(m => m.type !== 4).shift();
    if (!mostRecent?.assets) {
        bigImage.style.display = 'none';
        return;
    }
    if (mostRecent.assets.large_image.includes("spotify")) {
        bigImage.style.display = 'block';
        bigImage.src = spotify.album_art_url;
        return;
    }
    const imageLink = `https://cdn.discordapp.com/app-assets/${mostRecent.application_id}/${mostRecent.assets.large_image}.png`;
    bigImage.style.display = 'block';
    bigImage.src = imageLink;
}
async function setActivitySmallImage() {
    const {
        data: {
            activities
        }
    } = await fetchResponse(USERID);
    const mostRecent = activities.filter(m => m.type !== 4).shift();
    if (!mostRecent?.assets || mostRecent.assets.large_image.includes("spotify")) {
        smallImage.style.display = 'none';
        return;
    }
    const imageLink = `https://cdn.discordapp.com/app-assets/${mostRecent.application_id}/${mostRecent.assets.small_image}.png`;
    smallImage.style.display = 'block';
    smallImage.src = imageLink;
}
async function setActivityName() {
    const {
        data: {
            activities
        }
    } = await fetchResponse(USERID);
    const mostRecent = activities.filter(m => m.type !== 4).shift();
    if (!mostRecent?.name) {
        name.innerHTML = 'doing yo moma';
        return;
    }
    name.style.display = 'block';
    name.innerHTML = mostRecent.name;
}
async function setActivityState() {
    const response = await fetchResponse(USERID);
    const activities = response.data.activities.filter(m => m.type !== 4);
    if (!activities.length) {
        state.style.display = 'none';
        return;
    }
    const mostRecent = activities.shift();
    if (!mostRecent.state) {
        state.style.display = 'none';
        return;
    }
    state.style.display = 'block';
    state.innerHTML = mostRecent.state;
}
async function setActivityDetails() {
    const response = await fetchResponse(USERID);

    const activities = response.data.activities.filter(m => m.type !== 4);
    if (!activities.length) {
        details.style.display = 'none';
        return;
    }
    const mostRecent = activities.shift();
    if (!mostRecent.details) {
        details.style.display = 'none';
        return;
    }
    details.style.display = 'block';
    details.innerHTML = mostRecent.details;
}

function presenceInvoke() {
    setActivityBigImage();
    setActivitySmallImage();
    setActivityName();
    setActivityState();
    setActivityDetails();
}

function statusInvoke() {
    setStatus();
    setAvatarFrame();
}

function invoke() {
    setInterval(() => {
        presenceInvoke();
        statusInvoke();
    }, 1000);
    setAvatar();
    setUsername();
}

invoke();
