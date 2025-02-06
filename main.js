const citySelect = document.querySelector("#city-options-select")
const cityName = document.querySelector(".city-name")

const egyptCities = [
    "Cairo", 
    "Alexandria", 
    "Giza", 
    "Shubra El-Kheima", 
    "Port Said", 
    "Suez", 
    "Luxor", 
    "Aswan", 
    "Mansoura", 
    "Tanta", 
    "Fayoum", 
    "Damanhur", 
    "Ismailia", 
    "Zagazig", 
    "Assiut", 
    "Banha", 
    "Minya", 
    "Damietta", 
    "Mahalla el-Kubra", 
    "Qena", 
    "Kafr El Sheikh", 
    "Beni Suef", 
    "Sharkia", 
    "Matrouh", 
    "Red Sea Governorate"
];


for(city of egyptCities){
    citySelect.innerHTML+= `<option>${city}</option>`
}
citySelect.addEventListener("change", function(){
        cityName.innerHTML = this.value
        getPrayerTime(this.value)
})

getPrayerTime("Cairo")

function getPrayerTime(cityName){
    let params = {
        country: "EG",
        city: cityName,
    };
    
    axios.get("http://api.aladhan.com/v1/timingsByCity", { params: params })
    .then(function (response) {
        let timings = response.data.data.timings;
        timeFilling("fajr-time", timings.Fajr)
        timeFilling("sunrise-time", timings.Sunrise)
        timeFilling("dhuhr-time", timings.Dhuhr)
        timeFilling("asr-time", timings.Asr)
        timeFilling("maghrib-time", timings.Maghrib)
        timeFilling("isha-time", timings.Isha)
    
        const date = response.data.data.date.readable
        const day = response.data.data.date.hijri.weekday.en
        document.getElementById('day-date').innerHTML = `${day} - ${date}`
    })
    .catch(function (error) {
    console.log(error);
    });
}


function timeFilling(id, time){
    document.getElementById(id).innerHTML = time
}
