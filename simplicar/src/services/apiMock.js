// =============================================================================================== Veículos

let vehicles = [
    {
        id: 1,
        plate: "ABC1D23",
        brand: "Volkswagen",
        model: "Gol 1.0",
        year: "2018",
        color: "Branco",
        fipeValue: "26500",
        referenceMonth: "2025-08",
        mileage: "42000",
        purchaseValue: "25000",
        saleValue: "27000",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Troca de óleo", value: "120" },
            { description: "Pneus novos", value: "600" }
        ],
        notes: "Carro em bom estado, único dono.",
        type: "car",
        dtCreated: "2025-08-10"
    },
    {
        id: 2,
        plate: "DEF2G45",
        brand: "Volkswagen",
        model: "Golf",
        year: "2020",
        color: "Preto",
        fipeValue: "48000",
        referenceMonth: "2025-08",
        mileage: "27000",
        purchaseValue: "42000",
        saleValue: "48000",
        tradeInValue: "",
        sold: "nao",
        expenses: [
            { description: "Revisão geral", value: "350" }
        ],
        notes: "Pouco rodado, todas revisões feitas.",
        type: "car",
        dtCreated: "2025-08-15"
    },
    {
        id: 3,
        plate: "GHI3J67",
        brand: "Fiat",
        model: "Uno",
        year: "2015",
        color: "Vermelho",
        fipeValue: "22000",
        referenceMonth: "2025-08",
        mileage: "82000",
        purchaseValue: "19000",
        saleValue: "21500",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Troca de correia dentada", value: "350" }
        ],
        notes: "Carro econômico.",
        type: "car",
        dtCreated: "2025-08-20"
    },
    {
        id: 4,
        plate: "JKL4M89",
        brand: "Chevrolet",
        model: "Onix",
        year: "2019",
        color: "Azul",
        fipeValue: "48000",
        referenceMonth: "2025-08",
        mileage: "35000",
        purchaseValue: "46000",
        saleValue: "49000",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Troca de pastilhas de freio", value: "220" }
        ],
        notes: "Sem detalhes.",
        type: "car",
        dtCreated: "2025-08-25"
    },
    {
        id: 5,
        plate: "MNO5P01",
        brand: "Renault",
        model: "Sandero",
        year: "2017",
        color: "Prata",
        fipeValue: "32000",
        referenceMonth: "2025-08",
        mileage: "58000",
        purchaseValue: "30000",
        saleValue: "33800",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Troca de pneus", value: "600" }
        ],
        notes: "",
        type: "car",
        dtCreated: "2025-09-01"
    },
    {
        id: 6,
        plate: "PQR6S23",
        brand: "Honda",
        model: "Civic",
        year: "2016",
        color: "Cinza",
        fipeValue: "65000",
        referenceMonth: "2025-08",
        mileage: "91000",
        purchaseValue: "60000",
        saleValue: "66000",
        tradeInValue: "",
        sold: "nao",
        expenses: [
            { description: "Reparo na suspensão", value: "900" }
        ],
        notes: "Reparo recente.",
        type: "car",
        dtCreated: "2025-09-05"
    },
    {
        id: 7,
        plate: "STU7V45",
        brand: "Toyota",
        model: "Corolla",
        year: "2021",
        color: "Branco",
        fipeValue: "102000",
        referenceMonth: "2025-08",
        mileage: "12000",
        purchaseValue: "97000",
        saleValue: "104000",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Polimento", value: "180" }
        ],
        notes: "Sem detalhes.",
        type: "car",
        dtCreated: "2025-09-08"
    },
    {
        id: 8,
        plate: "VWX8Y67",
        brand: "Ford",
        model: "Ka",
        year: "2014",
        color: "Preto",
        fipeValue: "18000",
        referenceMonth: "2025-08",
        mileage: "98000",
        purchaseValue: "15000",
        saleValue: "17500",
        tradeInValue: "",
        sold: "nao",
        expenses: [
            { description: "Troca de embreagem", value: "400" }
        ],
        notes: "Carro básico.",
        type: "car",
        dtCreated: "2025-09-10"
    },
    {
        id: 9,
        plate: "YZA9B01",
        brand: "Hyundai",
        model: "HB20",
        year: "2018",
        color: "Prata",
        fipeValue: "52000",
        referenceMonth: "2025-08",
        mileage: "41000",
        purchaseValue: "50000",
        saleValue: "53500",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Troca de bateria", value: "320" }
        ],
        notes: "Único dono.",
        type: "car",
        dtCreated: "2025-09-12"
    },
    {
        id: 10,
        plate: "BCD0E12",
        brand: "Jeep",
        model: "Renegade",
        year: "2022",
        color: "Azul",
        fipeValue: "119000",
        referenceMonth: "2025-08",
        mileage: "10000",
        purchaseValue: "115000",
        saleValue: "121000",
        tradeInValue: "",
        sold: "nao",
        expenses: [
            { description: "Lavagem", value: "80" }
        ],
        notes: "Novo.",
        type: "car",
        dtCreated: "2025-09-14"
    },
    // Dois registros de moto
    {
        id: 11,
        plate: "MOTO1A23",
        brand: "Honda",
        model: "CB 500F",
        year: "2020",
        color: "Preto",
        fipeValue: "28000",
        referenceMonth: "2025-08",
        mileage: "15000",
        purchaseValue: "25000",
        saleValue: "28000",
        tradeInValue: "",
        sold: "nao",
        expenses: [
            { description: "Troca de óleo", value: "100" }
        ],
        notes: "Moto em ótimo estado.",
        type: "moto",
        dtCreated: "2025-09-15"
    },
    {
        id: 12,
        plate: "MOTO2B45",
        brand: "Yamaha",
        model: "MT-07",
        year: "2021",
        color: "Azul",
        fipeValue: "35000",
        referenceMonth: "2025-08",
        mileage: "8000",
        purchaseValue: "33000",
        saleValue: "36000",
        tradeInValue: "",
        sold: "sim",
        expenses: [
            { description: "Revisão completa", value: "300" }
        ],
        notes: "Moto quase nova.",
        type: "moto",
        dtCreated: "2025-09-15"
    }
];


export function getVehicles(type = 'car') {
    return new Promise(resolve => {
        setTimeout(() => {
            const filtered = vehicles.filter(v => v.type === type);
            resolve([...filtered]);
        }, 500);
    });
}

export function getVehicleById(id, type = 'car') {
    return new Promise(resolve => {
        setTimeout(() => {
            const found = vehicles.find(v => v.id === id && v.type === type);
            resolve(found || null);
        }, 500);
    });
}

export function getVehicleByPlate(plate, type = 'car') {
    return new Promise(resolve => {
        setTimeout(() => {
            const found = vehicles.find(v => v.plate === plate && v.type === type);

            if (found) {
                const {
                    plate,
                    brand,
                    model,
                    year,
                    color,
                    fipeValue,
                    referenceMonth
                } = found;

                resolve({ plate, brand, model, year, color, fipeValue, referenceMonth });
            } else {
                resolve(null);
            }
        }, 500);
    });
}

export function getVehicleByPlateOrModel(search, type = 'car') {
    return new Promise(resolve => {
        setTimeout(() => {
            const searchUpper = search.trim().toUpperCase();

            const found = vehicles.filter(
                v =>
                    (v.plate.toUpperCase().includes(searchUpper) ||
                        v.model.toUpperCase().includes(searchUpper)) &&
                    v.type === type
            );

            resolve(found);
        }, 500);
    });
}


export function addVehicle(vehicle) {
    return new Promise(resolve => {
        setTimeout(() => {
            const newVehicle = { ...vehicle, id: vehicles.length + 1 };
            vehicles.push(newVehicle);
            resolve(newVehicle);
        }, 500);
    });
}

export function deleteVehicle(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            vehicles = vehicles.filter(v => v.id !== id);
            resolve();
        }, 500);
    });
}

export function getFinancialSummary(startDate, endDate, type = null) {
    return new Promise(resolve => {
        setTimeout(() => {
            let filtered = vehicles.filter(v => {
                return (
                    v.dtCreated >= startDate &&
                    v.dtCreated <= endDate &&
                    (!type || v.type === type)
                );
            });

            const totalComprados = filtered.length;
            const totalVendidos = filtered.filter(v => v.sold === "sim").length;
            const valorCompras = filtered.reduce((acc, v) => acc + Number(v.purchaseValue), 0);
            const valorVendas = filtered.filter(v => v.sold === "sim").reduce((acc, v) => acc + Number(v.saleValue), 0);
            const valorDespesas = filtered.reduce(
                (acc, v) => acc + v.expenses.reduce((sum, e) => sum + Number(e.value), 0),
                0
            );
            const lucroBruto = valorVendas - valorCompras - valorDespesas;

            resolve({
                totalComprados,
                totalVendidos,
                valorCompras,
                valorVendas,
                valorDespesas,
                lucroBruto,
                listaVeiculos: filtered
            });
        }, 500);
    });
}

// ===============================================================================================  Usuários
const usersMock = [
    {
        id: 1,
        login: "caiodicatti",
        name: "Caio Dicatti",
        email: "caio@email.com",
        birthDate: "1990-01-01",
        role: "admin",
        active: true
    }
];

export function getCurrentUser() {
    return new Promise(resolve => setTimeout(() => resolve(usersMock[0]), 500));
};

export function saveProfile(data) {
    usersMock[0] = { ...usersMock[0], ...data };
    return new Promise(resolve => setTimeout(() => resolve(usersMock[0]), 500));
}


// ===============================================================================================  Export

export default { getVehicles, addVehicle, deleteVehicle, getVehicleById, getVehicleByPlate, getVehicleByPlateOrModel, getFinancialSummary, getCurrentUser, saveProfile };