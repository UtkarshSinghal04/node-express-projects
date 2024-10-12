const Product = require('../models/product')

const getTaskStatic = async (req, res) => {
    //we need to chain the things for select , sort 
    const product = await Product.find({ price: { $gt: 30 } })
        .sort('price name')
        .select('price name')

    res.status(200).json(product);

}

const getAllTask = async (req, res) => {
    //now here to apply chaining we have to take out an intermediate result
    const { featured, company, name, sort, fields, NumericalField } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === true ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: a, $options: 'i' } //regex means atleast one 'a', and options = i means case insesitive
    }

    //toughest logic
    if (NumericalField) {
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq'
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    let result = Product.find(queryObject);
    if (sort) {
        const sortlist = sort.split(',').join(' ')
        result = result.sort(sortlist)
    }
    else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const selectlist = fields.split(',').join(' ')
        result = result.select(selectlist)
    }

    const pageNumber = Number(req.query) || 1;
    const limit = Number(req.query) || 10;
    const skip = (pageNumber - 1) * limit;

    result = result.skip(skip).limit(limit);

    const product = await result;
    res.status(200).json(product);
}

module.exports = {
    getAllTask,
    getTaskStatic
}