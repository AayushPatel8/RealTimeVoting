import bodyParser from 'body-parser';
import Express from 'express';
import mongoose from 'mongoose';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Election from './model/election.js';
import User from './model/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = Express();
const PORT = 3000;

mongoose.connect("Enter Your MongoDB Link");

app.use(bodyParser.json());
app.use(Express.static(__dirname))

app.get('/', (req, res) => {
   return res.sendFile(__dirname);
})

app.get("/api/elections", async (req, res) => {
   try {
      const elections = await Election.find();
      console.log(elections);
      return res.json(elections);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
});

app.put("/api/vote", async (req, res) => {
   const { candidate, title } = req.body;

   try {
      const result = await Election.updateOne(
         { title: title, "names.name": candidate },
         { $inc: { "names.$.votes": 1 } }
      );

      if (result.nModified === 0) {
         return res.status(404).json({ message: "Election or Candidate not found" });
      }

      return res.json({ message: "Vote recorded successfully" });
   } catch (error) {
      console.error("Error recording vote:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
});
app.post('/api/admin-login', async (req, res) => {
   const { username, password } = req.body

   const user = await User.findOne({ username });
   if ((!user) || (!(user.password == password))) {
      return res.status(400).json({ status: 'error', error: 'Invalid password' })
   }
   else if (!user.isAdmin) {
      return res.status(400).json({ status: 'error', error: 'Not a admin' })
   }
   else {
      return res.status(200).json({ status: 'ok' })
   }
})
app.post('/api/login', async (req, res) => {
   const { username, password } = req.body
   const user = await User.findOne({ username });
   if ((!user) || (!(user.password == password))) {
      return res.status(400).json({ status: 'error', error: 'Invalid password' })
   }
   else {
      return res.status(200).json({ status: 'ok' })
   }
})
app.post('/api/register', async (req, res) => {
   const { username, email, gender, phone, adharcard, password, isAdmin } = req.body

   try {
      const newUser = await User({
         'username': username,
         'password': password,
         'adharcard': adharcard,
         'email': email,
         'gender': gender,
         'phone': phone,
         'isAdmin': isAdmin
      })
      const response = await newUser.save();
      console.log('User created successfully: ', response)
      return res.status(200).json({ status: 'success' });
   } catch (error) {
      return res.status(400).json({ status: 'error', error: 'Username already in use' })
   }

});

app.post('/api/elections', async (req, res) => {
   const { title, type, numCan, names } = req.body

   try {
      const newElection = await Election({
         'title': title,
         'type': type,
         'numCan': numCan,
         'names': names
      })
      const response = await newElection.save();
      console.log('Election created successfully: ', response)
      return res.status(200).json({ status: 'success' });
   } catch (error) {
      return res.status(400).json({ status: 'error', error: 'Some error occures' })
   }

});

app.listen(PORT, (error) => {
   if (!error)
      console.log("Server is Successfully Running,and App is listening on port " + PORT)
   else
      console.log("Error occurred, server can't start", error);
}); 4