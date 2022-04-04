const Order=require('../models/Order')


const addOrder=(req,res)=>{
    const newOrder=new Order({
        user:req.body.user,
        product:req.body.product
    })

    newOrder.save().then(doc=>{
        res.status(200).json({
            massage :doc
        })
    }).catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}

const getOrder=(req,res)=>{
    Order.find().populate('user','username')
    .then(doc=>{
        res.status(200).json({
            massage :doc
        })
    })
    .catch(err=>{
        res.status(4040).json({
            massage :err
        })
    })
}


const updaetOrder=(req,res)=>{
    let newProduct=req.body.product;
    Order.find({_id :req.params.orderId}).
 


    then(doc =>{


        let oldProduct=doc[0].product;
   
        newProduct.forEach((newelement,index1 )=> {
             oldProduct.forEach((oldelemnet ,index)=>{
                 if(newelement._id === oldelemnet._id){
                     oldelemnet.quantity +=newelement.quantity;
                     newProduct.splice(index1,1)
                     return false
                     
                 }
             })
        });  
      
         oldProduct=oldProduct.concat(newProduct)
      console.log(oldProduct)
              
      const newOrder={
          product:oldProduct
      }
      Order.updateOne({_id :req.params.orderId} ,{$set :newOrder}).then(
          doc=>{
              res.status(200).json({
                  massage :doc
              }).catch(
                  err=>{
                      res.status(404).json({
                          massage :err
                      })
                  }
              )
          }
      ).catch(
          err=>{
            res.status(404).json({
                massage :err
            })
          }
      )
      

    })
    .catch(err =>{
        res.status(404).json({
            massage :err
        })
    })
}


const deleteProduct=(req,res)=>{
    Order.deleteOne({_id:req.params.orderId}).then(
        doc=>{
            res.status(200).json({
                massage :"order Deleteing"
            })
        }
    ).catch(err=>{
        res.status(404).json({
            massage :err
        })
    })
}
module.exports={
    addOrder,
    getOrder ,
    updaetOrder,
    deleteProduct

}