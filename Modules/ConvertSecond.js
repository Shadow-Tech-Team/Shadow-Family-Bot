export default function ConvertSecond(Seconds) {
    Seconds = Number(Seconds);
    let Hour = Math.floor(Seconds / 3600);
    let Minute = Math.floor(Seconds % 3600 / 60);
    let Second = Math.floor(Seconds % 3600 % 60);

    return {
        Hours: Hour > 0 ? Hour + (Hour == 1 ? " Saat, " : " Saat, ") : "0",
        Minutes: Minute > 0 ? Minute + (Minute == 1 ? " Daghighe, " : " Daghighe, ") : "0",
        Seconds: Second > 0 ? Second + (Second == 1 ? " Sanie" : " Sanie") : "0"
    }
}