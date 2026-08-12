/* =====================================================
   DATA ANGGOTA GRUP
===================================================== */

const members = [

    {
        name: "ZERO",
        role: "Group Admin",
        note: "𝕷𝖆 𝕱𝖆𝖒𝖎𝖑𝖎𝖆"
    },

    {
        name: "Apip",
        role: "Group Admin",
        note: "martabak saos gambas"
    },

    {
        name: "Naufal",
        role: "Group Admin",
        note: "6007917126"
    },

    {
        name: "Raka",
        role: "Group Admin",
        note: "Umbi cilembu"
    },

    {
        name: "Arvin",
        role: "Group Admin",
        note: "Besok dispen"
    },

    {
        name: "Davlin",
        role: "Group Admin",
        note: "Ada"
    },

    {
        name: "Ilyas",
        role: "Group Admin",
        note: "."
    },

    {
        name: "Rafa",
        role: "Group Admin",
        note: "Latihan pinalti dulu"
    },

    {
        name: "Bustan",
        role: "Member",
        note: "Ada"
    },

    {
        name: "Jordan",
        role: "Member",
        note: "Komandan pasukan suki!!"
    }

];



/* =====================================================
   ELEMENT ANGGOTA
===================================================== */

const membersGrid =
    document.getElementById("membersGrid");

const memberSearch =
    document.getElementById("memberSearch");



/* =====================================================
   MEMBUAT INITIAL / INISIAL NAMA
===================================================== */

function getInitials(name) {

    const words =
        name
            .trim()
            .split(/\s+/);

    const initials =
        words
            .map(word => word.charAt(0))
            .join("");

    return initials
        .substring(0, 2)
        .toUpperCase();

}



/* =====================================================
   MENAMPILKAN ANGGOTA
===================================================== */

function renderMembers(searchText = "") {

    const keyword =
        searchText
            .toLowerCase()
            .trim();


    const filteredMembers =
        members.filter(member => {

            const name =
                member.name.toLowerCase();

            const role =
                member.role.toLowerCase();

            const note =
                member.note.toLowerCase();


            return (
                name.includes(keyword) ||
                role.includes(keyword) ||
                note.includes(keyword)
            );

        });


    /*
       Jika tidak ada anggota
    */

    if (filteredMembers.length === 0) {

        membersGrid.innerHTML = `

            <div class="no-result">

                <h3>
                    Anggota tidak ditemukan
                </h3>

                <p>
                    Coba gunakan nama yang berbeda.
                </p>

            </div>

        `;

        return;

    }



    /*
       Membuat kartu anggota
    */

    membersGrid.innerHTML =
        filteredMembers
            .map(member => {

                const initials =
                    getInitials(member.name);


                const note =
                    member.note ||
                    "Tidak ada keterangan";


                return `

                    <article class="member">

                        <div class="member-avatar">
                            ${initials}
                        </div>


                        <div class="member-info">

                            <h3>
                                ${member.name}
                            </h3>

                            <p>
                                ${note}
                            </p>

                        </div>


                        <span class="badge">

                            ${member.role}

                        </span>

                    </article>

                `;

            })
            .join("");

}



/* =====================================================
   JALANKAN DATA ANGGOTA
===================================================== */

renderMembers();



/* =====================================================
   SEARCH ANGGOTA
===================================================== */

if (memberSearch) {

    memberSearch.addEventListener(
        "input",
        function () {

            renderMembers(
                this.value
            );

        }
    );

}



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");



if (
    menuToggle &&
    navMenu
) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "open"
            );

        }
    );

}



/* =====================================================
   TUTUP MENU SETELAH KLIK LINK
===================================================== */

const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            navMenu.classList.remove(
                "open"
            );

        }
    );

});



/* =====================================================
   MODAL FOTO
===================================================== */

const imageModal =
    document.getElementById(
        "imageModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );



/* =====================================================
   SEMUA FOTO
===================================================== */

const photoCards =
    document.querySelectorAll(
        ".photo-card"
    );



/* =====================================================
   BUKA FOTO
===================================================== */

photoCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const image =
                this.dataset.image;

            const title =
                this.dataset.title;


            modalImage.src =
                image;

            modalImage.alt =
                title;

            modalTitle.textContent =
                title;


            imageModal.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});



/* =====================================================
   TUTUP MODAL
===================================================== */

function closeModal() {

    imageModal.classList.remove(
        "show"
    );


    modalImage.src = "";


    modalTitle.textContent = "";


    document.body.style.overflow =
        "";

}



/* =====================================================
   TOMBOL X
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}



/* =====================================================
   KLIK AREA GELAP UNTUK MENUTUP
===================================================== */

if (imageModal) {

    imageModal.addEventListener(
        "click",
        function (event) {

            /*
               Jika yang diklik adalah
               background modal
            */

            if (
                event.target ===
                imageModal
            ) {

                closeModal();

            }

        }
    );

}



/* =====================================================
   TOMBOL ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);



/* =====================================================
   FOTO ERROR HANDLER
===================================================== */

/*
   Kalau foto belum dimasukkan
   ke folder assets, jangan biarkan
   ikon gambar rusak terlihat.
*/

photoCards.forEach(card => {

    const image =
        card.querySelector("img");


    if (!image) {
        return;
    }


    image.addEventListener(
        "error",
        function () {

            this.style.display =
                "none";


            card.classList.add(
                "photo-not-found"
            );


            /*
               Buat tulisan placeholder
            */

            const placeholder =
                document.createElement(
                    "div"
                );


            placeholder.className =
                "photo-placeholder";


            placeholder.innerHTML = `

                <div>
                    📷
                </div>

                <strong>
                    ${card.dataset.title}
                </strong>

                <small>
                    Foto belum ditambahkan
                </small>

            `;


            card.appendChild(
                placeholder
            );

        }
    );

});



/* =====================================================
   TAHUN FOOTER OTOMATIS
===================================================== */

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =====================================================
   ANIMASI SCROLL
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".info-card, .member, .photo-card, .group-card"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.1
        }
    );


animatedElements.forEach(
    element => {

        observer.observe(
            element
        );

    }
);



/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "Website Ga Ganja Ga Kaya Dongo berhasil dimuat."
);

console.log(
    `Jumlah anggota: ${members.length}`
);

console.log(
    "Galeri: 12 slot foto tersedia."
);