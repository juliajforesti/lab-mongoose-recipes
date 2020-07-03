const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// IFFE
(async function startApp() {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to the database: "${db.connection.name}"`);
    await db.connection.dropDatabase();

    const result = await Recipe.create(myRecipe);
    console.log("NOVA RECEITA:", result.title);

    const result2 = await Recipe.insertMany(data);
    console.log("RECEITAS INSERIDAS", result2.map((recipe) => recipe.title));

    const update = await Recipe.findOneAndUpdate(
      { title: "Brigadeiro" },
      { $set: { title: "Brigadeiro da Julia" } },
      { new: true }
    );
    console.log("RECEITA ATUALIZADA", update.title);

    const del = await Recipe.deleteOne({ title: "Rigatoni alla Genovese" });
    console.log(
      "RECEITA DELETADA COM SUCESSO:",
      Boolean(del.ok),
      "QUANTIDADE DELETADA:",
      del.deletedCount
    );

    //CLOSE CONNECTION (option 1)
    const closeResult = await db.connection.close()
    console.log('CONNECTION CLOSED')

    //CLOSE CONNECTION (option 2)
    //const closeResult2 =  await mongoose.disconnect();

    // //CLOSE CONNECTION (option 3)
    // const closeResult3 = await mongoose.connection.close()

  } catch (err) {
    console.log(err);
  }
})();

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((self) => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any documents to the database, let's delete all previous entries
//     return self.connection.dropDatabase();
//   })
//   .then(async () => {
//     try {
//       const result = await Recipe.create(myRecipe);
//       console.log("NOVA RECEITA:", result.title);

//       const result2 = await Recipe.insertMany(data);
//       console.log(
//         "RECEITAS INSERIDAS",
//         result2.map((recipe) => recipe.title)
//       );

//       const update = await Recipe.findOneAndUpdate(
//         { title: "Brigadeiro" },
//         { $set: { title: "Brigadeiro da Julia" } },
//         { new: true }
//       );
//       console.log("RECEITA ATUALIZADA", update.title);

//       const del = await Recipe.deleteOne({ title: "Rigatoni alla Genovese" });
//       console.log(
//         "RECEITA DELETADA COM SUCESSO:",
//         Boolean(del.ok),
//         "QUANTIDADE DELETADA:",
//         del.deletedCount
//       );

//       await mongoose.disconnect();
//     } catch (err) {
//       console.log(err);
//     }
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });

const myRecipe = {
  title: "Brigadeiro",
  level: "Amateur Chef",
  ingredients: [
    "1 lata de leite condensado",
    "2 colheres de nescau",
    "1 colher de manteiga",
  ],
  cuisine: "Brasilian",
  dishType: "Dessert",
  duration: 20,
  creator: "Julia",
};
