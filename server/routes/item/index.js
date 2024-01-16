const express = require('express');
const router = express.Router();
const Item = require('../../model/item');


router.post('/add', async(req, res) => {

    try{
        console.log('the body is this:',req.body);
        const item = await Item.create(req.body);
        return res.status(201).json(
            {
                data: item,
                message: "item created successfully"
            }
            );
    }catch(err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        });
    }

    
});

router.get('/get', async(req,res) => {
    try{
        const items = await Item.find()
        return res.status(200).json({
            data: items,
            message: "items fetched successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            error: err.message
        });    }
})


// Update an item by ID
router.put('/update/:id', async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({
        data: updatedItem,
        message: 'Item updated successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
      });
    }
  });
  
  // Delete an item by ID
  router.delete('/delete/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
  
      // Find and delete the item by ID
      const deletedItem = await Item.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({
          error: 'Item not found',
        });
      }
  
      return res.status(200).json({
        data: deletedItem,
        message: 'Item deleted successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message,
      });
    }
  });
  

module.exports = router;