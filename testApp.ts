// Funkcja do obliczenia pierwszej niedzieli miesiąca
function getFirstSunday(year: number, month: number): number {
    const date = new Date(year, month - 1, 1); // Pierwszy dzień miesiąca
    const dayOfWeek = date.getDay(); // Niedziela = 0, Poniedziałek = 1, ...
    const daysToSunday = (7 - dayOfWeek) % 7;
    date.setDate(date.getDate() + daysToSunday);
    return date.getDate();
}

// Typи даних для expenses
type Expenses = {
    [yearMonth: string]: {
        [day: string]: {
            [category: string]: number[];
        };
    };
};

// Pierwsza wersja rozwiązania (niezoptymalizowana)
function solution1(expenses: Expenses): number | null {
    let data: number[] = [];

    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split('-').map(Number);
        const firstSunday = getFirstSunday(year, month);

        // Zbieranie wydatków do pierwszej niedzieli
        const days = expenses[yearMonth];
        for (const day in days) {
            if (Number(day) <= firstSunday) {
                for (const category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }

    // Obliczanie mediany
    if (data.length === 0) return null;
    data.sort((a, b) => a - b);
    const mid = Math.floor(data.length / 2);
    return data.length % 2 === 0 ? (data[mid - 1] + data[mid]) / 2 : data[mid];
}

// Druga wersja rozwiązania z wykorzystaniem algorytmu Quickselect
function solution2(expenses: Expenses): number | null {
    let data: number[] = [];

    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split('-').map(Number);
        const firstSunday = getFirstSunday(year, month);

        // Zbieranie wydatków do pierwszej niedzieli
        const days = expenses[yearMonth];
        for (const day in days) {
            if (Number(day) <= firstSunday) {
                for (const category in days[day]) {
                    data = data.concat(days[day][category]);
                }
            }
        }
    }

    // Obliczanie mediany za pomocą Quickselect
    if (data.length === 0) return null;
    const n = data.length;
    if (n % 2 === 1) {
        return quickSelect(data, Math.floor(n / 2));
    } else {
        const left = quickSelect(data, Math.floor(n / 2) - 1);
        const right = quickSelect(data, Math.floor(n / 2));
        return (left + right) / 2;
    }
}

// Funkcja pomocnicza do Quickselect
function quickSelect(arr: number[], k: number): number {
    if (arr.length === 1) return arr[0];

    const pivot = arr[arr.length - 1];
    const left: number[] = [];
    const right: number[] = [];

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
const expenses: Expenses = {
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
