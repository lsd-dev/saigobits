// ==========================================================================
// Google Forms Integration Configuration
// To link this form to a production Google Form, set enabled to true
// and update formActionUrl and entryMappings with your Google Form values.
// ==========================================================================
const GOOGLE_FORM_CONFIG = {
    enabled: false,
    formActionUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
    entryMappings: {
        "name": "entry.111111111",      // Full Name
        "email": "entry.222222222",     // Email Address
        "service": "entry.333333333",   // Required Service
        "message": "entry.444444444"    // Inquiry Details
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initGstCalculator();
    initSimulatedScraper();
    initContactForm();
});

/**
 * GST Tax Calculator Logic
 */
function initGstCalculator() {
    const amountInput = document.getElementById('amount');
    const gstRateRadios = document.getElementsByName('gst-rate');
    const btnExclusive = document.getElementById('calc-exclusive');
    const btnInclusive = document.getElementById('calc-inclusive');
    
    const resOriginal = document.getElementById('res-original');
    const resCgst = document.getElementById('res-cgst');
    const resSgst = document.getElementById('res-sgst');
    const resTotal = document.getElementById('res-total');
    
    let calcType = 'exclusive'; // exclusive or inclusive
    
    function calculate() {
        const principal = parseFloat(amountInput.value) || 0;
        let gstRate = 18;
        
        // Find checked radio value
        for (const radio of gstRateRadios) {
            if (radio.checked) {
                gstRate = parseFloat(radio.value);
                break;
            }
        }
        
        let originalVal = 0;
        let cgstVal = 0;
        let sgstVal = 0;
        let totalVal = 0;
        
        if (calcType === 'exclusive') {
            const tax = principal * (gstRate / 100);
            originalVal = principal;
            cgstVal = tax / 2;
            sgstVal = tax / 2;
            totalVal = principal + tax;
        } else {
            const preTax = principal / (1 + (gstRate / 100));
            const tax = principal - preTax;
            originalVal = preTax;
            cgstVal = tax / 2;
            sgstVal = tax / 2;
            totalVal = principal;
        }
        
        // Format currency
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        
        resOriginal.textContent = formatter.format(originalVal);
        resCgst.textContent = formatter.format(cgstVal);
        resSgst.textContent = formatter.format(sgstVal);
        resTotal.textContent = formatter.format(totalVal);
    }
    
    // Bind Events
    amountInput.addEventListener('input', calculate);
    amountInput.addEventListener('keyup', calculate);
    
    gstRateRadios.forEach(radio => {
        radio.addEventListener('change', calculate);
    });
    
    btnExclusive.addEventListener('click', () => {
        calcType = 'exclusive';
        btnExclusive.classList.add('active');
        btnInclusive.classList.remove('active');
        calculate();
    });
    
    btnInclusive.addEventListener('click', () => {
        calcType = 'inclusive';
        btnInclusive.classList.add('active');
        btnExclusive.classList.remove('active');
        calculate();
    });
    
    // Initial Calc
    calculate();
}

/**
 * Simulated Web Scraper Logic
 */
function initSimulatedScraper() {
    const triggerBtn = document.getElementById('trigger-scrape-btn');
    const statusText = document.getElementById('scraper-status-text');
    const pulseDot = document.querySelector('.pulse-dot');
    const timeEl = document.getElementById('scraper-time');
    
    const valGst = document.getElementById('val-gst-filing');
    const valRepo = document.getElementById('val-repo-rate');
    const valUsd = document.getElementById('val-usd-inr');
    const valTax = document.getElementById('val-tax-rate');
    
    const rateCards = document.querySelectorAll('.rate-card');
    
    let isScraping = false;
    
    // Initial timestamp check
    let lastScrapeTime = new Date();
    
    // Update elapsed time every 10 seconds
    setInterval(() => {
        const elapsed = Math.round((new Date() - lastScrapeTime) / 1000);
        if (elapsed < 5) {
            timeEl.textContent = 'Just Now';
        } else if (elapsed < 60) {
            timeEl.textContent = `${elapsed}s ago`;
        } else {
            timeEl.textContent = `${Math.round(elapsed / 60)}m ago`;
        }
    }, 10000);

    async function runScraper() {
        if (isScraping) return;
        isScraping = true;
        
        // Update statuses
        statusText.textContent = 'Scraper Status: Connecting...';
        pulseDot.classList.add('scraping');
        triggerBtn.disabled = true;
        triggerBtn.textContent = 'Scraping...';
        
        // Clear highlight states
        rateCards.forEach(c => c.classList.remove('highlight'));
        
        // Sequential flash steps simulating scrapers hitting portals
        const portals = [
            { card: rateCards[0], text: 'Scraping GST Portal...' },
            { card: rateCards[1], text: 'Scraping Central Bank...' },
            { card: rateCards[2], text: 'Scraping Finance Stream...' },
            { card: rateCards[3], text: 'Scraping Tax Portal...' }
        ];
        
        for (let i = 0; i < portals.length; i++) {
            statusText.textContent = `Scraper: ${portals[i].text}`;
            portals[i].card.classList.add('highlight');
            // Temporary flashing rate value
            const valEl = portals[i].card.querySelector('.rate-value');
            const originalVal = valEl.textContent;
            valEl.textContent = 'LOADING...';
            
            await new Promise(r => setTimeout(r, 450));
            
            // Revert value back
            valEl.textContent = originalVal;
            portals[i].card.classList.remove('highlight');
        }
        
        // Update final figures randomly to prove live updates
        statusText.textContent = 'Scraper Status: Updating Records...';
        await new Promise(r => setTimeout(r, 200));
        
        // Update mock values
        const randomDays = Math.floor(Math.random() * 5) + 2;
        valGst.textContent = `GST-3B (Due in ${randomDays} Days)`;
        
        const randomRepo = (6.25 + Math.random() * 0.5).toFixed(2);
        valRepo.textContent = `${randomRepo}%`;
        
        const randomUsd = (82.90 + Math.random() * 0.9).toFixed(2);
        valUsd.textContent = `₹ ${randomUsd}`;
        
        // Success flash
        rateCards.forEach(c => c.classList.add('highlight'));
        setTimeout(() => rateCards.forEach(c => c.classList.remove('highlight')), 800);
        
        // Reset statuses
        isScraping = false;
        lastScrapeTime = new Date();
        timeEl.textContent = 'Just Now';
        statusText.textContent = 'Scraper Status: Active';
        pulseDot.classList.remove('scraping');
        triggerBtn.disabled = false;
        triggerBtn.textContent = 'Force Scrape Now';
    }
    
    triggerBtn.addEventListener('click', runScraper);
}

/**
 * Consultation Inquiry Form Submission
 */
function initContactForm() {
    const form = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success-msg');

    if (!form || !submitBtn || !successMsg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Booking Consultation...';

        if (GOOGLE_FORM_CONFIG.enabled) {
            const formData = new FormData();
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.name, document.getElementById('name').value.trim());
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.email, document.getElementById('email').value.trim());
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.service, document.getElementById('service-type').value);
            formData.append(GOOGLE_FORM_CONFIG.entryMappings.message, document.getElementById('message').value.trim());

            fetch(GOOGLE_FORM_CONFIG.formActionUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                successMsg.style.display = 'block';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            })
            .catch(err => {
                console.error('Submission error:', err);
                alert('We encountered an error sending your request. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        } else {
            // Simulated local timer
            setTimeout(() => {
                successMsg.style.display = 'block';
                form.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1000);
            }, 1200);
        }
    });
}
