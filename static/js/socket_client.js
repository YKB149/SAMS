(function() {
    'use strict';

    function setupSocketIO(lectureName, date, time) {
        const socket = io({
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        
        // Connection status
        socket.on('connect', function() {
            console.log('Socket.IO connected!');
        });
        
        socket.on('disconnect', function() {
            console.log('Socket.IO disconnected');
        });
        
        socket.on('connect_error', function(err) {
            console.error('Socket.IO connection error:', err);
        });

        // Attendance updates
        socket.on('new_attendance', function(data) {
            console.log('New attendance received:', data);
            
            // Update the UI with the new attendance
            const attendanceList = document.querySelector('.attendance-list ul');
            if (!attendanceList) return;
            
            // If lecture details are provided, filter by them
            if (lectureName && date && time) {
                if (data.lecture_name !== lectureName || 
                    data.date !== date || 
                    data.time !== time) {
                    return;
                }
            }
            
            // Add the attendance to the list
            const newItem = document.createElement('li');
            newItem.textContent = `${data.student_name} (${data.roll_no})`;
            attendanceList.appendChild(newItem);
        });
        
        return socket;
    }
    
    // Expose function to global scope
    window.setupSocketIO = setupSocketIO;
})();
