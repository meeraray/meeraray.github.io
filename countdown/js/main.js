var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// npx babel --watch src --out-dir js --presets react-app/prod
var startDate = new Date("2020 march 7");
var endDate = new Date("2021 august 30");
var msDay = 1000 * 60 * 60 * 24;

function dayDiff(start, end) {
    return Math.round((end - start) / msDay);
}

function setSize(size) {
    var root = document.documentElement;
    root.style.setProperty("--size", size + "px");
}

function isOverflowing() {
    var cH = document.querySelector("#header").clientHeight + document.querySelector("#content").clientHeight;
    //let sH = document.documentElement.scrollHeight;
    var sH = window.innerHeight;
    console.log(cH, sH);
    return cH > sH;
}

// Chooses marker size based on window
function setCorrectSize() {
    var s = 0;
    do {
        setSize(s);
        s++;
    } while (!isOverflowing());

    setSize(s - 2);
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

//function Markers(props) {
//    
//}

var Markers = function (_React$Component) {
    _inherits(Markers, _React$Component);

    function Markers() {
        _classCallCheck(this, Markers);

        return _possibleConstructorReturn(this, (Markers.__proto__ || Object.getPrototypeOf(Markers)).apply(this, arguments));
    }

    _createClass(Markers, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            setCorrectSize();
        }
    }, {
        key: "render",
        value: function render() {
            var range = dayDiff(startDate, endDate);
            var keys = [].concat(_toConsumableArray(Array(range).keys()));
            var finished = dayDiff(startDate, this.props.date);
            var elems = keys.map(function (i) {
                if (i < finished) {
                    return React.createElement("div", { className: "marker full", key: i });
                } else {
                    return React.createElement("div", { className: "marker blank", key: i });
                }
            });
            return elems;
        }
    }]);

    return Markers;
}(React.Component);

window.onresize = setCorrectSize;

ReactDOM.render(React.createElement(CountHeader, { date: new Date() }), document.querySelector("#header"));

ReactDOM.render(React.createElement(Markers, { date: new Date() }), document.querySelector("#content"));