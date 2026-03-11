
const fs = require('fs');
const path = require('path');

const talksData = [
    {
        title: "Introduction to Node.js",
        speakers: ["Alice Smith"],
        category: ["Backend", "JavaScript"],
        duration: 60, // minutes
        description: "A beginner-friendly introduction to Node.js, covering its core concepts and asynchronous nature."
    },
    {
        title: "Frontend with React Hooks",
        speakers: ["Bob Johnson"],
        category: ["Frontend", "React", "JavaScript"],
        duration: 60,
        description: "Dive deep into React Hooks for building efficient and reusable UI components."
    },
    {
        title: "CSS Grid and Flexbox Masterclass",
        speakers: ["Charlie Brown"],
        category: ["Frontend", "CSS"],
        duration: 60,
        description: "Master the art of modern CSS layouts with Grid and Flexbox for responsive designs."
    },
    {
        title: "Database Design for Scalability",
        speakers: ["Diana Prince", "Clark Kent"],
        category: ["Database", "Backend"],
        duration: 60,
        description: "Learn best practices for designing scalable database schemas for various applications."
    },
    {
        title: "API Security Fundamentals",
        speakers: ["Eve Adams"],
        category: ["Security", "Backend"],
        duration: 60,
        description: "Understand common API security vulnerabilities and how to mitigate them effectively."
    },
    {
        title: "Deployment Strategies with Docker",
        speakers: ["Frank White"],
        category: ["DevOps", "Containers"],
        duration: 60,
        description: "Explore different Docker deployment strategies for seamless application delivery."
    }
];

function generateSchedule(talks) {
    const startTime = new Date();
    startTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

    const schedule = [];
    let currentTime = startTime;

    for (let i = 0; i < talks.length; i++) {
        // Add talk
        const talkStartTime = new Date(currentTime);
        const talkEndTime = new Date(talkStartTime.getTime() + talks[i].duration * 60 * 1000);
        schedule.push({
            type: 'talk',
            ...talks[i],
            startTime: talkStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            endTime: talkEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        });
        currentTime = new Date(talkEndTime);

        // Add transition unless it's the last talk or before lunch
        if (i < talks.length - 1) {
            if (i === 2) { // Lunch after the 3rd talk (index 2)
                schedule.push({
                    type: 'break',
                    title: 'Lunch Break',
                    duration: 60,
                    startTime: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                    endTime: new Date(currentTime.getTime() + 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                });
                currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Advance time by 1 hour for lunch
                // Add transition after lunch
                schedule.push({
                    type: 'transition',
                    duration: 10,
                    startTime: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                    endTime: new Date(currentTime.getTime() + 10 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                });
                currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // Advance time by 10 minutes for transition
            } else {
                schedule.push({
                    type: 'transition',
                    duration: 10,
                    startTime: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                    endTime: new Date(currentTime.getTime() + 10 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                });
                currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // Advance time by 10 minutes for transition
            }
        }
    }
    return schedule;
}

const schedule = generateSchedule(talksData);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Talks Event</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #0056b3;
            text-align: center;
            margin-bottom: 30px;
        }
        .search-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .search-container input {
            width: 80%;
            max-width: 400px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .schedule-item {
            background-color: #e9ecef;
            border-left: 5px solid #007bff;
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 5px;
            display: flex;
            align-items: flex-start;
        }
        .schedule-item.break {
            background-color: #ffeeba;
            border-left-color: #ffc107;
        }
        .schedule-item.transition {
            background-color: #d1ecf1;
            border-left-color: #17a2b8;
            font-style: italic;
            color: #6c757d;
        }
        .time {
            font-weight: bold;
            margin-right: 15px;
            white-space: nowrap;
            color: #0056b3;
        }
        .details {
            flex-grow: 1;
        }
        .details h2 {
            margin-top: 0;
            color: #007bff;
            font-size: 1.2em;
        }
        .details p {
            margin: 5px 0;
            font-size: 0.9em;
        }
        .details .speakers {
            font-style: italic;
            color: #666;
        }
        .details .category {
            background-color: #007bff;
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8em;
            margin-right: 5px;
            display: inline-block;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Technical Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category..." onkeyup="filterTalks()">
        </div>

        <div id="schedule"></div>
    </div>

    <script>
        const scheduleData = ${JSON.stringify(schedule)};

        function renderSchedule(data) {
            const scheduleDiv = document.getElementById('schedule');
            scheduleDiv.innerHTML = ''; // Clear previous content

            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('schedule-item');
                if (item.type === 'break') {
                    itemDiv.classList.add('break');
                } else if (item.type === 'transition') {
                    itemDiv.classList.add('transition');
                } else {
                    // Add categories as data attributes for filtering
                    itemDiv.dataset.category = item.category.map(c => c.toLowerCase()).join(' ');
                }

                const timeSpan = document.createElement('span');
                timeSpan.classList.add('time');
                timeSpan.textContent = \`\${item.startTime} - \${item.endTime}\`;
                itemDiv.appendChild(timeSpan);

                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');

                if (item.type === 'talk') {
                    const title = document.createElement('h2');
                    title.textContent = item.title;
                    detailsDiv.appendChild(title);

                    const speakers = document.createElement('p');
                    speakers.classList.add('speakers');
                    speakers.textContent = \`Speaker(s): \${item.speakers.join(', ')}\`;
                    detailsDiv.appendChild(speakers);

                    const description = document.createElement('p');
                    description.textContent = item.description;
                    detailsDiv.appendChild(description);

                    const categoryContainer = document.createElement('p');
                    item.category.forEach(cat => {
                        const categorySpan = document.createElement('span');
                        categorySpan.classList.add('category');
                        categorySpan.textContent = cat;
                        categoryContainer.appendChild(categorySpan);
                    });
                    detailsDiv.appendChild(categoryContainer);

                } else if (item.type === 'break') {
                    const title = document.createElement('h2');
                    title.textContent = item.title;
                    detailsDiv.appendChild(title);
                } else if (item.type === 'transition') {
                    const title = document.createElement('h2');
                    title.textContent = \`Transition (\${item.duration} minutes)\`;
                    detailsDiv.appendChild(title);
                }
                itemDiv.appendChild(detailsDiv);
                scheduleDiv.appendChild(itemDiv);
            });
        }

        function filterTalks() {
            const searchTerm = document.getElementById('categorySearch').value.toLowerCase();
            const filteredSchedule = scheduleData.filter(item => {
                if (item.type === 'talk') {
                    return item.category.some(cat => cat.toLowerCase().includes(searchTerm));
                }
                // Always show breaks and transitions, regardless of search term
                return true;
            });
            renderSchedule(filteredSchedule);
        }

        // Initial render
        renderSchedule(scheduleData);
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('index.html generated successfully!');
