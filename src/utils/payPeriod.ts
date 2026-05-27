export type PayFrequency =
    | "daily"
    | "weekly"
    | "biweekly"
    | "semi-monthly"
    | "monthly";

export function getCurrentPayPeriod(
    date: Date,
    frequency: PayFrequency
) {
    if (frequency === "semi-monthly") {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        if (day <= 15) {
            return {
                start: new Date(year, month, 1),
                end: new Date(year, month, 15),
            };
        }

        return {
            start: new Date(year, month, 16),
            end: new Date(year, month + 1, 0),
        };
    }

    return {
        start: date,
        end: date,
    };
}


// Formats a pay period date range into readable text.
// Example: May 16 – May 31
export function formatPayPeriod(start: Date, end: Date) {

    const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    });

    return `${formatter.format(start)} – ${formatter.format(end)}`;
}