const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Search
  if (req.query.search) {
    query = model.aggregate([
      {
        $search: {
          regex: {
            path: ['name', 'description'],
            query: `${req.query.search}(.*)`,
            allowAnalyzedField: true,
          },
        },
      },
      {
        $project: {
          _v: 0,
        },
      },
    ]);
  }

  // Advance Searching

  if (req.body.keyword) {
    console.log('did you reach heres');
    query = model.aggregate([
      {
        $search: {
          compound: {
            must: [
              {
                regex: {
                  path: ['name', 'description'],
                  query: `${req.body.keyword}(.*)`,
                  allowAnalyzedField: true,
                },
              },
            ],
            should: [
              {
                range: {
                  path: 'price',
                  gte: parseFloat(req.body.priceMin),
                  lte: parseFloat(req.body.priceMax),
                },
              },
              {
                range: {
                  path: 'averageRating',
                  gte: parseFloat(req.body.averageRatingMin),
                  lte: parseFloat(req.body.averageRatingMax),
                },
              },
              {
                range: {
                  path: 'countInStock',
                  gte: parseFloat(req.body.countInStockMin),
                  lte: parseFloat(req.body.countInStockMax),
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
    ]);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 18;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total && results.length >= limit) {
    pagination.next = {
      page: page + 1,
      limit,
    };
    pagination.current = {
      page: page,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
    pagination.current = {
      page: page,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    total,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
