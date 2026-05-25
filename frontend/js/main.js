function filterCourses(category) {
    const cards = document.querySelectorAll('.course-card');
    const steps = document.querySelectorAll('.step');
    const filterStatus = document.getElementById('filter-status');
    const activeText = document.getElementById('active-category');

    // 1. Manage "Active" Step Highlighting
    steps.forEach(step => {
        // Remove active class from all steps
        step.classList.remove('active');
        
        // If the step's onclick matches the category, add active class
        if (step.getAttribute('onclick').includes(`'${category}'`)) {
            step.classList.add('active');
        }
    });

    // 2. Handle Filter Status Bar
    if (category === 'all') {
        if (filterStatus) filterStatus.style.display = "none";
        steps.forEach(s => s.classList.remove('active')); // Reset steps on 'All'
    } else {
        if (filterStatus) {
            filterStatus.style.display = "block";
            activeText.innerText = category.toUpperCase().replace('_', ' ');
        }
    }

    // 3. Filter the Cards
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = "block";
            card.style.opacity = "1";
        } else {
            card.style.opacity = "0";
            card.style.display = "none";
        }
    });
}