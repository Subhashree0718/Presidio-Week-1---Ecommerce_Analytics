const coPurchaseMap = {};

function updateCoPurchase(products) {
    for (let i = 0; i < products.length; i++) {
        const a = products[i];
        if (!coPurchaseMap[a]) coPurchaseMap[a] = {};
        for (let j = 0; j < products.length; j++) {
            if (i === j) continue;
            const b = products[j];
            coPurchaseMap[a][b] = (coPurchaseMap[a][b] || 0) + 1;
        }
    }
}

module.exports = { updateCoPurchase };
