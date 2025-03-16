// Sample patient data (replace with actual data from backend)
let patients = [
  {
    id: 1,
    name: "John Doe",
    contact: "+1234567890",
    lastVisit: "2024-03-15",
    status: "active"
  }
];

let currentPage = 1;
const itemsPerPage = 10;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  displayPatients();
  setupSearchListener();
  setupFilterListeners();
});

// Display patients in the table
function displayPatients() {
  const tbody = document.getElementById('patientTableBody');
  tbody.innerHTML = '';

  patients.forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="#" class="patient-id-link" onclick="showPaymentHistory(${patient.id})">${patient.id}</a></td>
      <td><a href="#" class="patient-name-link" onclick="showPatientDetails(${patient.id})">${patient.name}</a></td>
      <td>${patient.contact}</td>
      <td>${patient.lastVisit}</td>
      <td>${patient.status}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-button" onclick="editPatient(${patient.id})">Edit</button>
          <button class="delete-button" onclick="deletePatient(${patient.id})">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Search functionality
function setupSearchListener() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
    // Add search logic
  });
}

// Filter functionality
function setupFilterListeners() {
  const statusFilter = document.getElementById('filterStatus');
  const dateFilter = document.getElementById('filterDate');
  
  statusFilter.addEventListener('change', function() {
    // Add status filter logic
  });
  
  dateFilter.addEventListener('change', function() {
    // Add date filter logic
  });
}

// Pagination functions
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPatients();
  }
}

function nextPage() {
  const maxPages = Math.ceil(patients.length / itemsPerPage);
  if (currentPage < maxPages) {
    currentPage++;
    displayPatients();
  }
}

// CRUD Operations
function editPatient(id) {
  // Add edit logic
}

function deletePatient(id) {
  // Add delete logic
  document.getElementById('deleteModal').style.display = 'block';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
}

function confirmDelete() {
  // Add confirm delete logic
  closeDeleteModal();
  displayPatients();
}

// Add these functions to handle the patient details modal

function showPatientDetails(patientId) {
  // Find patient data
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return;

  // Populate personal information
  document.getElementById('patientId').textContent = patient.id;
  document.getElementById('patientName').textContent = patient.name;
  document.getElementById('patientContact').textContent = patient.contact;
  document.getElementById('patientEmail').textContent = patient.email || 'N/A';
  document.getElementById('patientAddress').textContent = patient.address || 'N/A';
  document.getElementById('patientLastVisit').textContent = patient.lastVisit;

  // Show the modal
  document.getElementById('patientDetailsModal').style.display = 'block';
  
  // Default to info tab
  switchTab('info');
}

function closePatientDetails() {
  document.getElementById('patientDetailsModal').style.display = 'none';
}

function switchTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => button.classList.remove('active'));
  
  // Show selected tab content and activate button
  document.getElementById(`${tabName}Tab`).classList.add('active');
  document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('patientDetailsModal');
  if (event.target === modal) {
    closePatientDetails();
  }
}

// Add these payment-related functions

function showPaymentHistory(patientId) {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return;

  // Set patient name in header
  document.getElementById('paymentPatientName').textContent = patient.name;

  // Display payment records
  displayPaymentRecords(patientId);

  // Show the modal
  document.getElementById('paymentHistoryModal').style.display = 'block';
}

function displayPaymentRecords(patientId) {
  const tbody = document.getElementById('paymentTableBody');
  tbody.innerHTML = '';

  // Sample payment data (replace with actual data)
  const payments = [
    {
      id: 1,
      date: '2024-03-15',
      operation: 'Dental Cleaning',
      charge: 100.00,
      payment: 100.00,
      balance: 0.00
    }
  ];

  let totalCharge = 0;
  let totalPayments = 0;
  let totalBalance = 0;

  payments.forEach(payment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${payment.date}</td>
      <td>${payment.operation}</td>
      <td>${payment.charge.toFixed(2)}</td>
      <td>${payment.payment.toFixed(2)}</td>
      <td>${payment.balance.toFixed(2)}</td>
      <td>
        <div class="payment-actions">
          <button class="edit-button" onclick="editPayment(${payment.id})">Edit</button>
          <button class="delete-button" onclick="deletePayment(${payment.id})">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);

    totalCharge += payment.charge;
    totalPayments += payment.payment;
    totalBalance += payment.balance;
  });

  // Update totals
  document.getElementById('totalCharge').textContent = totalCharge.toFixed(2);
  document.getElementById('totalPayments').textContent = totalPayments.toFixed(2);
  document.getElementById('totalBalance').textContent = totalBalance.toFixed(2);
}

function closePaymentHistory() {
  document.getElementById('paymentHistoryModal').style.display = 'none';
}

function showAddPaymentForm() {
  document.getElementById('paymentFormTitle').textContent = 'Add Payment Record';
  document.getElementById('paymentForm').reset();
  document.getElementById('paymentFormModal').style.display = 'block';
}

function closePaymentForm() {
  document.getElementById('paymentFormModal').style.display = 'none';
}

function handlePaymentSubmit(event) {
  event.preventDefault();
  // Add logic to save payment data
  closePaymentForm();
  // Refresh payment records display
  displayPaymentRecords(currentPatientId);
}

function editPayment(paymentId) {
  document.getElementById('paymentFormTitle').textContent = 'Edit Payment Record';
  // Populate form with payment data
  document.getElementById('paymentFormModal').style.display = 'block';
}

function deletePayment(paymentId) {
  if (confirm('Are you sure you want to delete this payment record?')) {
    // Add logic to delete payment
    displayPaymentRecords(currentPatientId);
  }
} 