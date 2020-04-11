var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    var obj = {
        book_reviews: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllTypes(data) {
    var allTypes = [];
    for(var i = 0; i < data.length; i++) {
        var types = data[i].type;
        for(var j = 0; j < types.length; j++) {
            if(!~allTypes.indexOf(types[j])) allTypes.push(types[j]);
        }
    }
    return allTypes;
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllTypes: getAllTypes
}
