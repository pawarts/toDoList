let pos = navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
})

let options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
}

console.log(navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
}), options)