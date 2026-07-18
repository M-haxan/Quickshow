export const dateFormat = (date)=>{
    return new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        
    })
}