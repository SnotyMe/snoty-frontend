const dateTimeFormat = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
});

export function formatDate(date: Date): string {
    try {
        return dateTimeFormat.format(date);
    } catch (e) {
        console.error("Error formatting date", date, e);
        throw e;
    }
}

/**
 * Longest possible formatted date string length
 */
export const formattedDateLength =
    dateTimeFormat
        .format(
            new Date(2000, 11, 31, 23, 59, 59)
        )
        .length;
