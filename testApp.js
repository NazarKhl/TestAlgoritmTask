// Funkcja do obliczenia pierwszej niedzieli miesiąca
function getFirstSunday(year, month) {
    var date = new Date(year, month - 1, 1); // Pierwszy dzień miesiąca
    var dayOfWeek = date.getDay(); // Niedziela = 0, Poniedziałek = 1, ...
    var daysToSunday = (7 - dayOfWeek) % 7;
    date.setDate(date.getDate() + daysToSunday);
    return date.getDate();
}
// Pierwsza wersja rozwiązania (niezoptymalizowana)
function solution1(expenses) {
    var data = [];
    for (var yearMonth in expenses) {
        var _a = yearMonth.split('-').map(Number), year = _a[0], month = _a[1];
        var firstSunday = getFirstSunday(year, month);
        // Zbieranie wydatków do pierwszej niedzieli
        var days = expenses[yearMonth];
        for (var day in days) {
            if (Number(day) <= firstSunday) {
                for (var category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }
    // Obliczanie mediany
    if (data.length === 0)
        return null;
    data.sort(function (a, b) { return a - b; });
    var mid = Math.floor(data.length / 2);
    return data.length % 2 === 0 ? (data[mid - 1] + data[mid]) / 2 : data[mid];
}
// Druga wersja rozwiązania z wykorzystaniem algorytmu Quickselect
function solution2(expenses) {
    var data = [];
    for (var yearMonth in expenses) {
        var _a = yearMonth.split('-').map(Number), year = _a[0], month = _a[1];
        var firstSunday = getFirstSunday(year, month);
        // Zbieranie wydatków do pierwszej niedzieli
        var days = expenses[yearMonth];
        for (var day in days) {
            if (Number(day) <= firstSunday) {
                for (var category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }
    // Obliczanie mediany za pomocą Quickselect
    if (data.length === 0)
        return null;
    var n = data.length;
    if (n % 2 === 1) {
        return quickSelect(data, Math.floor(n / 2));
    }
    else {
        var left = quickSelect(data, Math.floor(n / 2) - 1);
        var right = quickSelect(data, Math.floor(n / 2));
        return (left + right) / 2;
    }
}
// Funkcja pomocnicza do Quickselect
function quickSelect(arr, k) {
    if (arr.length === 1)
        return arr[0];
    var pivot = arr[arr.length - 1];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    if (k < left.length) {
        return quickSelect(left, k);
    }
    else if (k > left.length) {
        return quickSelect(right, k - left.length - 1);
    }
    else {
        return pivot;
    }
}
// Przykładowe dane
var expenses = {
    "2023-01": {
        "01": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
};
// Uruchomienie obu wersji rozwiązania
console.log("Wynik Solution 1:", solution1(expenses)); // Mediana lub null
console.log("Wynik Solution 2:", solution2(expenses)); // Mediana lub null
