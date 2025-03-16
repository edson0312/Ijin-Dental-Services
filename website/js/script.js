document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Function to handle navigation to history form
function goToHistory(event) {
  event.preventDefault();
  
  // Get all form data
  const formData = new FormData(event.target);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  
  // Store in sessionStorage
  sessionStorage.setItem('registrationData', JSON.stringify(formObject));
  
  // Navigate to history page
  window.location.href = 'history.html';
}

// Function to handle Back button click
function handleBackButton() {
  // Get current history form data before going back
  const historyForm = document.getElementById('historyForm');
  if (historyForm) {
    const formData = new FormData(historyForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    sessionStorage.setItem('historyData', JSON.stringify(formObject));
  }
  
  // Navigate back to registration
  window.location.href = 'registration.html';
}

// Function to restore registration form data
function restoreRegistrationData() {
  const savedData = sessionStorage.getItem('registrationData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    Object.keys(formData).forEach(key => {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'radio') {
          const radio = document.querySelector(`[name="${key}"][value="${formData[key]}"]`);
          if (radio) radio.checked = true;
        } else {
          input.value = formData[key];
        }
      }
    });
  }
}

// Function to restore history form data
function restoreHistoryData() {
  const savedData = sessionStorage.getItem('historyData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    Object.keys(formData).forEach(key => {
      const input = document.querySelector(`[name="${key}"]`);
      if (input) {
        if (input.type === 'radio') {
          const radio = document.querySelector(`[name="${key}"][value="${formData[key]}"]`);
          if (radio) radio.checked = true;
        } else if (input.type === 'checkbox') {
          input.checked = formData[key] === 'true';
        } else {
          input.value = formData[key];
        }
      }
    });
  }
}

// Add this new function to handle navigation to dental chart
function goToDentalChart(event) {
  event.preventDefault();
  
  // Get current history form data before navigating
  const historyForm = document.getElementById('historyForm');
  if (historyForm) {
    const formData = new FormData(historyForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    sessionStorage.setItem('historyData', JSON.stringify(formObject));
  }
  
  // Navigate to dental chart page
  window.location.href = 'dental-chart.html';
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // For registration form
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    restoreRegistrationData();
  }
  
  // For history form
  const historyForm = document.getElementById('historyForm');
  if (historyForm) {
    restoreHistoryData();
  }
  
  // Add back button handler
  const backButton = document.querySelector('.history__back');
  if (backButton) {
    backButton.addEventListener('click', function(event) {
      event.preventDefault();
      handleBackButton();
    });
  }
});
