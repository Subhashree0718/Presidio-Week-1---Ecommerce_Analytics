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
function recommend(productId) {
    const related = coPurchaseMap[productId] || {};
    const sorted = Object.entries(related)
        .sort((a,b)=> b[1]-a[1])
        .filter(([_,count]) => count / Object.values(related).reduce((s,c)=> s+c,0) >= 0.3)
        .slice(0,3)
        .map(e => e[0]);
    return sorted;
}

module.exports = { updateCoPurchase, recommend };


