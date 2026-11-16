document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initEndpointTesters();
  initCopyButtons();
  initPingAll();
});

/**
 * 1. Generate subtle floating ambient particles in the background
 */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleCount = 24;
  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('particle');

    const size = Math.random() * 4 + 2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 12 + 10}s`;
    dot.style.animationDelay = `${Math.random() * 8}s`;

    container.appendChild(dot);
  }
}

/**
 * 2. Attach click listeners to every "Test API" button
 */
function initEndpointTesters() {
  const testButtons = document.querySelectorAll('.test-btn');

  testButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const endpointUrl = button.getAttribute('data-url');
      const targetKey = button.getAttribute('data-target');
      executeApiRequest(endpointUrl, targetKey, button);
    });
  });
}

/**
 * 3. Execute a real HTTP GET request using fetch() and render the Express response
 */
async function executeApiRequest(url, targetKey, button) {
  const statusBadge = document.getElementById(`status-${targetKey}`);
  const outputConsole = document.getElementById(`output-${targetKey}`);
  const timeBadge = document.getElementById(`time-${targetKey}`);
  const copyBtn = document.querySelector(`[data-copy-target="output-${targetKey}"]`);
  const btnText = button.querySelector('.btn-text');

  // If testing the 404 middleware bar, reveal its hidden console box
  if (targetKey === 'error') {
    const errorWrapper = document.getElementById('error-console-wrapper');
    if (errorWrapper) errorWrapper.classList.remove('hidden');
  }

  // Enter Loading State
  button.disabled = true;
  if (btnText) btnText.textContent = 'Fetching...';
  if (statusBadge) {
    statusBadge.className = 'status-pill status-loading';
    statusBadge.textContent = 'LOADING...';
  }
  if (outputConsole) {
    outputConsole.textContent = `// Dispatching GET ${url} to Express backend...`;
  }

  const startTime = performance.now();

  try {
    // Real network request to Express server
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    const elapsedMs = Math.round(performance.now() - startTime);
    const data = await response.json();
    const formattedJson = JSON.stringify(data, null, 2);

    // Update JSON output & latency
    if (outputConsole) outputConsole.textContent = formattedJson;
    if (timeBadge) timeBadge.textContent = `${elapsedMs} ms`;

    const globalLatency = document.getElementById('global-latency');
    if (globalLatency) globalLatency.textContent = `${elapsedMs} ms`;

    // Update HTTP Status Pill based on response.ok (200-299 vs 400-599)
    if (statusBadge) {
      if (response.ok) {
        statusBadge.className = 'status-pill status-ok';
        statusBadge.textContent = `${response.status} ${response.statusText || 'OK'}`;
      } else {
        statusBadge.className = 'status-pill status-err';
        statusBadge.textContent = `${response.status} ${response.statusText || 'ERROR'}`;
      }
    }

    // Enable Copy JSON button
    if (copyBtn) copyBtn.disabled = false;
  } catch (networkError) {
    // Runs if the Express server is stopped or unreachable
    if (statusBadge) {
      statusBadge.className = 'status-pill status-err';
      statusBadge.textContent = 'NETWORK ERROR';
    }
    if (outputConsole) {
      outputConsole.textContent = JSON.stringify(
        {
          success: false,
          error: 'Connection Failed',
          message: 'Could not reach Express server. Ensure "npm run dev" is running on port 3000.',
          details: networkError.message
        },
        null,
        2
      );
    }
  } finally {
    // Restore button state
    button.disabled = false;
    if (btnText) {
      btnText.textContent = targetKey === 'error' ? 'Trigger 404 JSON' : 'Test API';
    }
  }
}

/**
 * 4. Copy formatted JSON response to clipboard with visual feedback
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      try {
        await navigator.clipboard.writeText(codeElement.textContent);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1600);
      } catch (err) {
        btn.textContent = 'Copy Failed';
      }
    });
  });
}

/**
 * 5. Hero "Ping All Endpoints" button triggers both GET / and GET /about
 */
function initPingAll() {
  const pingAllBtn = document.getElementById('test-all-btn');
  if (!pingAllBtn) return;

  pingAllBtn.addEventListener('click', () => {
    const rootBtn = document.querySelector('.test-btn[data-target="root"]');
    const aboutBtn = document.querySelector('.test-btn[data-target="about"]');
    if (rootBtn) rootBtn.click();
    if (aboutBtn) aboutBtn.click();
  });
}