const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    if (!categoryData) {
      res.status(400).json({"message": "Cannot create item"})
    }

    res.status(200).json({"message": "Item Created Successfully"})
  } catch (err) {
    res.status(500).json({"message": "Internal Server Error"})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const categoryData = await Category.update({
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      }
    })

    if (categoryData != 0) {
      res.status(200).send('Update Successful')
    } else {
      res.status(400).send(`Could not update item #${req.params.id}`)
    }
  } catch (err) {
    res.status(400).send('Server Error. Please try again later.')
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json({"message": "Item Successfully deleted"});
  } catch (err) {
    res.status(500).json({"message": "Internal Server Error"})
  }
});

module.exports = router;
