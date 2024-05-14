export function parseDate(dateStr) {
    try {
        // Parse the date string into a Date object
        const dateObject = new Date(dateStr);
        // Extract month name and year
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[dateObject.getMonth()];
        const year = dateObject.getFullYear();
        return `${monthName} ${year}`;
    } catch (error) {
        // Handle invalid date format
        console.error("Invalid date format");
        return null;
    }
}
