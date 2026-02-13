export const thousandsStamp = (x) => {
    if (x === undefined || x === null) {
        return '0';
    }
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}