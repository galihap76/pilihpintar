// Inisialisasi Owl Carousel
let owl = $(".owl-carousel");
owl.owlCarousel({
  items: 4,
  loop: true,
  autoplay: true,
  autoplayTimeout: 1500,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: true,
      loop: true,
    },
  },
});

// Fungsi untuk menampilkan notifikasi
function showNotification() {
  const options = {
    body: "Notifikasi PilihPintar!",
    icon: "/images/icon-512x512.png", // URL icon (opsional)
  };

  new Notification("Notifikasi Berhasil Di Aktifkan!", options);
}

// Memeriksa apakah browser mendukung notifikasi
if ("Notification" in window) {
  // Meminta izin dari pengguna saat halaman dimuat
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      } else if (permission === "denied") {
        console.log("Pengguna menolak notifikasi.");
      }
    });
  } else if (Notification.permission === "granted") {
    // Jika izin sudah diberikan, langsung tampilkan notifikasi
    showNotification();
  } else {
    console.log("Notifikasi telah ditolak sebelumnya.");
  }
} else {
  console.log("Browser Anda tidak mendukung notifikasi.");
}

window.onload = function () {
  let request = indexedDB.open(dbName, 1);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB initialized:", db);
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    }
    console.log("Object store created.");
  };
};
