const formatDate = (date:Date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const yesterday = () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    return formatDate(yesterday)
}