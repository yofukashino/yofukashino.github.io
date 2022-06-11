API_URL = 'https://api.lanyard.rest/v1';
USERID = '887483349369765930';

async function fetchResponse(userId) {
    try {
        const url = await fetch(`${API_URL}/users/${userId}`);
        const response = await url.json();
        return response;
    } catch (error) {
        console.error(error);
    }

}


async function setAvatar() {
    const response = await fetchResponse(USERID);

    var avatarId = response.data.discord_user.avatar;
    var fullUrl = `https://cdn.discordapp.com/avatars/${USERID}/${avatarId}`;

    document.getElementById('pfp').src = fullUrl;
}

async function setAvatarFrame() {
    const response = await fetchResponse(USERID);
    const activity2 = document.getElementById('status2');

    if (response.data.discord_status == 'offline') {
        activity2.innerHTML = "geeking and sleeping";
        activity2.style.cssText = 'color: unset; opacity: 0.5;';
    } else {
        activity2.innerHTML = "idle";
        activity2.style.cssText = 'color: #51d75a; opacity: 1;';
    }
    switch (response.data.discord_status) {
        case 'online':
            document.getElementById('activity-dot').style.background =
                '#3ba45d';
            document.getElementById('activity-dot').title = 'Online';
            activity2.innerHTML = 'Online';
            break;

        case 'dnd':
            document.getElementById('activity-dot').style.background =
                '#ed4245';
            document.getElementById('activity-dot').title = 'Do not disturb';
            break;

        case 'idle':
            document.getElementById('activity-dot').style.background =
                '#faa81a';
            document.getElementById('activity-dot').title = 'Idle';
            break;

        case 'offline':
            document.getElementById('activity-dot').style.background =
                '#747e8c';
            document.getElementById('activity-dot').title = 'Offline';
            break;
    }
}

async function setUsername() {
    const response = await fetchResponse(USERID);

    var user = response.data.discord_user.username;
    var discriminator = response.data.discord_user.discriminator;
    var fullName = `${user}#${discriminator}`;

    document.getElementById('username').innerHTML = fullName;
}

async function setStatus() {
    const response = await fetchResponse(USERID);

    if (response.data.discord_status == 'offline') {
        return;
    }
    var status = response.data.activities[0].state;
    if (!status) {
        return;
    }
    document.getElementById('status').innerHTML = `Status: "${status}"`;
}

async function setSpotifyBar() {
    const response = await fetchResponse(USERID);

    var bar = document.getElementById('spotify-innerbar');
    var bar2 = document.getElementById('spotify-time-end');
    var bar3 = document.getElementById('spotify-time-start');
    
    if (response.data.listening_to_spotify == false) {
        bar.style.display = 'none';
        bar2.innerHTML = '00:00';
        bar3.innerHTML = '00:00';
        return;
    }

    const date = new Date().getTime();

    const v1 =
        response.data.spotify.timestamps.end -
        response.data.spotify.timestamps.start;
    const v2 = date - response.data.spotify.timestamps.start;


    function spotifyTimeSet(date, element) {
        const x = document.getElementById(element);
        const y = new Date(date);

        const minutes = y.getMinutes();
        const seconds = y.getSeconds();
        const formmatedseconds = seconds < 10 ? `0${seconds}` : seconds;
        x.innerHTML = `${minutes}:${formmatedseconds}`;
    }

    spotifyTimeSet(v1, 'spotify-time-end');
    spotifyTimeSet(v2, 'spotify-time-start');

    prcnt = (v2 / v1) * 100;

    precentage = Math.trunc(prcnt);

    prccc = Math.round((prcnt + Number.EPSILON) * 100) / 100;
    i = 1;

    bar.style.display = 'block';
    bar.style.width = prccc + '%';
}

async function setSpotifySongName() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('spotify-song');

    if (response.data.listening_to_spotify == false) {
        par.innerHTML = 'listening to nothing';
        return;
    }

    var songName = response.data.spotify.song;

    var fullName = songName;
    par.style.display = 'block';
    par.innerHTML = fullName;
}

async function setSpotifyAlbumCover() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('album-cover');

    if (response.data.listening_to_spotify == false) {
        par.style.display = 'none';
        return;
    }

    var albumcover = response.data.spotify.album_art_url;
    par.style.display = 'block';
    par.src = albumcover;
}

async function setSpotifyArtist() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('spotify-artist');

    if (response.data.listening_to_spotify == false) {
        par.innerHTML = 'go fuck yourself';
        return;
    }

    var artistName = response.data.spotify.artist;

    par.style.display = 'block';
    par.innerHTML = `by: ${artistName}`;
}

async function presenceInvoke() {
    setSpotifyAlbumCover();
    setSpotifyArtist();
    setSpotifySongName();
    setSpotifyBar();
}

async function statusInvoke() {
    setStatus();
    setAvatarFrame();
}

async function invoke() {
    setInterval(presenceInvoke, 1000);
    setAvatar();
    setUsername();
    setInterval(statusInvoke, 1000);
}

invoke();
