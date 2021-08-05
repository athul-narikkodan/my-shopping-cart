const express= require("express")
const bodyParser = require("body-parser");
const app = express();
// mongoose
const mongoose= require("mongoose")
mongoose.connect('mongodb://localhost:27017/mycart', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose schema

const cartSChema= {
    title: String,
    price:Number
}

const Cart= mongoose.model("Cart",cartSChema);

// data items

app.get("/", function(req,res)
{
    Cart.find(function(err,results)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.sendFile(__dirname + "/index.html")
            res.send(results)
        }
        
    })
})
app.post("/" ,function(req,res)
{
    function notes()
    {
            var count=Number(req.body.c1);
             var total=count*100;
  
            if (count<=3 && count!=0)
            {
              total= 300; 
              
            }
            else
            {
              
              if(total>=500)
              {
                var discountNotes=total*(10/100);
                if(discountNotes>=60)
                {
                  total=total-60
                }
                else
                {
                  total =total-discountNotes;
                }
              
              }
             
            
            }
              return total
    }
    console.log("Notes price is  " + notes())
  
   
  
  
  
    function sani()
      {
  
            var countOne=Number(req.body.c2)
            var indPrice
  
            if(countOne<=10 && countOne!=0)
            {
              indPrice=10*250
            }
            else
            {
               indPrice=countOne*250
  
              if(indPrice>3000)
               {
                 
                 indPrice=indPrice-100
               }
            }
           return indPrice
  
      }
  
      console.log("Sanitizer price is " + sani() )
  
    
  
    function bag()
    {
            var countTwo=Number(req.body.c3)
            var bagPrice
            if (countTwo>2)
            {
             
              return (0)
            } 
            
            else
            {
              bagPrice=countTwo*1500
              return bagPrice
            }
            
    }
    console.log("Bag price is " + bag())
  
   
  
  
  
  
  function total()
  {
    var totalPrice= notes()+sani()+bag();
    var proCode=req.body.pro
      if (proCode="PRIME123" && totalPrice >=10000)
       
        {
          
          totalPrice-=123
            return totalPrice  
        }
        
        else
        {
           return totalPrice
        }
  }


  
  console.log("Your total price is " + total()) 
  res.write("<h1>Your total price is</h1>"  + total())
  res.send()

  
})




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });