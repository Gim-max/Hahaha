document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR MOBILE
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuButton.querySelector("i");

            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

        /* Tutup menu setelah klik link */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       PHOTO LIGHTBOX / FULLSCREEN
    ===================================================== */

    const photoCards = document.querySelectorAll(".photo-card");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeLightbox = document.getElementById("closeLightbox");

    const prevPhoto = document.getElementById("prevPhoto");
    const nextPhoto = document.getElementById("nextPhoto");

    const lightboxCounter =
        document.getElementById("lightboxCounter");


    let photos = [];
    let currentPhoto = 0;


    /*
       Ambil semua foto dari .photo-card
    */

    photoCards.forEach((card) => {

        const image = card.querySelector("img");

        if (image) {
            photos.push(image.src);
        }

    });


    /*
       Tampilkan foto
    */

    function showPhoto(index) {

        if (photos.length === 0) {
            return;
        }

        if (index < 0) {
            index = photos.length - 1;
        }

        if (index >= photos.length) {
            index = 0;
        }

        currentPhoto = index;

        lightboxImage.src = photos[currentPhoto];

        lightboxImage.alt =
            "Foto grup " + (currentPhoto + 1);

        lightboxCounter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;

    }


    /*
       Buka fullscreen
    */

    function openLightbox(index) {

        showPhoto(index);

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

        /*
           Coba fullscreen browser
        */

        if (lightbox.requestFullscreen) {

            lightbox.requestFullscreen().catch(() => {
                // Browser dapat menolak fullscreen.
                // Lightbox tetap berjalan normal.
            });

        }

    }


    /*
       Tutup fullscreen
    */

    function closePhotoLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

        /*
           Keluar dari fullscreen browser
        */

        if (document.fullscreenElement) {

            document.exitFullscreen().catch(() => {});

        }

    }


    /*
       Klik foto
    */

    photoCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    /*
       Tombol close
    */

    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closePhotoLightbox
        );

    }


    /*
       Foto sebelumnya
    */

    if (prevPhoto) {

        prevPhoto.addEventListener("click", (event) => {

            event.stopPropagation();

            showPhoto(currentPhoto - 1);

        });

    }


    /*
       Foto berikutnya
    */

    if (nextPhoto) {

        nextPhoto.addEventListener("click", (event) => {

            event.stopPropagation();

            showPhoto(currentPhoto + 1);

        });

    }


    /*
       Klik area gelap untuk menutup
    */

    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            if (event.target === lightbox) {

                closePhotoLightbox();

            }

        });

    }


    /*
       Keyboard
    */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closePhotoLightbox();

        }

        if (event.key === "ArrowLeft") {

            showPhoto(currentPhoto - 1);

        }

        if (event.key === "ArrowRight") {

            showPhoto(currentPhoto + 1);

        }

    });


    /* =====================================================
       SWIPE FOTO DI HP
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightboxImage) {

        lightboxImage.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        lightboxImage.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            },
            { passive: true }
        );

    }


    function handleSwipe() {

        const difference =
            touchStartX - touchEndX;


        /*
           Swipe kiri
        */

        if (difference > 50) {

            showPhoto(currentPhoto + 1);

        }


        /*
           Swipe kanan
        */

        if (difference < -50) {

            showPhoto(currentPhoto - 1);

        }

    }


    /* =====================================================
       FILTER FOTO
    ===================================================== */

    const filters =
        document.querySelectorAll(".filter");


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const selectedFilter =
                filter.dataset.filter;


            photoCards.forEach((card, index) => {

                /*
                   Semua foto
                */

                if (selectedFilter === "all") {

                    card.style.display = "";

                }


                /*
                   Foto terbaru
                   Menampilkan 10 foto terakhir
                */

                else if (selectedFilter === "recent") {

                    if (index >= photos.length - 10) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                }


                /*
                   Favorit
                   Contoh: foto tertentu dianggap favorit
                */

                else if (selectedFilter === "favorite") {

                    const favoritePhotos = [
                        0,
                        2,
                        4,
                        9,
                        14,
                        19,
                        24,
                        29
                    ];

                    if (
                        favoritePhotos.includes(index)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                }

            });

        });

    });


    /* =====================================================
   MUSIC PLAYLIST
===================================================== */

const playlist = [
    {
        title: "Surat Cinta Untuk Starla",
        artist: "Musik Grup 🎵",
        src: "assets/surat-cinta-untuk-starla.mp3"
    },
    {
        title: "L Halstage",
        artist: "Musik Grup 🎵",
        src: "assets/l-halstage.mp3"
    }
];

let currentSong = 0;

function loadSong(index, autoplay = false) {

    if (!audio) return;

    currentSong = index;

    const song = playlist[currentSong];

    audio.src = song.src;

    const title =
        document.querySelector(".music-title");

    const artist =
        document.querySelector(".music-artist");

    if (title) {
        title.textContent = song.title;
    }

    if (artist) {
        artist.textContent = song.artist;
    }

    audio.load();

    if (progress) {
        progress.value = 0;
    }

    if (currentTime) {
        currentTime.textContent = "0:00";
    }

    if (duration) {
        duration.textContent = "0:00";
    }

    if (autoplay) {

        audio.play().then(() => {

            if (playButton) {
                playButton.innerHTML =
                    '<i class="fas fa-pause"></i>';
            }

        }).catch(() => {});

    }
}


/* NEXT */

if (nextMusic) {

    nextMusic.addEventListener("click", () => {

        currentSong =
            (currentSong + 1) % playlist.length;

        loadSong(currentSong, true);

    });

}


/* PREVIOUS */

if (prevMusic) {

    prevMusic.addEventListener("click", () => {

        currentSong =
            (currentSong - 1 + playlist.length)
            % playlist.length;

        loadSong(currentSong, true);

    });

}


/* OTOMATIS LANJUT KE LAGU BERIKUTNYA */

if (audio) {

    audio.addEventListener("ended", () => {

        currentSong =
            (currentSong + 1) % playlist.length;

        loadSong(currentSong, true);

    });

}


/* LOAD LAGU PERTAMA */

loadSong(0);


    /*
       Format waktu
    */

    function formatTime(seconds) {

        if (isNaN(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );

    }


    /*
       Play / Pause
    */

    if (audio && playButton) {

        playButton.addEventListener("click", () => {

            if (audio.paused) {

                audio.play()
                    .then(() => {

                        playButton.innerHTML =
                            '<i class="fas fa-pause"></i>';

                    })
                    .catch(() => {

                        console.log(
                            "Browser memblokir autoplay."
                        );

                    });

            } else {

                audio.pause();

                playButton.innerHTML =
                    '<i class="fas fa-play"></i>';

            }

        });


        /*
           Saat musik selesai
        */

        audio.addEventListener("ended", () => {

            playButton.innerHTML =
                '<i class="fas fa-play"></i>';

            if (progress) {
                progress.value = 0;
            }

        });

    }


    /*
       Durasi musik
    */

    if (audio) {

        audio.addEventListener(
            "loadedmetadata",
            () => {

                if (duration) {

                    duration.textContent =
                        formatTime(audio.duration);

                }

            }
        );

    }


    /*
       Update progress
    */

    if (audio) {

        audio.addEventListener(
            "timeupdate",
            () => {

                if (!audio.duration) {
                    return;
                }

                const percent =
                    (audio.currentTime /
                        audio.duration) * 100;

                if (progress) {
                    progress.value = percent;
                }

                if (currentTime) {

                    currentTime.textContent =
                        formatTime(
                            audio.currentTime
                        );

                }

            }
        );

    }


    /*
       Klik progress bar
    */

    if (progress && audio) {

        progress.addEventListener(
            "input",
            () => {

                if (!audio.duration) {
                    return;
                }

                audio.currentTime =
                    (progress.value / 100) *
                    audio.duration;

            }
        );

    }


    /*
       Volume
    */

    if (volume && audio) {

        audio.volume = volume.value;

        volume.addEventListener(
            "input",
            () => {

                audio.volume =
                    volume.value;

            }
        );

    }


    /* =====================================================
       PREV / NEXT MUSIC
       Untuk saat ini hanya satu lagu
    ===================================================== */

    const prevMusic =
        document.getElementById("prevMusic");

    const nextMusic =
        document.getElementById("nextMusic");


    if (prevMusic) {

        prevMusic.addEventListener("click", () => {

            if (audio) {

                audio.currentTime = 0;

            }

        });

    }


    if (nextMusic) {

        nextMusic.addEventListener("click", () => {

            if (audio) {

                audio.currentTime = 0;

                if (!audio.paused) {

                    audio.play();

                }

            }

        });

    }


    /* =====================================================
       ACTIVE NAVBAR SAAT SCROLL
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "#171923";

                    image.style.objectFit =
                        "contain";

                }
            );

        });

});
