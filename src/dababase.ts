import mongoose from "mongoose";

// mongodb+srv://highway:Sam2509@cluster0.ozdmfr5.mongodb.net/

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "Highway_Assignment",
    })
    .then((d) => console.log(d.connection.host))
    .catch((e) => console.log(e));
};
