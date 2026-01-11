// Initialize EmailJS
(function () {
  emailjs.init("ILPxFImLAotMmfFsH"); // replace
})();


document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // 1️⃣ Send email to YOU
  emailjs.sendForm(
    "service_j92aqap",        // your service ID
    "template_k1aeiad",      // Contact Us template (for you)
    this
  ).then(
    function () {
      // 2️⃣ After success, send auto-reply to USER
      emailjs.sendForm(
        "service_j92aqap",    // same service
        "template_a2m4p4r",   // Auto-reply template (for sender)
        document.getElementById("contact-form")
      );

      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    },
    function (error) {
      alert("Failed to send message. Try again!");
      console.log("EmailJS Error:", error);
    }
  );
});
