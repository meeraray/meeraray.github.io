var startDate = new Date("2020 march 7");
var msDay = 1000 * 60 * 60 * 24;

function DaysSince(props) {
    return React.createElement(
        "h1",
        null,
        Math.round((props.date - startDate) / msDay),
        " days in quarantine."
    );
}

ReactDOM.render(React.createElement(DaysSince, { date: new Date() }), document.getElementById("header"));