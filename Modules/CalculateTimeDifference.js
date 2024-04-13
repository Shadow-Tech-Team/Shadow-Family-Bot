export function CalculateTimeDifference(dateFuture, dateNow) {
    let DifferentInMiliSecond = Math.abs(dateFuture - dateNow) / 1000;

    // calculate hours
    const Hours = Math.floor(DifferentInMiliSecond / 3600) ;
    DifferentInMiliSecond -= Hours * 3600;

    // calculate minutes
    const Minutes = Math.floor(DifferentInMiliSecond / 60) % 60;
    DifferentInMiliSecond -= Minutes * 60;

    // calculate secounds
    var FirstSecond = ~~DifferentInMiliSecond % 60;
    var ResaultSecond = Math.ceil(FirstSecond);

    return {
        Hours: (Hours === 0 || Hours === 1) ? Hours : Hours,
        Minutes: (Minutes === 0 || Hours === 1) ? Minutes : Minutes,
        Seconds: (Hours === 1 || Minutes === 1 ) ? ResaultSecond : ResaultSecond
    };
}