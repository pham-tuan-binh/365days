const app = require("./express");
const { instaHandle, userHandle } = require("./instaHandler");

app.get("/feed", instaHandle);
app.get("/user", userHandle);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
