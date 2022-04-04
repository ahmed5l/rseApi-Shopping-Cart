const Product=require('../models/Product')

const multer=require('multer');





const storage =multer.diskStorage({

  destination :function (req,file ,cb){
    cb(null ,'./uploads/')
  },
  filename :function(req,file,cb){
    cb(null ,new Date().toDateString()+file.originalname)
  }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
        cb(null ,true)

    }else{
        cb(null ,false);

    }
}

const upload=multer({
   storage:storage,
   limits:{
       fileSize:1024*1024*5
   },
   fileFilter :fileFilter
});


const checkAuth=require('../middleware/check-auth')

const addProduct=(req,res)=>{
    console.log(req.file)
    const product =new Product({
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    })
    product.save()
    .then(doc=>{
        res.status(200).json({
            massage :"Add Product"
        })
    })
    .catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}


const product=(req,res)=>{
    Product.find().select("id name price productImage")
    .exec()
    .then(doc=>{

        const docs={
            products :doc.map(resault=>{
                   return {
                       name:resault.name,
                       price:resault.price,
                       productImage:resault.productImage,
                       _id:resault._id,
                       url :{
                           type:"GET",
                           urls:"http://localhost:3000/addproduct/"+resault._id
                       }
                   }
            })
        }

        res.status(200).json({
            massage :docs
        })
    })
    .catch(err =>{
        res.status(404).json({
            massage :err
        })
    })
}

const getOneProduct=(req,res)=>{
    Product.find({id:req.params.productID}).select('name price _id productImage').exec()
    .then(resault=>{
        res.status(200).json({
            product :resault
        })
    })
    .catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}

const updateProduct=(req,res)=>{
    const newproduct={
        name:req.body.name,
        price:req.body.price
    }

    Product.updateOne({_id:req.params.productID} ,{$set :newproduct})
    .then(doc=>{
        res.status(200).json({
            massage :doc
        })
    })
    .catch(err=>{
        res.status(404).json({
            massage:err
        })
    })
}


const  deleteProduct=(req,res)=>{
    Product.deleteOne({_id:req.params.productID})
    .then(doc=>{
        res.status(200).json({
            massage:doc
        })
    })
    .catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}

module.exports={
    addProduct,
    product,
    getOneProduct,
    updateProduct,
    deleteProduct,
    upload
}