// Song data
const songList = [
    {
        title: "01-Pancho Barraza  Grupo Firme, Eduin Caz - Musica Romantica (Video Oficial) 2021",
        file: "01-Pancho Barraza  Grupo Firme, Eduin Caz - Musica Romantica (Video Oficial) 2021.mp3",
        cover: "01-Pancho Barraza  Grupo Firme, Eduin Caz - Musica Romantica (Video Oficial) 2021.jpg"
    },
    {
        title: "02-Grupo Firme - Pideme",
        file: "02-Grupo Firme - Pideme [ En Vivo ] Desde Tijuana México.mp3",
        cover: "02-Grupo Firme - Pideme.jpg"
    },
    {
        title: "03-Grupo Firme Decide Tú",
        file: "03-Grupo Firme - Decide tú -  (Feat) Banda La Sinaloense.mp3",
        cover: "03-Grupo Firme - Decide Tú - (Feat) Banda La Sinaloense.jpg"
    },
    {
        title: "04-Canción perfecta para el amor de tu vida",
        file: "04-Canción perfecta para el amor de tu vida.mp3",
        cover: "04-Canción perfecta para el amor de tu vida.jpg"
    },
    {
        title: "05-Si tú quieres - Elefante",
        file: "05-Si tú quieres - Elefante.mp3",
        cover: "05-Si tú quieres - Elefante.jpg"
    },
    {
        title: "06-Río Roma - Por Eso Te Amo",
        file: "06-Río Roma - Por Eso Te Amo.mp3",
        cover: "06-Río Roma - Por Eso Te Amo.jpg"
    },
    {
        title: "07-KAROL G - Así Es El Amor",
        file: "07-KAROL G - Así Es El Amor.mp3",
        cover: "07-KAROL G - Así Es El Amor.jpg"
    },
    {
        title: "08-Pablo Alborán - Solamente Tú",
        file: "08-Pablo Alborán - Solamente Tú (Videoclip Oficial).mp3",
        cover: "08-Pablo Alborán - Solamente Tú.jpg"
    },
    {
        title: "09-Luis Miguel - la Incondicional",
        file: "09-Luis Miguel - La Incondicional (Video Oficial).mp3",
        cover: "09-Luis Miguel - la Incondicional.jpg"
    },
    {
        title: "10-OV7 - Shabadaba",
        file: "10-OV7 - Shabadaba.mp3",
        cover: "10-OV7 - Shabadaba.jpg"
    },
    {
        title: "11-Chopin - Nocturne",
        file: "11-Chopin - Nocturne .mp3",
        cover: "11-Chopin - Nocturne.jpg"
    },
    {
        title: "12-Chopin - Spring Waltz (Mariage d'Amour) [Please Read Description]",
        file: "12-Chopin - Spring Waltz.mp3",
        cover: "12-Chopin - Spring Waltz (Mariage d'Amour) [Please Read Description].jpg"
    },
    {
        title: "13-Música de Fondo Instrumental Inspiradora",
        file: "13-Música de Fondo Instrumental Inspiradora.mp3",
        cover: "13-Música de Fondo Instrumental Inspiradora.jpg"
    },
    {
        title: "14-SOLEADO - INSTRUMENTAL - musica clasica",
        file: "14-SOLEADO - INSTRUMENTAL - musica clasica.mp3",
        cover: "14-SOLEADO - INSTRUMENTAL - musica clasica.jpg"
    },
    {
        title: "15-Ai Kotoba Palabras de Amor Emanuel Santiago Fan Doblaje Latino",
        file: "15-Ai Kotoba   Palabras de Amor Emanuel Santiago Fan Doblaje Latino.mp3",
        cover: "15-Ai Kotoba Palabras de Amor Emanuel Santiago Fan Doblaje Latino.jpg"
    },
    {
        title: "16-Camilo, Pedro Capó - Tutu",
        file: "16-Camilo, Pedro Capó - Tutu (Official Video).mp3",
        cover: "16-Camilo, Pedro Capó - Tutu.jpg"
    },
]

// Canción actual
let actualSong = null

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()   
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Aañadir li a ul
        songs.appendChild(li)
    })
}

// Cargar canción seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeSongtitle(songIndex)
        changeCover(songIndex)
    }
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%" 
}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

// Actualiar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Reproducir canción
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

// Pausar canción
function pauseSong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
}

// Cambiar el título de la canción
function changeSongtitle(songIndex) {
     title.innerText = songList[songIndex].title
}

// Anterior canción
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

// GO!
loadSongs()