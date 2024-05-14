export function calculateTimeSincePosted (date){
    const currentDate = new Date();
    const postedDate = new Date(date);
    const timeDifference = currentDate - postedDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if(weeks > 0) {
        return `${weeks}w ago`;
    } else if(days > 0) {
        return `${days}d ago`;
    } else if(hours > 0) {
        return `${hours}h ago`;
    } else if(minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `Posted now`;
    }
};