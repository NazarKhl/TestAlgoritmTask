// Funkcja do obliczenia pierwszej niedzieli miesiąca
function getFirstSunday(year, month) {
    let date = new Date(year, month - 1, 1); // Pierwszy dzień miesiąca
    let dayOfWeek = date.getDay(); // Niedziela = 0, Poniedziałek = 1, ...
    let daysToSunday = (7 - dayOfWeek) % 7;
    date.setDate(date.getDate() + daysToSunday);
    return date.getDate();
}

// Pierwsza wersja rozwiązania (niezoptymalizowana)
function solution1(expenses) {
    let data = [];

    for (let yearMonth in expenses) {
        let [year, month] = yearMonth.split('-').map(Number);
        let firstSunday = getFirstSunday(year, month);

        // Zbieranie wydatków do pierwszej niedzieli
        let days = expenses[yearMonth];
        for (let day in days) {
            if (Number(day) <= firstSunday) {
                for (let category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }

    // Obliczanie mediany
    if (data.length === 0) return null;
    data.sort((a, b) => a - b);
    let mid = Math.floor(data.length / 2);
    return data.length % 2 === 0 ? (data[mid - 1] + data[mid]) / 2 : data[mid];
}

// Druga wersja rozwiązania z wykorzystaniem algorytmu Quickselect
function solution2(expenses) {
    let data = [];

    for (let yearMonth in expenses) {
        let [year, month] = yearMonth.split('-').map(Number);
        let firstSunday = getFirstSunday(year, month);

        // Zbieranie wydatków do pierwszej niedzieli
        let days = expenses[yearMonth];
        for (let day in days) {
            if (Number(day) <= firstSunday) {
                for (let category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }

    // Obliczanie mediany za pomocą Quickselect
    if (data.length === 0) return null;
    let n = data.length;
    if (n % 2 === 1) {
        return quickSelect(data, Math.floor(n / 2));
    } else {
        let left = quickSelect(data, Math.floor(n / 2) - 1);
        let right = quickSelect(data, Math.floor(n / 2));
        return (left + right) / 2;
    }
}

// Druga wersja rozwiązania z wykorzystaniem algorytmu Quickselect
// W tej wersji używamy Quickselect, aby zoptymalizować obliczenie mediany.
// Quickselect działa w średnim czasie O(n), co jest bardziej efektywne niż O(n log n) przy sortowaniu.

// Zalety Quickselect:
// 1. Średnia złożoność czasowa O(n), co jest szybsze niż sortowanie O(n log n).
// 2. Prosta implementacja bazująca na algorytmie QuickSort.
// 3. Znalezienie mediany bez pełnego sortowania tablicy.

// Wady Quickselect:
// 1. Złożoność w najgorszym przypadku wynosi O(n²), ale zdarza się to rzadko.
// 2. Algorytm nie jest stabilny (nie zachowuje kolejności elementów o tych samych wartościach).
// 3. Wykorzystuje rekurencję, co może prowadzić do błędów przy dużych danych.

// Funkcja pomocnicza do Quickselect
function quickSelect(arr, k) {
    if (arr.length === 1) return arr[0];

    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    if (k < left.length) {
        return quickSelect(left, k);
    } else if (k > left.length) {
        return quickSelect(right, k - left.length - 1);
    } else {
        return pivot;
    }
}

// Przykładowe dane
const expenses = {
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
