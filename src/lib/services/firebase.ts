export default function uploadClicks(click: any) {

    const serverAddress = "https://xai-limited-choice-default-rtdb.europe-west1.firebasedatabase.app/eval-1/";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let currentDate = new Date()

    click["datetime"] = currentDate

    let raw = JSON.stringify(click);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + click.username + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}