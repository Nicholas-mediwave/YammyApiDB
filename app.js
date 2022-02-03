const express = require("express");
const { param } = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
const port = 1997;
const localHostUrl = `http://localhost:${port}`;

const recipiesLists = [
  {
    id: 1642067929941,
    recipieName: "Chicken Biriyani",
    foodType: "NV",
    recipieDiscription: "This is a authentic South-Indian Style Biriyani",
    ingredients:
      "Biryani rice are flavored with spices and are full of aroma.This is attained by boiling rice with whole spices and salt in large pot with plenty of water.Best way to do this is boil water with salt and whole spices like cumin, cardamoms, pepper, bay leaf etc.",
    stepstoPrepare:
      "Take the Chicken an wash it well and mix the ingrediants and u will get something think that as biriyani",
    image: {
      url: "/images/1.jpeg",
      altInfo: "Chicken Biriani Images",
    },
  },
  {
    id: 1642070244749,
    recipieName: "Veg Biriyani",
    foodType: "Veg",
    recipieDiscription: "This is a authentic South-Indian Style VEG Biriyani",
    ingredients:
      "Biryani rice are flavored with spices and are full of aroma.This is attained by boiling rice with whole spices and salt in large pot with plenty of water.Best way to do this is boil water with salt and whole spices like cumin, cardamoms, pepper, bay leaf etc.",
    stepstoPrepare:
      "Take the Vegitables and wash it well and mix the ingrediants and u will get something think that as biriyani",
    image: {
      url: "/images/2.jpeg",
      altInfo: "Vegitable Biriani Images",
    },
  },
];

//Get all the recipies
app.get(["/", "/recipies"], (req, res) => {
  res.status(202).send(recipiesLists);
});

//get one recipie using id
app.get("/recipies/:id", (req, res) => {
  const recipie = recipiesLists.find((r) => r.id == req.params.id);
  if (!recipie) {
    res.status(404).json({
      message: `${req.params.id} not found in the Recipies List`,
    });
  }
  res.status(202).send(recipie);
});

//add a recipie
app.post("/recipies", (req, res) => {
  const payload = req.body;
  console.log(req.body);
  if (
    !payload.recipieName ||
    !payload.foodType ||
    !payload.recipieDiscription ||
    !payload.ingredients ||
    !payload.stepstoPrepare ||
    !payload.image ||
    !payload.image.url ||
    !payload.image.altInfo
  ) {
    res.status(404).json({
      message: `Incorrect Data`,
    });
  }
  const recipie = {
    id: new Date().getTime(),
    ...payload,
  };
  recipiesLists.push(recipie);
  res.status(202).send(recipie);
});

//delete a recipie
app.delete(["/", "/recipies/:id"], (req, res) => {
  const RecipiesIndex = recipiesLists.findIndex((r) => r.id == req.params.id);
  console.log(RecipiesIndex);
  if (RecipiesIndex == -1) {
    res.status(404).json({
      message: `${req.params.id} not found`,
    });
  }
  recipiesLists.splice(RecipiesIndex, 1);
  res.status(202).send({
    message: `Recipie ID ${req.params.id} deleted`,
  });
});

//update a recipie
app.put("/recipies/:id", (req, res) => {
  const payload = req.body;
  const RecipiesIndex = recipiesLists.findIndex((r) => r.id == req.params.id);
  if (RecipiesIndex == -1) {
    res.status(404).json({
      message: `Recipie ID : ${req.params.id} not found`,
    });
  } else if (
    !payload.recipieName ||
    !payload.foodType ||
    !payload.recipieDiscription ||
    !payload.ingredients ||
    !payload.stepstoPrepare ||
    !payload.image ||
    !payload.image.url ||
    !payload.image.altInfo
  ) {
    res.status(404).json({
      message: `Incorrect Data`,
    });
  }
  recipiesLists[RecipiesIndex] = {
    id: req.params.id,
    ...payload,
  };
  res.status(202).send(recipiesLists[RecipiesIndex]);
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Connot run on Port ${port} Due to Error: ${err}`);
    process.exit(1);
  }
  console.log("------------------------------------------------------------");
  console.log(`\nServer is runing on ${localHostUrl}\n`);
  console.log("------------------------------------------------------------");
});
