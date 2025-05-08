const ascii = document.getElementById("asciiArt");

const original = `
███╗░░░███╗██████╗░██╗░░██╗
████╗░████║██╔══██╗██║░░██║
██╔████╔██║██████╔╝███████║
██║╚██╔╝██║██╔═══╝░╚════██║
██║░╚═╝░██║██║░░░░░░░░░░██║
╚═╝░░░░░╚═╝╚═╝░░░░░░░░░░╚═╝`;

const transformed = `
░▄▄▄░░░░▄▄▄░▄▄▄▄▄▄░░▄▄░░░▄▄
░███▄░░▄███░██▀▀▀█▄░██░░░██
░██▀████▀██░██▄▄▄█▀░██▄▄▄██
░██░▀██▀░██░██▀▀▀▀░░▀▀▀▀▀██
░██░░▀▀░░██░██░░░░░░░░░░░██
░▀▀░░░░░░▀▀░▀▀░░░░░░░░░░░▀▀`;

ascii.addEventListener("click", () => {
    ascii.textContent = transformed;
  
    setTimeout(() => {
      window.location.href = "index.html"; // 🔗 vai alla home
    }, 500); // ⏱ dopo 0.5 secondi
  });

  
  