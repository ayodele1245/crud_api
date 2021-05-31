import client from "./database/db.js";

//QUERY FOR GETTING ALL USERS
export const getUsers=async(req, res)=>{
    try{
        const response=await client.query('SELECT * FROM users ORDER BY id ASC');
        if(response){
            return res.status(200).json({status: 'success', data:response.rows});
        }
    }catch(err){
        console.log(err);
    }
};

//QUERY FOR GETTING SINGLE USER BY ID
export const getUserById=async(req, res)=>{
    try{
    const id= parseInt(req.params.id)
    const response=await client.query('SELECT * FROM users WHERE id=$1', [id]);
    if(response){
        return res.status(200).json({status: 'success', data:response.rows});
    }
}catch(err){
    console.log(err);
}
};

//QUERY FOR CREATING USERS
export const addUser=async(req, res)=>{
    const {name, email}=req.body;
    //To check if email exists
    const response1=await client.query('SELECT s FROM users s WHERE s.email= $1', [email]);
    if(response1.rows.length){
    res.send("Email already exists!")
    }
    //add user to database
    try{
    const response2= await client.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email]);
    if(response2){
        return res.status(200).send('New User Added Successfully');
    }
}catch(err){
    console.log(err)
}
    
}

//Logic For Deleting User
export const removeUser=async(req, res)=>{
    const id=parseInt(req.params.id);
    const response3=await client.query('SELECT * FROM users WHERE id=$1', [id]);
    const noUserFound=!response3.rows.length;
    if(noUserFound){
       return res.send("User does not exist in the database");
    }
    try{
        const response4=await client.query('DELETE FROM users WHERE id=$1', [id]);
        if (response4){
          return res.status(200).send("User removed successfully")
    
    }
}catch(err){
    console.log(err);
}
}

//UPDATE USER
export const updateUser= async(req, res)=>{
    const id=parseInt(req.params.id);
    const {name, email}=req.body;
    const response3=await client.query('SELECT * FROM users WHERE id=$1', [id]);
    const noUserFound=!response3.rows.length;
    if(noUserFound){
       return res.send("User does not exist in the database");
    }
    try{
        const response4=await client.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, id]);
        if (response4){
          return res.status(200).send("User Updated successfully")
    
    }
}catch(err){
    console.log(err);
}
}
