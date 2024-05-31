$(document).ready(function () {
  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  function updateCaptcha() {
    const captcha = generateCaptcha();
    $("#captcha-text").text(captcha);
  }

  // تحديث رمز التحقق عند تحميل الصفحة
  updateCaptcha();

  // تحديث رمز التحقق عند الضغط على زر التحديث
  $("#refresh-captcha").click(function () {
    updateCaptcha();
  });

  // إظهار واإخفاء تفاصيل العقار
  $(".show-details").change(function () {
    var detailsRow = $(this).closest("tr").next(".details-row");
    detailsRow.toggle(this.checked);
  });

  $(".submit-button").click(function () {
    $("#property-form").toggle();
  });

  $("#propertyForm").submit(function (event) {
    event.preventDefault();

    let isValid = true;
    const namePattern = /^[\u0621-\u064A\s]+$/; 
    const idPattern = /^\d{11}$/;
    const phonePattern = /^(099|098|096|095|094|093)\d{7}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name = $("#name").val();
    const id = $("#id").val();
    const dob = $("#dob").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const captcha = $("#captcha").val();
    const captchaText = $("#captcha-text").text();


    $(".error-message").hide();

    if (!namePattern.test(name)) {
      $("#name-error").show();
      isValid = false;
    }

    if (!idPattern.test(id)) {
      $("#id-error").show();
      isValid = false;
    }

    if (new Date(dob).toString() === "Invalid Date") {
      $("#dob-error").show();
      isValid = false;
    }

    if (!phonePattern.test(phone)) {
      $("#phone-error").show();
      isValid = false;
    }

    if (!emailPattern.test(email)) {
      $("#email-error").show();
      isValid = false;
    }

    if (captcha !== captchaText) {
      $("#captcha-error").show();
      isValid = false;
    }

    if (isValid) {
      const selectedApartment = $("input[name='select-apartment']:checked");
      if (selectedApartment.length === 0) {
        alert("الرجاء اختيار عقار.");
        return;
      }

      const details = selectedApartment
        .closest("tr")
        .find("td:nth-child(2)")
        .text();
      const city = selectedApartment
        .closest("tr")
        .find("td:nth-child(1)")
        .text();
      const rent = selectedApartment
        .closest("tr")
        .find("td:nth-child(3)")
        .text();
      const detailsContent = selectedApartment
        .closest("tr")
        .next(".details-row")
        .find(".details-content")
        .html();

      const propertyInfo = `
  <html>
  <head>
    <title>تفاصيل العقار المختار</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        margin: 20px;
        background-color: #f0f0f0;
        color: #333;
        direction: rtl;
        text-align: right;
      }
      h2 {
        color: #4CAF50;
        border-bottom: 2px solid #4CAF50;
        padding-bottom: 10px;
      }
      p {
        margin: 10px 0;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .details-content {
        background-color: #fff;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h2>العقار المختار</h2>
    <p><strong>المدينة:</strong> ${city}</p>
    <p><strong>تفاصيل الشقة:</strong> ${details}</p>
    <p><strong>الإيجار الشهري:</strong> ${rent}</p>
    <p><strong>تفاصيل إضافية:</strong></p>
    <div class="details-content">${detailsContent}</div>
  </body>
  </html>
`;

      const newWindow = window.open();
      newWindow.document.write(propertyInfo);
      newWindow.document.close();
    }
  });
});
