// Get elements from the DOM
const transactionsContainer = document.getElementById('transactions-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPageText = document.getElementById('current-page');

// State variables
let currentPage = 0;
const pageSize = 10;
const authToken = localStorage.getItem('token');

/**
 * Fetch transactions with pagination
 * @param {number} page - Current page number
 */
async function fetchTransactions(page) {
  try {
    const response = await fetch(
      `http://localhost:5000/transactions?page=${page}&size=${pageSize}`,
      {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`, // Uncomment if authentication is required
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unable to fetch transactions (Status: ${response.status})`);
    }

    const data = await response.json();
    renderTransactions(data.transactions);
    togglePaginationButtons(data.hasPreviousPage, data.hasNextPage);
  } catch (error) {
    transactionsContainer.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
  }
}

/**
 * Render transactions in a list format
 * @param {Array} transactions - Array of transaction objects
 */
function renderTransactions(transactions) {
  if (!transactions || transactions.length === 0) {
    transactionsContainer.innerHTML = '<p class="no-transactions">No transactions available.</p>';
    return;
  }

  const transactionItems = transactions
    .map(
      (txn) => `
      <li class="transaction-item">
        <div class="transaction-details">
          <span class="amount ${txn.type}">₹${txn.amount} ${txn.type === 'expense' ? '↗' : '↙'}</span>
          <span class="date">${new Date(txn.date).toLocaleDateString()}</span>
        </div>
        <div class="category">${txn.category}</div>
        <div class="description">${txn.description || 'N/A'}</div>
      </li>
    `
    )
    .join('');

  transactionsContainer.innerHTML = `<ul class="transaction-list">${transactionItems}</ul>`;
}

/**
 * Update pagination button states
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 * @param {boolean} hasNextPage - Whether there is a next page
 */
function togglePaginationButtons(hasPreviousPage, hasNextPage) {
  prevBtn.disabled = !hasPreviousPage;
  nextBtn.disabled = !hasNextPage;
  currentPageText.textContent = `Page: ${currentPage + 1}`;
}

// Event listeners for pagination controls
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    fetchTransactions(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchTransactions(currentPage);
});

// Initial fetch to load the first page
fetchTransactions(currentPage);
