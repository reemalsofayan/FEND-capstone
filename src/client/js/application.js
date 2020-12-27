const goeNames_userName = 'reemalsofayan';
const weatherbitKey = '043c1cdc1d9a4d6aa5af1e0f5b8c6797';
const pixabayAPI_KEY = '15718385-e6469b99add168316507ab087';
export let tripInfo = {};

//async function formHandler

async function GetGeoNames(location) {

    const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${location}&maxRows=10&username=${goeNames_userName}`;
    return await fetch(url).then(response => response.json());


}

function getDuration() {
    const end_date = new Date(document.querySelector('#end-date').value);
    const start_date = new Date(document.querySelector('#start-date').value);
    return (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24);

}

export async function API_geoNames(location) {

    console.log('geonames API begins!');

    return await GetGeoNames(location).then(data => {

            tripInfo.city = data.postalCodes[0].placeName;
            tripInfo.country = data.postalCodes[0].countryName;
            tripInfo.lat = data.postalCodes[0].lat;
            tripInfo.lng = data.postalCodes[0].lng;
            tripInfo.countryCode = data.postalCodes[0].countryCode;

        })

        .catch((error) => {

            console.log(error);
        });

}


function getURL(days) {

    const latitude = tripInfo.lat;
    const longitude = tripInfo.lng;

    if (days > 7)

        return `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`;
    else

        return `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`;


}







export async function APIweatherbit(date) {



    const input_date = new Date(date).getTime();
    const today = new Date().getTime();
    const DaysCount = (input_date - today) / (1000 * 3600 * 24);

    let url = getURL(DaysCount);

    await fetch('http://localhost:8000/forecast', {

            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        }).then(data => data.json())



        .then((data) => {

                tripInfo.maxTemp_daily = data.maxTemp_daily;
                tripInfo.lowTemp_daily = data.lowTemp_daily;
                tripInfo.current_temp = data.current_temp;
                tripInfo.dates = DaysCount;

            }


        ).catch((error) => {
            console.log(error);
        });


}

export async function APIpixabay(city) {

    const url_image = `https://pixabay.com/api/?key=${pixabayAPI_KEY}&q=city&image_type=photo&pretty=true&category=places`;


    await fetch(url_image).then(data => data.json())

        .then((data) => {

            if (data.totalHits != 0) {
                tripInfo.image = data.hits[0].largeImageURL;

            }
        })
}


export function updateUI(tripInfo) {



    document.querySelector('#info').style.display = 'flex';
    document.querySelector('.days').innerHTML = tripInfo.dates;
    document.querySelector('.img').src = tripInfo.image;
    document.querySelector('.country').innerHTML = tripInfo.city;
    document.querySelector('.length').innerHTML = getDuration();

    if (tripInfo.dates > 7) {

        document.querySelector('.temperature').innerHTML = 'Temperature is: ' + tripInfo.current_temp + '&#8451;';

    } else {

        document.querySelector('.temperature').innerHTML = 'High- ' +
            Math.round(tripInfo.maxTemp_daily) + '&#8451;, Low- ' + Math.round(tripInfo.lowTemp_daily) + '&#8451;';

    }

}


export async function handleSubmit(city) {


    const date = document.querySelector('#user-date');

    API_geoNames(city)
        .then(() => APIweatherbit(date))
        .then(() => APIpixabay(city))
        .then(() => updateUI(tripInfo));
}