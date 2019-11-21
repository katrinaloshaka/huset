window.addEventListener('DOMContentLoaded', init)
let foodItems = []

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        getEventData();
    } else {
        getData();
    }

    function getEventData() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event/" + id + "?_embed").then(res => res.json()).then(showSingleEvent);
    }

    function showSingleEvent(SingleEvent) {
        console.log(SingleEvent);
        document.querySelector("p").innerHTML =
            SingleEvent.content.rendered;
        document.querySelector(".extra_description").textContent =
            SingleEvent.extra_description;
        document.querySelector(".price").textContent =
            SingleEvent.price;
        document.querySelector(".event_date").textContent =
            SingleEvent.event_date;
        document.querySelector(".event_image").content = 
            SingleEvent.event_image;

    }
}


function getData() {
    fetch('http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?per_page=100')
        .then(res => res.json())
        .then(coolDataHandle)
        .then(logFood(foodItems))
}




function handleData(myData) {
    myData.forEach(function (post) {
        let arrayOfCategories = post.categories
        arrayOfCategories.forEach(function (e) {
            if (e == 10) {
                console.log(post)
                showpost(post)
            }
        })
    })
}

const coolDataHandle = data => {
    console.log(data)
    //   console.log('::: DATA :::', data)

    data.forEach(item => {
        console.log(item)
        item.categories.forEach(key => {
            console.log(key)
            if (key === 10) {
                foodItems.push(item)
                showpost(item)
            }
        })
    })
}
const logFood = food => {
    console.log('food', food)
}


function showpost(post) {
    const template = document.querySelector('.postTemplate').content
    const postCopy = template.cloneNode(true)

    const h1 = postCopy.querySelector('h1')
    h1.textContent = post.title.rendered

    const img = postCopy.querySelector('.event_image img')
    img.src = post.event_image.guid
    img.alt = post.title.rendered

    /*const desc = postCopy.querySelector(".desc");
      desc.innerHTML = post.content.rendered*/

    const date = postCopy.querySelector('.date')
    date.textContent = post.event_date

    const price = postCopy.querySelector('.price span')
    price.textContent = post.price

    const place = postCopy.querySelector('.place span')
    place.textContent = post.place

    /*const extra_description = postCopy.querySelector(".extra_description");
    extra_description.textContent = post.extra_description
*/
    const event_image = postCopy.querySelector('.event_image')
    event_image.src = post.event_image.guid

    const timetable = postCopy.querySelector('.timetable')
    timetable.textContent = post.timetable

    const readMoreBtn = postCopy.querySelector('#readMoreBtn')
    readMoreBtn.addEventListener('click', () => {
        console.log('Button clicked', event, '\n', post)

        const descPage = window.open('./description.html?id=' + post.id, '_blank')
        descPage.focus()
    })
    /*const event_video = postCopy.querySelector(".event_video");
      event_video.src = post.event_video*/

    document.querySelector('#posts').appendChild(postCopy)

}

// const makeExtraContentPage = post => {
//   //es ble nesaprotu shito sviestu, es nah neiedzilansos ka sitas mesls strada, jo taadu nekur neviens nafig neizmanto, get a life tas kas shito taisija wtf, get fucked roxanne all she wanna do is aprty all night god damn roxanne never gonna love me but thats alright
//   const descPage = document.querySelector('.descPage').content
//   const descPageContent = descPage.cloneNode(true)

//   const desc = descPageContent.querySelector('.content')
//   desc.textContent = 'test'
// }

function makePosts() {
    const temp = document.querySelector('#post_template')
    const destination = document.querySelector('.wrapper')
}
