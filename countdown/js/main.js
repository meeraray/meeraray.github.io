function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var startDate = new Date("2020 march 7");
var endDate = new Date("2021 august 30");
var msDay = 1000 * 60 * 60 * 24;

function dayDiff(start, end) {
    return Math.round((end - start) / msDay);
}

function CountHeader(props) {
    return React.createElement(
        "h1",
        null,
        dayDiff(startDate, props.date),
        " days in quarantine \u2022 ",
        dayDiff(props.date, endDate),
        " days left"
    );
}

function Markers(props) {
    var range = dayDiff(startDate, endDate);
    var keys = [].concat(_toConsumableArray(Array(range).keys()));
    var finished = dayDiff(startDate, props.date);
    var elems = keys.map(function (i) {
        if (i < finished) {
            return React.createElement("div", { className: "marker full", key: i });
        } else {
            return React.createElement("div", { className: "marker blank", key: i });
        }
    });
    return elems;
}

ReactDOM.render(React.createElement(CountHeader, { date: new Date() }), document.querySelector("#header"));

ReactDOM.render(React.createElement(Markers, { date: new Date() }), document.querySelector("#content"));