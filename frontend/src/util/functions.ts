export const ellipsis = (text: string): string => {
    if (text.length > 34) {
        return `${text.slice(0, 34)}...`;
    }
    return text;
}