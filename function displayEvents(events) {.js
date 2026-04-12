function displayEvents(events) {
    // 显示太阳星座事件
    const sunEventsList = document.getElementById('sun-events');
    events.sun_sign.events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        sunEventsList.appendChild(li);
    });
    
    // 显示上升星座事件
    const ascEventsList = document.getElementById('asc-events');
    events.asc_sign.events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        ascEventsList.appendChild(li);
    });
    
    // 显示相位事件
    const aspectEventsDiv = document.getElementById('aspect-events');
    events.aspect_events.forEach(group => {
        const section = document.createElement('div');
        section.className = 'aspect-group';
        
        const heading = document.createElement('h5');
        heading.textContent = group.query;
        section.appendChild(heading);
        
        const ul = document.createElement('ul');
        group.events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            ul.appendChild(li);
        });
        
        section.appendChild(ul);
        aspectEventsDiv.appendChild(section);
    });
}
