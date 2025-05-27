const TaskSchema = require('./../Module/taskSchema');

exports.addTask = async (req, res)=>{
    console.log(req.body)
    const {title, description, status}= req.body;
    if(!title){
        return res.status(400).json({MESSAGE:'Title is required', SUCCESS:false})
    }
    const task = new TaskSchema({title, description, status, user:req.user.id})
    console.log("task req body", task)
    try{
        const saveTask = await task.save();
        return res.status(201).json({MESSAGE:'Task successfully added', SUCCESS:true, DATA:saveTask})
    }catch(error){
      res.status(400).json({MESSAGE:error.message, SUCCESS:false})
    }
}

exports.getAllUserTask = async (req, res)=>{
    try{
        const tasks = await TaskSchema.find({user:req.user.id});
        return res.status(200).json({SUCCESS:true, DATA:tasks})
    }catch(error){
        return res.status(500).json({SUCCESS:false, MESSAGE:error.message})
    }
}

exports.updateTask = async (req, res)=>{
    const {title, description, status}= req.body;
    if(!title){
        return res.status(400).json({MESSAGE:'Title is required', SUCCESS:false}) 
    }

    try{
        const updatedTask = await TaskSchema.findOneAndUpdate(
            {_id:req.params.id, user:req.user.id},
            {title,description, status},
            {new:true}
        )
        if(!updatedTask){
            return res.status(404).json({MESSAGE:'Task not found', SUCCESS:false}) 
        }
        return res.status(200).json({MESSAGE:'Task updated successfully', SUCCESS:true}) 

    }catch(error){
        res.status(400).json({MESSAGE:error.message, SUCCESS:false})
    }
}

exports.deleteTask = async (req, res)=>{

    try{
        const deleteTask = await TaskSchema.findOneAndDelete({_id:req.params.id, user:req.user.id});
        if(!deleteTask){
          return res.status(404).json({MESSAGE:'Task not found', SUCCESS:false})   
        }
        return res.status(200).json({MESSAGE:'Task deleted successfully', SUCCESS:true})
    }catch(error){
        res.status(400).json({MESSAGE:error.message, SUCCESS:false})
    }
}

