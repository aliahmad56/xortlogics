
const User = require('../../models/User');

exports.createUser = async (req,res) => {
    try {
     const {username, email} = req.body;

      const newUser = new User({username, email});
      const savedUser = await newUser.save();
      return res.status(200).json({
        status: true,
        user: savedUser
      });
    } 
    
    catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        status: false,
        msg: "Internal Server Error"
      })
    }

};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if(users.length===0){
        console.log("No user found")
        return res.status(200).json({
          status: true, 
          msg: "No User Found"})
    }
    return res.status(200).json({
      status: true, 
      users: users
    });
  } 
  
  catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const {email, username} = req.body;
  console.log("My user id is=", req.params.userId)
    const user = await User.findById(req.params.userId);
    if(user.length===0){
      console.log("No user found")
      return res.status(200).json({
        status: true, 
        msg: "No User Found"})
  }
     await User.findByIdAndUpdate(user.id,{
     email: email,
     username: username
    });
    res.status(200).json({
      status: true, 
      "msg": "User Data is Updated"
    });
  } 
  
  catch (error) {
     console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.searchUsers = async (req,res) => {
  try {
    const query = req.query.query;
    console.log("ali search query is=", query)
    const users = await User.find({ 
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

exports.deleteUser = async (req, res) => {
  try {
    console.log("User Deleted Function")
    const userId  = req.params.userId;

    const user = await User.findById({_id: userId});
    if(user.length===0){
      console.log("No user found")
      return res.status(200).json({
        status: true, 
        msg: "No User Found"})
  }

    console.log("User details", user)
    await User.deleteOne({ _id:userId });

    res.status(200).json({
      status: true, 
      msg: 'User has been deleted'
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
